import { hasPath, includesCaseless } from '@/lib/strings';

describe('includesCaseless', () => {
  it('is case insensitive', () => {
    const includes = includesCaseless('sOmE rAnDom stRinG', 'random string');
    expect(includes).toBe(true);
  });
});

describe('hasPath', () => {
  it('returns true when a file path contains the sub path', () => {
    const includesSubPath = hasPath(
      'C:\\Users\\me\\some\\directory',
      '/some/directory'
    );
    expect(includesSubPath).toBe(true);
  });
});
