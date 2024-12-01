import { Equality, Severity } from '@/types/enums';
import { Rule } from '../rule';
import {
  getDuplicateMods,
  getMissingOrUnsupportedDependencies,
  getModloadingErrorMods,
} from '../postProcessor';

const FORGE_OPTIFINE: Rule = {
  title: 'OptiFine detected',
  description:
    'Consider modern alternatives to OptiFine like Embeddium (and Oculus for shaders).',
  severity: Severity.WARNING,
  searchStrings: ['OptiFineTransformationService.onLoad'],
  versionChecks: [
    {
      attribute: 'mcVersion',
      equality: Equality.GTE,
      version: '1.16.5',
    },
  ],
  onlyFindFirst: true,
};

const FORGE_1_7_10_MISSING_DEPENDENCIES: Rule = {
  title: 'Missing dependencies',
  description: 'Correct the dependency issues listed in your log.',
  severity: Severity.FATAL,
  searchStrings: [') requires mods ['],
  versionChecks: [
    {
      attribute: 'mcVersion',
      equality: Equality.EQ,
      version: '1.7.10',
    },
  ],
};

const FORGE_1_12_MISSING_DEPENDENCIES: Rule = {
  title: 'Missing dependencies',
  description: 'Correct the dependency issues listed in your log.',
  severity: Severity.FATAL,
  searchStrings: ['net.minecraftforge.fml.common.MissingModsException'],
  versionChecks: [
    {
      attribute: 'mcVersion',
      range: ['1.12', '1.13'],
    },
  ],
};

const FORGE_1_16_MISSING_DEPENDENCIES: Rule = {
  title: 'Missing dependencies',
  description: 'Correct the dependency issues listed in your log.',
  severity: Severity.FATAL,
  searchStrings: ['net.minecraftforge.fml.ModLoadingException'],
  versionChecks: [
    {
      attribute: 'mcVersion',
      range: ['1.16', '1.17'],
    },
  ],
  onlyFindFirst: true,
};

const FORGE_MODERN_MISSING_DEPENDENCIES: Rule = {
  title: 'Missing or unsupported dependencies',
  description: 'Correct the dependency issues listed in your log.',
  severity: Severity.FATAL,
  searchStrings: ['Missing or unsupported mandatory dependencies'],
  versionChecks: [
    {
      attribute: 'mcVersion',
      equality: Equality.GTE,
      version: '1.18.2',
    },
  ],
  onlyFindFirst: true,
  postProcessor: getMissingOrUnsupportedDependencies,
};

const FORGE_UNSUPPORTED_OPTIONAL_DEPENDENCIES: Rule = {
  title: 'Unsupported optional dependencies',
  description: 'Correct the dependency issues listed in your log.',
  severity: Severity.FATAL,
  searchStrings: ['Unsupported installed optional dependencies'],
  versionChecks: [
    {
      attribute: 'mcVersion',
      equality: Equality.GTE,
      version: '1.18.2',
    },
  ],
};

const FORGE_WRONG_JAVA_8: Rule = {
  title: 'Wrong Java 8 version',
  description:
    'Forge 36.2.25 and below requires Java 8 update 320 or below for Minecraft 1.16.',
  severity: Severity.ERROR,
  versionChecks: [
    {
      attribute: 'mcVersion',
      range: ['1.16', '1.17'],
    },
    {
      attribute: 'forgeVersion',
      range: ['36', '36.2.26'],
    },
    {
      attribute: 'java',
      equality: Equality.GT,
      version: '1.8.0.320',
    },
  ],
};

const FORGE_DIFFERENT_MODLOADER_MOD: Rule = {
  title: 'Failed to initialize mod container',
  description:
    'This can be caused by using a mod for the wrong modloader (eg. Fabric vs. Forge).',
  severity: Severity.ERROR,
  searchStrings: [
    'The following classes are missing, but are reported in the mods.toml:',
  ],
  versionChecks: [
    {
      attribute: 'mcVersion',
      equality: Equality.GTE,
      version: '1.16.5',
    },
  ],
};

const FORGE_DUPLICATE_MODS: Rule = {
  title: 'Duplicate mods',
  description:
    'Some mods can contain code from other mods and they can conflict. Remove one of the duplicate mods listed.',
  severity: Severity.ERROR,
  searchStrings: ['Found duplicate mods:'],
  versionChecks: [
    {
      attribute: 'mcVersion',
      equality: Equality.GTE,
      version: '1.16.5',
    },
  ],
  onlyFindFirst: true,
  postProcessor: getDuplicateMods,
};

const FORGE_MODLOADING_ERROR: Rule = {
  title: 'Mod loading error',
  description: 'One or more mods failed to load:',
  severity: Severity.ERROR,
  searchStrings: [': Failed to create mod instance. ModID:'],
  versionChecks: [
    {
      attribute: 'mcVersion',
      equality: Equality.GTE,
      version: '1.16.5',
    },
  ],
  postProcessor: getModloadingErrorMods,
};

export {
  FORGE_OPTIFINE,
  FORGE_MODERN_MISSING_DEPENDENCIES,
  FORGE_UNSUPPORTED_OPTIONAL_DEPENDENCIES,
  FORGE_1_7_10_MISSING_DEPENDENCIES,
  FORGE_1_12_MISSING_DEPENDENCIES,
  FORGE_1_16_MISSING_DEPENDENCIES,
  FORGE_WRONG_JAVA_8,
  FORGE_DIFFERENT_MODLOADER_MOD,
  FORGE_DUPLICATE_MODS,
  FORGE_MODLOADING_ERROR,
};
