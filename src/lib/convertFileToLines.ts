import { ParsingConfig } from '../types/parsingConfig';
import {
  addNewlineCharacterEndings,
  lastLineEndsWithNewline,
  removeAllNewlineCharacters,
  removeTimestamp,
  replaceTabsWithSpaces,
} from './strings';

export class LineParserState {
  allLines: string[] = [];
  duplicateIndex: number = -1;
  duplicateCount: number = 0;
  partialLine: string = '';
}

export default async function convertFileToLines(
  file: File,
  config?: ParsingConfig
): Promise<string[]> {
  const stream = file.stream().pipeThrough(new TextDecoderStream());
  const reader = stream.getReader();
  let fileLines: string[] = [];

  try {
    fileLines = await parseLines(reader, config);
  } catch (e) {
    throw new TypeError(
      'File could not be parsed, it may have an invalid format.'
    );
  } finally {
    reader.releaseLock();
  }

  return fileLines;
}

export async function parseLines(
  streamReader: ReadableStreamDefaultReader<string>,
  config?: ParsingConfig
) {
  const state = new LineParserState();

  while (true) {
    const { done, value } = await streamReader.read();

    const rawLines = value ? value.split(/\r?\n/) : [];
    const linesWithSpacesInsteadOfTabs = replaceTabsWithSpaces(rawLines);
    const lines = removeAllNewlineCharacters(linesWithSpacesInsteadOfTabs);

    // Add a partial line from previous chunk if available
    if (state.partialLine !== '' && lines.length > 0) {
      lines[0] = state.partialLine + lines[0]; // Complete the partial line
      state.partialLine = ''; // Reset partial line state
    } else if (state.partialLine !== '') {
      lines.push(state.partialLine);
    }

    // Check for a partial line that doesn't end with a newline
    if (lines.length > 0 && !lastLineEndsWithNewline(rawLines) && !done) {
      state.partialLine = lines.pop() as string;
    }

    if (config?.removeRepeatedLines) {
      const deduplicatedLines = deduplicateLines(lines, state, done);
      state.allLines = state.allLines.concat(deduplicatedLines);
    } else {
      state.allLines = state.allLines.concat(lines);
    }

    if (done) break;
  }

  const linesWithNewlines = addNewlineCharacterEndings(state.allLines);
  return linesWithNewlines;
}

export function deduplicateLines(
  lines: string[],
  state: LineParserState,
  done: boolean
) {
  const deduplicatedLines = [];

  const addRepeatedLine = () => {
    deduplicatedLines.push(
      `      Repeated ${state.duplicateCount} more time(s)`
    );
  };

  const resetDuplicateInfo = () => {
    state.duplicateIndex = -1;
    state.duplicateCount = 0;
  };

  for (let line = 0; line < lines.length; line++) {
    const isLineBlank = lines[line].trim() === '';
    if (isLineBlank) {
      deduplicatedLines.push(lines[line] + '\n');
      continue;
    }

    if (line > 0) {
      const isLineDuplicateOfPreviousLine =
        removeTimestamp(lines[line]) === removeTimestamp(lines[line - 1]);
      if (isLineDuplicateOfPreviousLine) {
        if (state.duplicateIndex < 0) {
          // If this is a new duplicate chain
          state.duplicateIndex = line - 1; // Mark the first of the duplicates
        }
        state.duplicateCount++;
      } else {
        if (state.duplicateIndex >= 0 && line !== lines.length - 1) {
          addRepeatedLine();
          resetDuplicateInfo();
          deduplicatedLines.push(lines[line]);
        } else {
          deduplicatedLines.push(lines[line]);
        }
      }
    } else {
      const isLineDuplicateOfPreviousIterationsLastLine =
        state.allLines.length > 0 &&
        removeTimestamp(lines[line]) ===
          removeTimestamp(state.allLines[state.allLines.length - 1]);
      if (isLineDuplicateOfPreviousIterationsLastLine) {
        state.duplicateCount++;
        if (lines.length === 1) {
          addRepeatedLine();
          resetDuplicateInfo();
        }
      } else {
        deduplicatedLines.push(lines[line]);
      }
    }
  }

  if (done && state.duplicateIndex >= 0) {
    addRepeatedLine();
    resetDuplicateInfo();
  }

  return deduplicatedLines;
}
