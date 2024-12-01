import { getFileVersion, matchesEquality, matchesRange } from '@/lib/versions';
import {
  RangeVersionCheck,
  SingleVersionCheck,
  VersionCheck,
  VersionRange,
} from '@/rules/rule';
import { FILE_INFO_WITH_MCVERSION } from '../testDummies';
import { Equality } from '@/types/enums';

const LOWEST_VERSION = '1.18.2';
const LOWER_VERSION = '1.19.2';
const VERSION = '1.20.1';
const HIGHER_VERSION = '1.20.2';
const HIGHEST_VERSION = '1.20.4';
const ATTRIBUTE = 'mcVersion';

describe('getFileVersion', () => {
  it('returns file version', () => {
    const versionCheck: VersionCheck = { attribute: 'mcVersion' };
    const fileVersion = getFileVersion(FILE_INFO_WITH_MCVERSION, versionCheck);
    expect(fileVersion).toEqual(VERSION);
  });

  it('returns undefined when supplied attribute is missing', () => {
    const versionCheck: VersionCheck = { attribute: 'fmlVersion' };
    const fileVersion = getFileVersion(FILE_INFO_WITH_MCVERSION, versionCheck);
    expect(fileVersion).toEqual(undefined);
  });
});

describe('matchesRange', () => {
  const RANGE: VersionRange = [LOWER_VERSION, HIGHER_VERSION];

  describe('inner range match', () => {
    const RANGE_VERSION_CHECK: RangeVersionCheck = {
      attribute: ATTRIBUTE,
      range: RANGE,
    };

    it('returns true when a version is inside an inner range', () => {
      const versionIsInRange = matchesRange(VERSION, RANGE_VERSION_CHECK);
      expect(versionIsInRange).toBe(true);
    });

    it('returns true when a version matches the start of an inner range', () => {
      const versionIsInRange = matchesRange(LOWER_VERSION, RANGE_VERSION_CHECK);
      expect(versionIsInRange).toBe(true);
    });

    it('returns false when a version matches the end of an inner range', () => {
      const versionIsInRange = matchesRange(
        HIGHER_VERSION,
        RANGE_VERSION_CHECK
      );
      expect(versionIsInRange).toBe(false);
    });
  });

  describe('outer range match', () => {
    const OUTER_RANGE_VERSION_CHECK: RangeVersionCheck = {
      attribute: ATTRIBUTE,
      range: RANGE,
      isOuterRange: true,
    };

    it('returns true when a version is less than an outer range', () => {
      const versionIsOutsideRange = matchesRange(
        LOWEST_VERSION,
        OUTER_RANGE_VERSION_CHECK
      );
      expect(versionIsOutsideRange).toBe(true);
    });

    it('returns true when a version is greater than an outer range', () => {
      const versionIsOutsideRange = matchesRange(
        HIGHEST_VERSION,
        OUTER_RANGE_VERSION_CHECK
      );
      expect(versionIsOutsideRange).toBe(true);
    });

    it('returns false when a version is inside an outer range', () => {
      const versionIsOutsideRange = matchesRange(
        VERSION,
        OUTER_RANGE_VERSION_CHECK
      );
      expect(versionIsOutsideRange).toBe(false);
    });
  });
});

