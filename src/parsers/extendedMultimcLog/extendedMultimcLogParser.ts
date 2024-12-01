import { FileInfo, MinecraftFileInfo } from '@/types/fileInfo';
import { Parser } from '../parserFactory';

export class ExtendedMultimcLogParser implements Parser {
  private fileInfo: FileInfo;

  constructor(metadata: FileInfo) {
    this.fileInfo = new MinecraftFileInfo(metadata);
  }

  parseModloader(): this {
    return this;
  }

  parseSystem(): this {
    return this;
  }

  parseIssues(): this {
    return this;
  }

  parse(): FileInfo {
    return this.fileInfo;
  }
}
