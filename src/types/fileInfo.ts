import { FileType, Launcher } from './enums';
import { Issue } from './issue';

export interface FileInfo extends Metadata, Modloader, System {
  issues?: Issue[];
  lines: string[];
}

export interface Metadata {
  fileName?: string;
  /** File size in bytes */
  fizeSize?: number;
  /** Unix millisecond timestamp */
  lastModified?: number;
  lineCount?: number;
  fileType: FileType;
}

export interface Modloader {
  assetIndex?: string;
  assetsDir?: string;
  fmlVersion?: string;
  gameDir?: string;
  height?: string;
  launchTarget?: string;
  launcher?: Launcher;
  mcVersion?: string;
  fabricVersion?: string;
  forgeVersion?: string;
  neoForgeVersion?: string;
  neoFormVersiom?: string;
  username?: string;
  userType?: string;
  uuid?: string;
  version?: string;
  width?: string;
}

export interface System {
  allocatedMemory?: string;
  cpu?: string;
  java?: string;
  os?: string;
  physicalMemory?: string;
}

export class MinecraftFileInfo implements FileInfo {
  lines: string[] = [];
  issues?: Issue[];

  // File metadata
  fileName?: string;
  /** File size in bytes */
  fizeSize?: number;
  /** Unix millisecond timestamp */
  lastModified?: number;
  lineCount?: number;
  fileType: FileType = FileType.UNKNOWN;

  // Modloader attributes
  assetIndex?: string;
  assetsDir?: string;
  fmlVersion?: string;
  gameDir?: string;
  height?: string;
  launchTarget?: string;
  launcher?: Launcher;
  mcVersion?: string;
  fabricVersion?: string;
  forgeVersion?: string;
  neoForgeVersion?: string;
  neoFormVersiom?: string;
  username?: string;
  userType?: string;
  uuid?: string;
  version?: string;
  width?: string;

  // System attributes
  allocatedMemory?: string;
  cpu?: string;
  java?: string;
  os?: string;
  physicalMemory?: string;

  constructor(metadata: FileInfo) {
    Object.assign(this, metadata);
  }
}
