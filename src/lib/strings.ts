/**
 * Check if string contains search, regardless of case
 *
 * @param text - subject of the search
 * @param searchString - string to find
 * @returns whether searchString was found in text
 */
export function includesCaseless(text: string, searchString: string): boolean {
  return text.toLowerCase().includes(searchString.toLowerCase());
}

export function replaceTabsWithSpaces(lines: string[]) {
  return lines.map((line) => line.replace(/\t/gy, '    '));
}

export function removeAllNewlineCharacters(lines: string[]) {
  return lines.map((line) => line.replace(/\r?\n|\r/g, ''));
}

export function addNewlineCharacterEndings(lines: string[]) {
  return lines.map((line, index) => {
    const isBlank = line.trim() === '';
    const isLastElement = index === lines.length - 1;
    return !isBlank && !isLastElement ? line + '\r' : line;
  });
}

export function lastLineEndsWithNewline(lines: string[]) {
  return /\r?\n/g.test(lines[lines.length - 1]);
}

export function removeTimestamp(line: string) {
  if (line.startsWith('[')) {
    const end = line.indexOf(']') + 1;
    const detimestampedLine = line.substring(end);
    // Check if line only consists of text within square brackets
    if (detimestampedLine.trim() !== '') {
      return detimestampedLine;
    } else {
      return line;
    }
  } else {
    return line;
  }
}

/**
 * Checks if filepaths contain a sub path directory.
 *
 * @param fullPath
 * @param subPath
 * @returns Whether the full path contains the sub
 * path, regardless of file path syntax or case
 */
export function hasPath(fullPath: string, subPath: string) {
  const forwardSlashedFullPath = fullPath.replaceAll('\\', '/').toLowerCase();
  const forwardSlashesTargetDir = subPath.replaceAll('\\', '/').toLowerCase();
  return includesCaseless(forwardSlashedFullPath, forwardSlashesTargetDir);
}
