import { getMixinApplyFailures } from '../postProcessor';
import { Rule } from '../rule';
import { Equality, Severity } from '@/types/enums';

const GENERAL_JAVA_8_REQUIRED: Rule = {
  title: 'Java 8 required',
  description: 'Minecraft 1.16.5 and older requires Java 8.',
  severity: Severity.ERROR,
  versionChecks: [
    {
      attribute: 'mcVersion',
      equality: Equality.LTE,
      version: '1.16.5',
    },
    {
      attribute: 'java',
      range: ['1.8', '1.9'],
      isOuterRange: true,
    },
  ],
};

const GENERAL_JAVA_16_REQUIRED: Rule = {
  title: 'Java 16 required',
  description: 'Minecraft 1.17 requires Java 16.',
  severity: Severity.ERROR,
  versionChecks: [
    {
      attribute: 'mcVersion',
      range: ['1.17', '1.18'],
    },
    {
      attribute: 'java',
      range: ['16', '17'],
      isOuterRange: true,
    },
  ],
};

const GENERAL_JAVA_17_REQUIRED: Rule = {
  title: 'Java 17 required',
  description:
    'Minecraft 1.18-1.20.4 requires Java 17. May work with Java 21 but potentially problematic.',
  severity: Severity.ERROR,
  versionChecks: [
    {
      attribute: 'mcVersion',
      range: ['1.18', '1.20.5'],
    },
    {
      attribute: 'java',
      range: ['17', '18'],
      isOuterRange: true,
    },
  ],
};

const GENERAL_JAVA_21_REQUIRED: Rule = {
  title: 'Java 21 required',
  description: 'Minecraft 1.20.5+ requires Java 21.',
  severity: Severity.ERROR,
  versionChecks: [
    {
      attribute: 'mcVersion',
      equality: Equality.GTE,
      version: '1.20.5',
    },
    {
      attribute: 'java',
      range: ['21', '22'],
      isOuterRange: true,
    },
  ],
};

const GENERAL_PORT_BIND_FAILURE: Rule = {
  title: 'Failed to bind to port',
  description:
    'A process is already using the assigned port. Close any other servers or restart your computer.',
  severity: Severity.ERROR,
  searchStrings: ['**** FAILED TO BIND TO PORT!'],
  onlyFindFirst: true,
};

const GENERAL_MIXIN_FAILURE: Rule = {
  title: 'Mixin injection failure',
  description:
    'These mixins are failing to apply, try removing the mod(s) that own them:',
  severity: Severity.ERROR,
  searchStrings: [
    'Mixin apply failed',
    'ERROR]: Mixin apply for mod',
    'Caused by: org.spongepowered.asm.mixin.injection.throwables.InjectionError',
  ],
  postProcessor: getMixinApplyFailures,
};

const GENERAL_REACH_ENTITY_ATTRIBUTES: Rule = {
  title: 'Mixin injection failure',
  description:
    "Something is conflicting with Fabric's reach_entity_attributes module mixins. You will likely have to binary search to find the issue.",
  severity: Severity.ERROR,
  searchStrings: [
    'Caused by: org.spongepowered.asm.mixin.injection.throwables.InjectionError: Critical injection failure: Constant modifier method getActualReachDistance(DLnet/minecraft/world/level/Level;Lnet/minecraft/world/entity/player/Player;)D in mixins.reach-entity-attributes.json:ItemMixin from mod reach_entity_attributes failed injection check',
    'Mixin apply for mod reach_entity_attributes failed',
  ],
  versionChecks: [
    {
      attribute: 'mcVersion',
      equality: Equality.GTE,
      version: '1.16.5',
    },
  ],
  onlyFindFirst: true,
};

const GENERAL_CORRUPTED_CONFIGS: Rule = {
  title: 'Invalid or corrupted config',
  description:
    'One or more config files have become corrupted. Fix or delete them. When this error occurs there are usually multiple config files that require attention.',
  severity: Severity.FATAL,
  searchStrings: ['ConfigLoadingException: Failed loading config file'],
  onlyFindFirst: true,
};

const GENERAL_OFFLINE_MODE: Rule = {
  title: 'Server running in offline mode',
  description:
    'Offline servers can cause problems with mods that rely on player IDs. Switch to online mode before continuing to debug.',
  severity: Severity.WARNING,
  searchStrings: ['SERVER IS RUNNING IN OFFLINE/INSECURE MODE'],
  onlyFindFirst: true,
};

const GENERAL_CLOUD_FOLDER: Rule = {
  title: 'Cloud folder detected',
  description:
    'It is not recommended to store your modpack files in cloud-saved folders, like OneDrive or Apple CloudDocs, as it can lead to corrupted files or performance issues.',
  severity: Severity.WARNING,
  searchStrings: ['OneDrive', 'com~apple~CloudDocs'],
  onlyFindFirst: true,
};

const GENERAL_MAXIMUM_IDS_1_7_10: Rule = {
  title: 'Maximum ID range exceeded',
  description: 'Install Just Enough Item IDs (JEID).',
  severity: Severity.ERROR,
  searchStrings: ['Invalid id 4096 - maximum id range exceeded'],
  versionChecks: [
    {
      attribute: 'mcVersion',
      range: ['1.7', '1.8'],
    },
  ],
  onlyFindFirst: true,
};

// Can occur in standard log or crash report
const GENERAL_MAXIMUM_IDS_1_12: Rule = {
  title: 'Maximum ID range exceeded',
  description: 'Install Roughly Enough Item IDs (REID).',
  severity: Severity.ERROR,
  searchStrings: ['Invalid id 4096 - maximum id range exceeded'],
  versionChecks: [
    {
      attribute: 'mcVersion',
      range: ['1.12', '1.13'],
    },
  ],
  onlyFindFirst: true,
};

const GENERAL_POSE_STACK_NOT_EMPTY: Rule = {
  title: 'Pose stack not empty',
  description:
    "This error doesn't specify a specific mod, but can be caused by Epic Fight or OptiFine. If not either of these you must perform a binary search.",
  severity: Severity.ERROR,
  searchStrings: ['java.lang.IllegalStateException: Pose stack not empty'],
  onlyFindFirst: true,
  versionChecks: [
    {
      attribute: 'mcVersion',
      equality: Equality.GTE,
      version: '1.16.5',
    },
  ],
};

const GENERAL_LOG_CUT_OFF: Rule = {
  title: 'Log possibly cut off',
  description:
    "If a log's timestamps start at or around 00:00:00, it is likely cut off. Restart your client or server to generate a new, full log.",
  severity: Severity.WARNING,
  searchStrings: [
    '00:00:00',
    '00:00:01',
    '00:00:02',
    '00:00:03',
    '00:00:04',
    '00:00:05',
  ],
  onlyFindFirst: true,
};

export {
  GENERAL_JAVA_8_REQUIRED,
  GENERAL_JAVA_16_REQUIRED,
  GENERAL_JAVA_17_REQUIRED,
  GENERAL_JAVA_21_REQUIRED,
  GENERAL_PORT_BIND_FAILURE,
  GENERAL_MIXIN_FAILURE,
  GENERAL_REACH_ENTITY_ATTRIBUTES,
  GENERAL_CORRUPTED_CONFIGS,
  GENERAL_OFFLINE_MODE,
  GENERAL_CLOUD_FOLDER,
  GENERAL_MAXIMUM_IDS_1_7_10,
  GENERAL_MAXIMUM_IDS_1_12,
  GENERAL_POSE_STACK_NOT_EMPTY,
  GENERAL_LOG_CUT_OFF,
};
