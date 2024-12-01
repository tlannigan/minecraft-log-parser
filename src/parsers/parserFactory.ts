import parseMetadata from '@/parsers/parseMetadata';
import { FileType } from '@/types/enums';
import { FileInfo } from '@/types/fileInfo';
import { StandardLogParser } from '@/parsers/standardLog/standardLogParser';
import { ExtendedMultimcLogParser } from '@/parsers/extendedMultimcLog/extendedMultimcLogParser';
import { CrashReportParser } from '@/parsers/crashReport/crashReportParser';
import { LauncherLogParser } from '@/parsers/launcherLog/launcherLogParser';
import { HotspotCrashDumpParser } from '@/parsers/hotspotCrashDump/hotspotCrashDumpParser';

export interface Parser {
  parseModloader(): this;
  parseSystem(): this;
  parseIssues(): this;
  parse(): FileInfo;
}

export class ParserFactory {
  static create(lines: string[], file?: File): Parser {
    const metadata = parseMetadata(lines, file);
    const fileType = metadata.fileType;

    if (fileType === FileType.STANDARD_LOG) {
      return new StandardLogParser(metadata);
    } else if (fileType === FileType.EXTENDED_MULTIMC_LOG) {
      return new ExtendedMultimcLogParser(metadata);
    } else if (fileType === FileType.CRASH_REPORT) {
      return new CrashReportParser(metadata);
    } else if (fileType === FileType.LAUNCHER_LOG) {
      return new LauncherLogParser(metadata);
    } else if (fileType === FileType.HS_ERR_PID) {
      return new HotspotCrashDumpParser(metadata);
    } else {
      throw new Error('Could not determine the file type.');
    }
  }
}
