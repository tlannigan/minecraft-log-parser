import { includesCaseless } from '@/lib/strings';
import { FileType } from '@/types/enums';

export default function parseFileType(
  lines: string[],
  fileName?: string
): FileType {
  if (isExtendedMultimcLog(lines)) {
    return FileType.EXTENDED_MULTIMC_LOG;
  } else if (isLauncherLog(lines, fileName)) {
    return FileType.LAUNCHER_LOG;
  } else if (isStandardLog(lines)) {
    return FileType.STANDARD_LOG;
  } else if (isCrashReport(lines, fileName)) {
    return FileType.CRASH_REPORT;
  } else if (isHotspotCrashDump(lines, fileName)) {
    return FileType.HS_ERR_PID;
  } else {
    return FileType.UNKNOWN;
  }
}

export function isExtendedMultimcLog(lines: string[]): boolean {
  return (
    lines.find((line) => {
      return (
        includesCaseless(line, 'prism launcher version') ||
        includesCaseless(line, 'polymc version') ||
        includesCaseless(line, 'multimc version')
      );
    }) !== undefined
  );
}

export function isLauncherLog(lines: string[], fileName?: string): boolean {
  const hasLauncherLogName =
    (fileName?.startsWith('launcher_log') && fileName?.endsWith('.txt')) ??
    false;
  const containsMinecraftJavaLogging = lines.find((line) =>
    includesCaseless(line, 'minecraftjavaloggingcontext.cpp')
  );
  return hasLauncherLogName || containsMinecraftJavaLogging !== undefined;
}

export function isStandardLog(lines: string[]): boolean {
  const isFabricLog = lines.find(
    (line) =>
      includesCaseless(line, 'loading minecraft ') &&
      includesCaseless(line, 'with fabric loader')
  );
  const isForgeModernLog = lines.find((line) =>
    includesCaseless(line, 'modlauncher running: args')
  );
  const isForgeLegacyLog = lines.find((line) =>
    includesCaseless(line, 'forge mod loader version')
  );
  return (
    isFabricLog !== undefined ||
    isForgeModernLog !== undefined ||
    isForgeLegacyLog !== undefined
  );
}

export function isCrashReport(lines: string[], fileName?: string): boolean {
  const hasCrashReportName =
    (fileName?.startsWith('crash-') && fileName?.endsWith('.txt')) ?? false;
  const startsWithMinecraftCrashReport = lines
    .slice(0, 5)
    .find((line) => includesCaseless(line, 'minecraft crash report'));
  return hasCrashReportName || startsWithMinecraftCrashReport !== undefined;
}

export function isHotspotCrashDump(
  lines: string[],
  fileName?: string
): boolean {
  const hasHotspotCrashDumpName =
    (fileName?.startsWith('hs_err_pid') && fileName?.endsWith('.log')) ?? false;
  const startsWithFatalError = lines
    .slice(0, 5)
    .find((line) =>
      includesCaseless(
        line,
        'a fatal error has been detected by the java runtime environment'
      )
    );
  return hasHotspotCrashDumpName || startsWithFatalError !== undefined;
}
