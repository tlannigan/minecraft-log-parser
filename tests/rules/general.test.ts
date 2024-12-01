import {
  GENERAL_CLOUD_FOLDER,
  GENERAL_CORRUPTED_CONFIGS,
  GENERAL_JAVA_16_REQUIRED,
  GENERAL_JAVA_17_REQUIRED,
  GENERAL_JAVA_21_REQUIRED,
  GENERAL_JAVA_8_REQUIRED,
  GENERAL_MAXIMUM_IDS_1_12,
  GENERAL_MIXIN_FAILURE,
  GENERAL_OFFLINE_MODE,
  GENERAL_PORT_BIND_FAILURE,
  GENERAL_REACH_ENTITY_ATTRIBUTES,
} from '@/rules/general/rules';
import { getTestFileInfo } from '../files/fileHelpers';

describe('General rules', () => {
  it('finds Java 8 required issue', async () => {
    const rule = GENERAL_JAVA_8_REQUIRED;
    const fileInfo = await getTestFileInfo(
      '/standard/forge-1.16.5-requires_java_8.log'
    );

    expect(fileInfo.issues).toEqual([
      {
        title: rule.title,
        description: rule.description,
        severity: rule.severity,
        lineNumbers: [-1],
      },
    ]);
  });

  it('finds Java 16 required issue', async () => {
    const rule = GENERAL_JAVA_16_REQUIRED;
    const fileInfo = await getTestFileInfo(
      '/standard/forge-1.17.1-requires_java_16.log'
    );

    expect(fileInfo.issues).toEqual([
      {
        title: rule.title,
        description: rule.description,
        severity: rule.severity,
        lineNumbers: [-1],
      },
    ]);
  });

  it('finds Java 17 required issue', async () => {
    const rule = GENERAL_JAVA_17_REQUIRED;
    const fileInfo = await getTestFileInfo(
      '/standard/forge-1.19.2-requires_java_17.log'
    );

    expect(fileInfo.issues).toEqual([
      {
        title: rule.title,
        description: rule.description,
        severity: rule.severity,
        lineNumbers: [-1],
      },
    ]);
  });

  it('finds Java 21 required issue', async () => {
    const rule = GENERAL_JAVA_21_REQUIRED;
    const fileInfo = await getTestFileInfo(
      '/standard/neoforge-1.20.5-requires_java_21.log'
    );

    expect(fileInfo.issues).toEqual([
      {
        title: rule.title,
        description: rule.description,
        severity: rule.severity,
        lineNumbers: [-1],
      },
    ]);
  });

  it('finds port binding issue', async () => {
    const rule = GENERAL_PORT_BIND_FAILURE;
    const fileInfo = await getTestFileInfo(
      '/standard/forge-1.18.2-port_bind_failed.log'
    );

    expect(fileInfo.issues).toEqual([
      {
        title: rule.title,
        description: rule.description,
        severity: rule.severity,
        lineNumbers: [27],
      },
    ]);
  });

  it('finds mixin injection failure issue', async () => {
    const rule = GENERAL_MIXIN_FAILURE;
    const fileInfo = await getTestFileInfo(
      '/standard/forge-1.18.2-mixin_apply_failed.log'
    );

    expect(fileInfo.issues).toEqual([
      {
        title: rule.title,
        description:
          'These mixins are failing to apply, try removing the mod(s) that own them:',
        extraInfo: ['shulkerboxtooltip-common'],
        severity: rule.severity,
        lineNumbers: [134],
      },
    ]);
  });

  it('finds reach_entity_attributes mixin injection failure issue', async () => {
    const rule = GENERAL_REACH_ENTITY_ATTRIBUTES;
    const fileInfo = await getTestFileInfo(
      '/standard/forge-1.20.1-reach_entity_attributes.log'
    );

    expect(fileInfo.issues).toEqual([
      {
        title: rule.title,
        description: rule.description,
        severity: rule.severity,
        lineNumbers: [1137],
      },
    ]);
  });

  it('finds corrupted config issue', async () => {
    const rule = GENERAL_CORRUPTED_CONFIGS;
    const fileInfo = await getTestFileInfo(
      '/standard/forge-1.20.1-corrupted_configs.log'
    );

    expect(fileInfo.issues).toEqual([
      {
        title: rule.title,
        description: rule.description,
        severity: rule.severity,
        lineNumbers: [159],
      },
    ]);
  });

  it('finds offline mode issue', async () => {
    const rule = GENERAL_OFFLINE_MODE;
    const fileInfo = await getTestFileInfo(
      '/standard/forge-1.20.1-offline_mode.log'
    );

    expect(fileInfo.issues).toEqual([
      {
        title: rule.title,
        description: rule.description,
        severity: rule.severity,
        lineNumbers: [1944],
      },
    ]);
  });

  it('finds cloud folder issue', async () => {
    const rule = GENERAL_CLOUD_FOLDER;
    const fileInfo = await getTestFileInfo(
      '/standard/forge-1.12.2-cloud_folder.log'
    );

    expect(fileInfo.issues).toEqual([
      {
        title: rule.title,
        description: rule.description,
        severity: rule.severity,
        lineNumbers: [6],
      },
    ]);
  });

  it('finds maximum ID range exceeded issue', async () => {
    const rule = GENERAL_MAXIMUM_IDS_1_12;
    const fileInfo = await getTestFileInfo(
      '/standard/forge-1.12.2-maximum_id_range.log'
    );

    expect(fileInfo.issues).toEqual([
      {
        title: rule.title,
        description: rule.description,
        severity: rule.severity,
        lineNumbers: [1335],
      },
    ]);
  });
});
