import { Equality, Severity } from '@/types/enums';
import { FileInfo } from '@/types/fileInfo';
import { PostProcessor } from './postProcessor';

export interface RuleCategory {
  versionChecks?: (SingleVersionCheck | RangeVersionCheck)[];
  rules: Rule[];
}

export interface Rule {
  versionChecks?: (SingleVersionCheck | RangeVersionCheck)[];
  severity: Severity;
  title: string;
  description: string;
  /** Stop searching for this rule after the first discovery */
  onlyFindFirst?: boolean;
  /** Strings that will trigger this rule */
  searchStrings?: string[];
  postProcessor?: PostProcessor;
}

export interface VersionCheck {
  /** Attribute key from FileInfo */
  attribute: keyof Omit<FileInfo, 'issues' | 'lines'>;
}

export interface SingleVersionCheck extends VersionCheck {
  equality: Equality;
  /** Version that the FileInfo must match against. */
  version: string;
}

/**
 * Inclusive start, exclusive end
 */
export type VersionRange = readonly [string, string];

export interface RangeVersionCheck extends VersionCheck {
  range: VersionRange;
  /** If range should include everything NOT inside. Defaults to inner range. */
  isOuterRange?: boolean;
}
