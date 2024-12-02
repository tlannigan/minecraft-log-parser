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

  return { java, os, ...allocatedMemory };
}

export function parseFabricSystem(systemLine: string): System {
  return {
    java: systemLine.split('    - java ')[1].trim(),
  };
}

export function parseMemoryFlags(lines: string[]): {
  xmx?: number;
  xms?: number;
} {
  const jvmFlagLine = lines.find((l) => l.trim().startsWith('JVM Flags:'));
  if (jvmFlagLine) {
    let xmx;
    let xms;

    const jvmFlags = jvmFlagLine.split('; ');
    const memoryFlags = jvmFlags[1].split(' ').map((flag) => flag.trim());

    const xmxFlag = memoryFlags.find((mf) => mf.startsWith('-Xmx'))?.slice(4);
    if (xmxFlag) {
      xmx = convertMemoryFlagToBytes(xmxFlag);
    }

    const xmsFlag = memoryFlags.find((mf) => mf.startsWith('-Xms'))?.slice(4);
    if (xmsFlag) {
      xms = convertMemoryFlagToBytes(xmsFlag);
    }

    return {
      ...(xmx && { xmx }),
      ...(xms && { xms }),
    };
  }
  return {};
}

export function convertMemoryFlagToBytes(
  memoryFlag: string
): number | undefined {
  const memory = Number(memoryFlag.slice(0, memoryFlag.length - 1));
  const unit = memoryFlag.slice(memoryFlag.length - 1).toLowerCase();

  if (unit === 'k') return memory * 1024;
  if (unit === 'm') return memory * 1024000;
  if (unit === 'g') return memory * 1024000000;
  if (unit === 't') return memory * 1024000000000;

  return undefined;
}
