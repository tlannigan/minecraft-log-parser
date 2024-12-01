export type PostProcessor = (lines: string[]) => string[];

/**
 * Parses out the missing dependencies and provides them as a user-readable list
 *
 * @param lines file lines starting with the first line where the rule that was detected
 * @returns all mods listed that have to be installed
 */
export const getMissingOrUnsupportedDependencies = (
  lines: string[]
): string[] => {
  let extraInfo = new Set<string>();
  for (let i = 1; i < lines.length; i++) {
    if (lines[i].trim().toLowerCase().startsWith('mod id: ')) {
      const values = lines[i].trim().split(':');
      const modId = values[1].split(',')[0].trim().slice(1, -1);
      const expectedRange = values[3].split(', ')[0].trim().slice(1, -1);

      if (expectedRange !== "'*'") {
        extraInfo.add(`Install ${modId} ${expectedRange}`);
      } else {
        extraInfo.add(`Install ${modId}`);
      }
    } else {
      break;
    }
  }

  return Array.from(extraInfo);
};
export const getDuplicateMods = (lines: string[]): string[] => {
  const extraInfo = [];
  for (let i = 1; i < lines.length; i++) {
    if (lines[i].trim().toLowerCase().startsWith('mod id: ')) {
      const indexOfFileNames = lines[i].indexOf('from mod files:') + 16;
      const fileNames = lines[i].slice(indexOfFileNames).split(', ');
      for (const fileName of fileNames) {
        extraInfo.push(fileName.trim());
      }
    } else {
      break;
    }
  }

  return extraInfo;
};
export const getMixinApplyFailures = (lines: string[]): string[] => {
  const extraInfo = [];
  const splitWords = lines[0].trim().split(/[\s:]/g);
  const mixinJsons = splitWords.filter(
    (word) => word.endsWith('.json') && !word.includes('refmap')
  );

  if (mixinJsons) {
    // Remove "mixins" and "json" portions of the mixin name, leaving the name given by the mod author
    const filteredMixinNames = new Set(
      mixinJsons.map((mixin) => mixin.replace(/(mixins|mixin|json)/g, ''))
    );

    for (const mixin of filteredMixinNames) {
      extraInfo.push(mixin.replaceAll('.', ''));
    }
  }

  return extraInfo;
};

export const getModloadingErrorMods = (lines: string[]): string[] => {
  const indexOfModName = lines[0].toLowerCase().indexOf('modid: ') + 7;
  const modName = lines[0].slice(indexOfModName).split(', ')[0];

  const environmentWarning = lines[1].includes(
    'for invalid dist DEDICATED_SERVER'
  )
    ? ' - client-side only'
    : '';

  return [modName + environmentWarning];
};