describe('matchesEquality', () => {
  describe('equals comparison', () => {
    it('returns true for equal versions', () => {
      const versionCheck: SingleVersionCheck = {
        attribute: ATTRIBUTE,
        equality: Equality.EQ,
        version: VERSION,
      };
      const equality = matchesEquality(VERSION, versionCheck);
      expect(equality).toBe(true);
    });

    it('returns false for lower versions', () => {
      const versionCheck: SingleVersionCheck = {
        attribute: ATTRIBUTE,
        equality: Equality.EQ,
        version: VERSION,
      };
      const equality = matchesEquality(LOWER_VERSION, versionCheck);
      expect(equality).toBe(false);
    });

    it('returns false for higher versions', () => {
      const versionCheck: SingleVersionCheck = {
        attribute: ATTRIBUTE,
        equality: Equality.EQ,
        version: VERSION,
      };
      const equality = matchesEquality(HIGHER_VERSION, versionCheck);
      expect(equality).toBe(false);
    });
  });

  describe('not equals comparison', () => {
    it('returns true for lower versions', () => {
      const versionCheck: SingleVersionCheck = {
        attribute: ATTRIBUTE,
        equality: Equality.NOT,
        version: VERSION,
      };
      const equality = matchesEquality(LOWER_VERSION, versionCheck);
      expect(equality).toBe(true);
    });

    it('returns true for higher versions', () => {
      const versionCheck: SingleVersionCheck = {
        attribute: ATTRIBUTE,
        equality: Equality.NOT,
        version: VERSION,
      };
      const equality = matchesEquality(HIGHER_VERSION, versionCheck);
      expect(equality).toBe(true);
    });

    it('returns false for equal versions', () => {
      const versionCheck: SingleVersionCheck = {
        attribute: ATTRIBUTE,
        equality: Equality.NOT,
        version: VERSION,
      };
      const equality = matchesEquality(VERSION, versionCheck);
      expect(equality).toBe(false);
    });
  });

  describe('greater than or equals to comparison', () => {
    it('returns true for equal versions', () => {
      const versionCheck: SingleVersionCheck = {
        attribute: ATTRIBUTE,
        equality: Equality.GTE,
        version: VERSION,
      };
      const equality = matchesEquality(VERSION, versionCheck);
      expect(equality).toBe(true);
    });

    it('returns true for higher versions', () => {
      const versionCheck: SingleVersionCheck = {
        attribute: ATTRIBUTE,
        equality: Equality.GTE,
        version: VERSION,
      };
      const equality = matchesEquality(HIGHER_VERSION, versionCheck);
      expect(equality).toBe(true);
    });

    it('returns false for lower versions', () => {
      const versionCheck: SingleVersionCheck = {
        attribute: ATTRIBUTE,
        equality: Equality.GTE,
        version: VERSION,
      };
      const equality = matchesEquality(LOWER_VERSION, versionCheck);
      expect(equality).toBe(false);
    });
  });

  describe('greater than comparison', () => {
    it('returns true for higher versions', () => {
      const versionCheck: SingleVersionCheck = {
        attribute: ATTRIBUTE,
        equality: Equality.GT,
        version: VERSION,
      };
      const equality = matchesEquality(HIGHER_VERSION, versionCheck);
      expect(equality).toBe(true);
    });

    it('returns false for equal versions', () => {
      const versionCheck: SingleVersionCheck = {
        attribute: ATTRIBUTE,
        equality: Equality.GT,
        version: VERSION,
      };
      const equality = matchesEquality(VERSION, versionCheck);
      expect(equality).toBe(false);
    });

    it('returns false for lower versions', () => {
      const versionCheck: SingleVersionCheck = {
        attribute: ATTRIBUTE,
        equality: Equality.GT,
        version: VERSION,
      };
      const equality = matchesEquality(LOWER_VERSION, versionCheck);
      expect(equality).toBe(false);
    });
  });

  describe('less than or equal to comparison', () => {
    it('returns true for equal versions', () => {
      const versionCheck: SingleVersionCheck = {
        attribute: ATTRIBUTE,
        equality: Equality.LTE,
        version: VERSION,
      };
      const equality = matchesEquality(VERSION, versionCheck);
      expect(equality).toBe(true);
    });

    it('returns true for lower versions', () => {
      const versionCheck: SingleVersionCheck = {
        attribute: ATTRIBUTE,
        equality: Equality.LTE,
        version: VERSION,
      };
      const equality = matchesEquality(LOWER_VERSION, versionCheck);
      expect(equality).toBe(true);
    });

    it('returns false for higher versions', () => {
      const versionCheck: SingleVersionCheck = {
        attribute: ATTRIBUTE,
        equality: Equality.LTE,
        version: VERSION,
      };
      const equality = matchesEquality(HIGHER_VERSION, versionCheck);
      expect(equality).toBe(false);
    });
  });

  describe('less than comparison', () => {
    it('returns true for lower versions', () => {
      const versionCheck: SingleVersionCheck = {
        attribute: ATTRIBUTE,
        equality: Equality.LT,
        version: VERSION,
      };
      const equality = matchesEquality(LOWER_VERSION, versionCheck);
      expect(equality).toBe(true);
    });

    it('returns false for equal versions', () => {
      const versionCheck: SingleVersionCheck = {
        attribute: ATTRIBUTE,
        equality: Equality.LT,
        version: VERSION,
      };
      const equality = matchesEquality(VERSION, versionCheck);
      expect(equality).toBe(false);
    });

    it('returns false for higher versions', () => {
      const versionCheck: SingleVersionCheck = {
        attribute: ATTRIBUTE,
        equality: Equality.LT,
        version: VERSION,
      };
      const equality = matchesEquality(HIGHER_VERSION, versionCheck);
      expect(equality).toBe(false);
    });
  });
});
