import { includesCaseless } from '@/lib/strings';
import { Launcher } from '@/types/enums';
import parseLauncher from '../parseLauncher';
import { Modloader } from '@/types/fileInfo';

export default function parseModloader(lines: string[]): Modloader {
  const fabricAttributes = lines.find(
    (line) =>
      includesCaseless(line, 'loading minecraft ') &&
      includesCaseless(line, 'with fabric loader ')
  );
  if (fabricAttributes) {
    return parseFabricAttributes(fabricAttributes);
  }

  const forgeModernAttributes = lines.find((line) =>
    includesCaseless(line, 'modlauncher running: args')
  );
  if (forgeModernAttributes) {
    return parseForgeModernAttributes(forgeModernAttributes);
  }

  const forgeLegacyAttributes = lines.find((line) =>
    includesCaseless(line, 'forge mod loader version')
  );
  if (forgeLegacyAttributes) {
    return parseForgeLegacyAttributes(forgeLegacyAttributes);
  }

  return {};
}

export function parseFabricAttributes(argsLine: string): Modloader {
  const splitArgsLine = argsLine.toLowerCase().split(' ');
  const mcVersionIndex = splitArgsLine.indexOf('minecraft') + 1;
  const fabricLoaderVersion = splitArgsLine.indexOf('loader') + 1;

  return {
    mcVersion: splitArgsLine[mcVersionIndex],
    fabricVersion: splitArgsLine[fabricLoaderVersion].trim(),
  };
}

export function parseForgeModernAttributes(attributesLine: string): Modloader {
  const attributesStart = attributesLine.indexOf('args [') + 6;
  const attributesSlice = attributesLine.slice(
    attributesStart,
    attributesLine.length - 1 // Minus 1 to skip ending ] bracket
  );
  const attributes: any = {};

  // Separate keys from values and add them to the args object
  const keyValuePairs = attributesSlice.split(', ');
  const keys = keyValuePairs.filter((s) => s.startsWith('--'));
  const values = keyValuePairs.filter((s) => !s.startsWith('--'));
  keys.forEach((key, index) => {
    const keyName = key.substring(2);
    if (keyName.startsWith('fml.')) {
      attributes[keyName.substring(4)] = values[index];
    } else {
      attributes[keyName] = values[index];
    }
  });

  attributes.launcher = attributes.assetsDir
    ? parseLauncher(attributes.assetsDir)
    : Launcher.UNKNOWN;

  return attributes;
}

export function parseForgeLegacyAttributes(attributesLine: string): Modloader {
  const modloaderInfo = attributesLine.split(' ');
  const mcVersionIndex = modloaderInfo.indexOf('Minecraft') + 1;
  const mcVersion = modloaderInfo[mcVersionIndex];
  const forgeVersionIndex = modloaderInfo.indexOf('version') + 1;
  const forgeVersion = modloaderInfo[forgeVersionIndex];

  return { mcVersion, forgeVersion };
}
