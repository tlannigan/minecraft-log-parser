import parseFileType from '@/parsers/parseFileType';
import { FileInfo } from '@/types/fileInfo';

export default function parseMetadata(lines: string[], file?: File): FileInfo {
  return {
    lines,
    fileName: file?.name,
    fizeSize: file?.size,
    lastModified: file?.lastModified,
    lineCount: lines.length,
    fileType: parseFileType(lines, file?.name),
  };
}
