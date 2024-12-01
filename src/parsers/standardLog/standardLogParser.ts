import { FileInfo, MinecraftFileInfo } from '@/types/fileInfo';
import { Parser } from '@/parsers/parserFactory';
import parseModloader from './parseModloader';
import parseSystem from './parseSystem';
import parseIssues from '../parseIssues';
import { GENERAL_RULES } from '@/rules/general/category';
import { ParsingConfig } from '@/types/parsingConfig';
import FORGE_RULES from '@/rules/forge/category';

export class StandardLogParser implements Parser {
  private fileInfo: FileInfo;
  private config?: ParsingConfig;

  constructor(metadata: FileInfo, config?: ParsingConfig) {
    this.fileInfo = new MinecraftFileInfo(metadata);
    this.config = config;
  }

  parseModloader(): this {
    this.fileInfo = {
      ...this.fileInfo,
      ...parseModloader(this.fileInfo.lines),
    };
    return this;
  }

  parseSystem(): this {
    this.fileInfo = {
      ...this.fileInfo,
      ...parseSystem(this.fileInfo.lines),
    };
    return this;
  }

  parseIssues(): this {
    const standardLogRules = [GENERAL_RULES, FORGE_RULES];
    this.fileInfo.issues = parseIssues(this.fileInfo, standardLogRules);
    return this;
  }

  parse(): FileInfo {
    return this.fileInfo;
  }
}
