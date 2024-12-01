import { includesCaseless } from '@/lib/strings';
import { System } from '@/types/fileInfo';

export default function parseSystem(lines: string[]): System {
  const forgeModernJavaLine = lines.find((line) =>
    includesCaseless(line, 'starting: java version')
  );
  if (forgeModernJavaLine) {
    return parseForgeModernSystem(forgeModernJavaLine);
  }

  const forgeLegacyJavaLine = lines.find((line) =>
    includesCaseless(line, 'java is')
  );
  if (forgeLegacyJavaLine) {
    return parseForgeLegacySystem(forgeLegacyJavaLine, lines);
  }

  const fabricJavaLine = lines.find((line) =>
    includesCaseless(line, '    - java ')
  );
  if (fabricJavaLine) {
    return parseFabricSystem(fabricJavaLine);
  }

  return {};
}

// Forge 1.16.5+
export function parseForgeModernSystem(systemLine: string): System {
  const searchString = 'starting: java version';
  const systemInfoStartIndex =
    systemLine.indexOf(searchString) + searchString.length;
  const systemInfoString = systemLine.substring(systemInfoStartIndex);
  const systemInfoArray = systemInfoString.split('; ');

  if (systemInfoArray.length > 1) {
    return {
      java: systemInfoArray[0].trim().split(' ')[0].replace('_', '.'),
      os: systemInfoArray[1]?.substring(3).trim(),
    };
  }

  if (systemInfoArray.length === 1) {
    return {
      java: systemInfoArray[0].trim().split(' ')[0].replace('_', '.'),
    };
  }

  return {};
}

// Forge 1.7.10-1.12.2
export function parseForgeLegacySystem(
  systemLine: string,
  lines: string[]
): System {
  const systemInfoArray = systemLine.split(', ');
  const java = systemInfoArray[1].split(' ')[1].replace('_', '.');
  const os = systemInfoArray[2]?.substring(11);
  const allocatedMemory = parseMemoryFlags(lines);

  return { java, os, allocatedMemory };
}

export function parseFabricSystem(systemLine: string): System {
  return {
    java: systemLine.split('    - java ')[1].trim(),
  };
}

export function parseMemoryFlags(lines: string[]): string | undefined {
  const jvmFlagLine = lines.find((l) => l.trim().startsWith('JVM Flags:'));
  if (jvmFlagLine) {
    const jvmFlags = jvmFlagLine.split('; ');
    const memoryFlags = jvmFlags[1]
      .split(' ')
      .filter((flag) => flag.startsWith('-Xmx') || flag.startsWith('-Xms'));
    return memoryFlags.join(', ').trim();
  }
  return undefined;
}
