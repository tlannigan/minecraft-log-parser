import { FileInfo, MinecraftFileInfo } from '@/types/fileInfo';
import { Parser } from '@/parsers/parserFactory';

export class CrashReportParser implements Parser {
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
