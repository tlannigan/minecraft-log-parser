import { compareVersions } from '@/lib/compareVersions';

const LOWER_VERSION = '1.19.2';
const VERSION = '1.20.1';
const HIGHER_VERSION = '1.20.2';

const VERSION_SHORT = '17';
const VERSION_LONG = '17.0.0';

describe('compareVersions', () => {
  it('returns -1 when first version is lower than the second', () => {
    const versionComparison = compareVersions(LOWER_VERSION, VERSION);
    expect(versionComparison).toBe(-1);
  });

  it('returns 0 when first version is equal to the second', () => {
    const versionComparison = compareVersions(VERSION, VERSION);
    expect(versionComparison).toBe(0);
  });

  it('returns 1 when first version is higher than the second', () => {
    const versionComparison = compareVersions(HIGHER_VERSION, VERSION);
    expect(versionComparison).toBe(1);
  });

  it('correctly compares equal versions with extended zeroes', () => {
    const versionComparison = compareVersions(VERSION_SHORT, VERSION_LONG, {
      zeroExtend: true,
    });
    expect(versionComparison).toBe(0);
  });
});
