import {
  GENERAL_CLOUD_FOLDER,
  GENERAL_CORRUPTED_CONFIGS,
  GENERAL_JAVA_16_REQUIRED,
  GENERAL_JAVA_17_REQUIRED,
  GENERAL_JAVA_21_REQUIRED,
  GENERAL_JAVA_8_REQUIRED,
  GENERAL_LOG_CUT_OFF,
  GENERAL_MAXIMUM_IDS_1_12,
  GENERAL_MAXIMUM_IDS_1_7_10,
  GENERAL_MIXIN_FAILURE,
  GENERAL_OFFLINE_MODE,
  GENERAL_PORT_BIND_FAILURE,
  GENERAL_POSE_STACK_NOT_EMPTY,
  GENERAL_REACH_ENTITY_ATTRIBUTES,
} from './rules';
import { RuleCategory } from '../rule';

export const GENERAL_RULES: RuleCategory = {
  versionChecks: [],
  rules: [
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
  ],
};
