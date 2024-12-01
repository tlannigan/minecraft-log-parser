import { passesVersionChecks } from '@/parsers/parseIssues';
import { RangeVersionCheck, Rule, SingleVersionCheck } from '@/rules/rule';
import { Equality, Severity } from '@/types/enums';
import {
  FILE_INFO_WITH_MCVERSION,
  FILE_INFO_WITH_MULTIPLE_ATTRIBUTES,
} from '../testDummies';

const MCVERSION_CHECK: SingleVersionCheck = {
  attribute: 'mcVersion',
  equality: Equality.EQ,
  version: '1.20.1',
};

const NEOFORGE_CHECK: RangeVersionCheck = {
  attribute: 'neoForgeVersion',
  range: ['47.0.0', '48.0.0'],
};

const JAVA_CHECK: SingleVersionCheck = {
  attribute: 'java',
  equality: Equality.GTE,
  version: '17.0.0',
};

describe('passesVersionChecks', () => {
  it('returns true for a single version check', () => {
    const rule: Rule = {
      versionChecks: [MCVERSION_CHECK],
      severity: Severity.ERROR,
      title: '',
      description: '',
    };

    const passesCheck = passesVersionChecks(FILE_INFO_WITH_MCVERSION, rule);
    expect(passesCheck).toBe(true);
  });

  it('returns true for multiple version checks', () => {
    const rule: Rule = {
      versionChecks: [MCVERSION_CHECK, NEOFORGE_CHECK, JAVA_CHECK],
      severity: Severity.ERROR,
      title: '',
      description: '',
    };

    const passesCheck = passesVersionChecks(
      FILE_INFO_WITH_MULTIPLE_ATTRIBUTES,
      rule
    );
    expect(passesCheck).toBe(true);
  });

  it('returns false when attribute missing', () => {
    const rule: Rule = {
      versionChecks: [NEOFORGE_CHECK],
      severity: Severity.ERROR,
      title: '',
      description: '',
    };

    const passesCheck = passesVersionChecks(FILE_INFO_WITH_MCVERSION, rule);
    expect(passesCheck).toBe(false);
  });
});
