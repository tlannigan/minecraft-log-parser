export enum FileType {
  STANDARD_LOG = 'Standard',
  EXTENDED_MULTIMC_LOG = 'Extended MultiMC',
  CRASH_REPORT = 'Crash Report',
  LAUNCHER_LOG = 'Launcher Log',
  HS_ERR_PID = 'Hotspot Crash Dump',
  UNKNOWN = 'Unknown',
}

export enum Launcher {
  VANILLA = 'Vanilla',
  CURSEFORGE = 'CurseForge',
  MODRINTH = 'Modrinth',
  FTB_APP = 'FTB App',
  PRISM = 'Prism',
  POLYMC = 'PolyMC',
  MULTIMC = 'MultiMC',
  ATLAUNCHER = 'ATLauncher',
  GDLAUNCHER = 'GDLauncher',
  UNKNOWN = 'Unknown',
}

export enum Modloader {
  FORGE = 'Forge',
  NEOFORGE = 'NeoForge',
  FABRIC = 'Fabric',
  QUILT = 'Quilt',
  UNKNOWN = 'Unknown',
}

export enum Severity {
  INFO = 'Info',
  WARNING = 'Warning',
  ERROR = 'Error',
  /** Must be fixed. Always leads to a crash. */
  FATAL = 'Fatal',
}

export enum Equality {
  EQ,
  NOT,
  GTE,
  GT,
  LTE,
  LT,
  RANGE,
}
