import { FileType } from '@/types/enums';
import { FileInfo } from '@/types/fileInfo';

export const FILE_INFO_WITH_MCVERSION: FileInfo = {
  fileType: FileType.STANDARD_LOG,
  lines: [],
  mcVersion: '1.20.1',
};

export const FILE_INFO_WITH_MULTIPLE_ATTRIBUTES: FileInfo = {
  fileType: FileType.STANDARD_LOG,
  lines: [],
  mcVersion: '1.20.1',
  neoForgeVersion: '47.2.0',
  java: '17.0.1',
};
