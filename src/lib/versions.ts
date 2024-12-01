import {
  VersionCheck,
  SingleVersionCheck,
  RangeVersionCheck,
} from '@/rules/rule';
import { compareVersions } from './compareVersions';
import { FileInfo } from '@/types/fileInfo';
import { Equality } from '@/types/enums';

export function getFileVersion(
  fileInfo: FileInfo,
  versionCheck: VersionCheck
): string | undefined {
  const fileVersion = fileInfo[versionCheck.attribute]?.toString();
  return fileVersion ?? undefined;
}

/**
 * @param fileVersion - Version to check
 * @param range - Inclusive start and exclusive end
 * @returns Whether `fileVersion` is within the given range
 */
export function matchesRange(
  fileVersion: string,
  versionCheck: RangeVersionCheck
): boolean {
  const range = versionCheck.range;

  if (versionCheck.isOuterRange) {
    // Outer range match
    const lessThanStart =
      compareVersions(fileVersion, range[0], { zeroExtend: true }) < 0;
    const greaterThanOrEqualToEnd =
      compareVersions(fileVersion, range[1], { zeroExtend: true }) >= 0;

    return lessThanStart || greaterThanOrEqualToEnd;
  } else {
    // Inner range match
    const greaterThanOrEqualToStart =
      compareVersions(fileVersion, range[0], { zeroExtend: true }) >= 0;
    const lessThanEnd =
      compareVersions(fileVersion, range[1], { zeroExtend: true }) < 0;

    return greaterThanOrEqualToStart && lessThanEnd;
  }
}

/**
 * @param fileVersion - Version to check
 * @param versionCheck - A `Rule`'s version check
 * @returns Whether `fileVersion` meets the version check's equality criteria.
 */
export function matchesEquality(
  fileVersion: string,
  versionCheck: SingleVersionCheck
): boolean {
  const comparison = compareVersions(fileVersion, versionCheck.version, {
    zeroExtend: true,
  });

  switch (versionCheck.equality) {
    case Equality.EQ:
      return comparison === 0;
    case Equality.NOT:
      return comparison !== 0;
    case Equality.GTE:
      return comparison >= 0;
    case Equality.GT:
      return comparison > 0;
    case Equality.LTE:
      return comparison <= 0;
    case Equality.LT:
      return comparison < 0;
  }

  return false;
}
