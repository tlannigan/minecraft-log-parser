interface Options {
  lexicographical?: boolean;
  zeroExtend?: boolean;
}

/**
 * Compares two software version numbers (e.g. "1.7.1" or "1.2b").
 *
 * This function was born in http://stackoverflow.com/a/6832721.
 *
 * @param {string} version1 The first version to be compared.
 * @param {string} version2 The second version to be compared.
 * @param {object} [options] Optional flags that affect comparison behavior:
 * <ul>
 *     <li>
 *         <tt>lexicographical: true</tt> compares each part of the version strings lexicographically instead of
 *         naturally; this allows suffixes such as "b" or "dev" but will cause "1.10" to be considered smaller than
 *         "1.2".
 *     </li>
 *     <li>
 *         <tt>zeroExtend: true</tt> changes the result if one version string has less parts than the other. In
 *         this case the shorter string will be padded with "zero" parts instead of being considered smaller.
 *     </li>
 * </ul>
 * @returns {number|NaN}
 * <ul>
 *    <li>0 if the versions are equal</li>
 *    <li>a negative integer iff v1 < v2</li>
 *    <li>a positive integer iff v1 > v2</li>
 *    <li>NaN if either version string is in the wrong format</li>
 * </ul>
 */
export function compareVersions(
  version1: string,
  version2: string,
  options?: Options
): number {
  const lexicographical = options?.lexicographical;
  const zeroExtend = options?.zeroExtend;

  let v1Parts: any[] = version1.split('.');
  let v2Parts: any[] = version2.split('.');

  function isValidPart(x: string): boolean {
    return (lexicographical ? /^\d+[A-Za-z]*$/ : /^\d+$/).test(x);
  }

  if (!v1Parts.every(isValidPart) || !v2Parts.every(isValidPart)) {
    return NaN;
  }

  if (zeroExtend) {
    while (v1Parts.length < v2Parts.length) v1Parts.push('0');
    while (v2Parts.length < v1Parts.length) v2Parts.push('0');
  }

  if (!lexicographical) {
    v1Parts = v1Parts.map(Number);
    v2Parts = v2Parts.map(Number);
  }

  for (let i = 0; i < v1Parts.length; i++) {
    if (v2Parts.length == i) {
      return 1;
    }

    if (v1Parts[i] == v2Parts[i]) {
      continue;
    } else if (v1Parts[i] > v2Parts[i]) {
      return 1;
    } else {
      return -1;
    }
  }

  if (v1Parts.length != v2Parts.length) {
    return -1;
  }

  return 0;
}
