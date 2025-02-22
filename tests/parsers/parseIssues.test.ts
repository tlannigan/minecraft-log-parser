import { GENERAL_MIXIN_FAILURE } from '@/rules/general/rules';
import { getTestFileInfo } from '../files/fileHelpers';

describe('Issue parser', () => {
  it('finds search string issues', async () => {
    const rule = GENERAL_MIXIN_FAILURE;
    const fileInfo = await getTestFileInfo(
      '/standard/forge-1.18.2-mixin_apply_failed.log'
    );

    expect(fileInfo.issues).toEqual([
      {
        title: rule.title,
        description: rule.description,
        severity: rule.severity,
        extraInfo: ['shulkerboxtooltip-common'],
        lineNumbers: [134],
      },
    ]);
  });

  it('finds version check issues', async () => {
    const fileInfo = await getTestFileInfo(
      '/standard/forge-1.19.2-requires_java_17.log'
    );
    const issues = fileInfo.issues;

    expect(issues).toEqual([
      {
        lineNumbers: [-1],
        severity: 'Error',
        title: 'Java 17 required',
        description:
          'Minecraft 1.18-1.20.4 requires Java 17. May work with Java 21 but potentially problematic.',
      },
    ]);
  });
});
