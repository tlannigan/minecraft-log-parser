import {
  FORGE_1_12_MISSING_DEPENDENCIES,
  FORGE_1_16_MISSING_DEPENDENCIES,
  FORGE_1_7_10_MISSING_DEPENDENCIES,
  FORGE_DIFFERENT_MODLOADER_MOD,
  FORGE_DUPLICATE_MODS,
  FORGE_MODERN_MISSING_DEPENDENCIES,
  FORGE_MODLOADING_ERROR,
  FORGE_OPTIFINE,
  FORGE_UNSUPPORTED_OPTIONAL_DEPENDENCIES,
  FORGE_WRONG_JAVA_8,
} from '@/rules/forge/rules';
import { getTestFileInfo } from '../files/fileHelpers';

describe('Forge rules', () => {
  it('finds OptiFine issue', async () => {
    const rule = FORGE_OPTIFINE;
    const fileInfo = await getTestFileInfo(
      '/standard/forge-1.20.1-optifine.log'
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

  it('finds 1.7.10 missing or unsupported dependency issue', async () => {
    const rule = FORGE_1_7_10_MISSING_DEPENDENCIES;
    const fileInfo = await getTestFileInfo(
      '/standard/forge-1.7.10-missing_dependency.log'
    );

    expect(fileInfo.issues).toEqual([
      {
        title: rule.title,
        description: rule.description,
        severity: rule.severity,
        lineNumbers: [52],
      },
    ]);
  });

  it('finds 1.12.2 missing or unsupported dependency issue', async () => {
    const rule = FORGE_1_12_MISSING_DEPENDENCIES;
    const fileInfo = await getTestFileInfo(
      '/standard/forge-1.12.2-missing_dependency.log'
    );

    expect(fileInfo.issues).toEqual([
      {
        title: rule.title,
        description: rule.description,
        severity: rule.severity,
        lineNumbers: [40, 41],
      },
    ]);
  });

  it('finds 1.16.5 missing or unsupported dependency issue', async () => {
    const rule = FORGE_1_16_MISSING_DEPENDENCIES;
    const fileInfo = await getTestFileInfo(
      '/standard/forge-1.16.5-missing_dependency.log'
    );

    expect(fileInfo.issues).toEqual([
      {
        title: rule.title,
        description: rule.description,
        severity: rule.severity,
        lineNumbers: [11],
      },
    ]);
  });

  it('finds 1.18+ missing or unsupported dependency issue', async () => {
    const rule = FORGE_MODERN_MISSING_DEPENDENCIES;
    const fileInfo = await getTestFileInfo(
      '/standard/forge-1.20.1-missing_dependency.log'
    );

    expect(fileInfo.issues).toEqual([
      {
        title: rule.title,
        description: rule.description,
        extraInfo: ['Install cofh_core [11.0.0,11.1.0)'],
        severity: rule.severity,
        lineNumbers: [22],
      },
    ]);
  });

  it('finds unsupported optional dependency issue', async () => {
    const rule = FORGE_UNSUPPORTED_OPTIONAL_DEPENDENCIES;
    const fileInfo = await getTestFileInfo(
      '/standard/forge-1.18.2-unsupported_optional.log'
    );

    expect(fileInfo.issues).toEqual([
      {
        title: rule.title,
        description: rule.description,
        severity: rule.severity,
        lineNumbers: [9],
      },
    ]);
  });

  it('finds wrong Java 8 issue', async () => {
    const rule = FORGE_WRONG_JAVA_8;
    const fileInfo = await getTestFileInfo(
      '/standard/forge-1.16.5-wrong_java_8.log'
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

  it('finds different modloader mod issue', async () => {
    const rule = FORGE_DIFFERENT_MODLOADER_MOD;
    const fileInfo = await getTestFileInfo(
      '/standard/forge-1.20.4-different_modloader.log'
    );

    expect(fileInfo.issues).toEqual([
      {
        title: rule.title,
        description: rule.description,
        severity: rule.severity,
        lineNumbers: [33],
      },
    ]);
  });

  it('finds duplicate mod issue', async () => {
    const rule = FORGE_DUPLICATE_MODS;
    const fileInfo = await getTestFileInfo(
      '/standard/forge-1.19.2-duplicate_mods.log'
    );

    expect(fileInfo.issues).toEqual([
      {
        title: rule.title,
        description: rule.description,
        extraInfo: [
          'rubidium-mc1.19.2-0.6.2c.jar',
          'embeddium-0.3.18+mc1.19.2.jar',
        ],
        severity: rule.severity,
        lineNumbers: [274],
      },
    ]);
  });

  it('finds mod loading issue', async () => {
    const rule = FORGE_MODLOADING_ERROR;
    const fileInfo = await getTestFileInfo(
      '/standard/forge-1.18.2-mod_loading.log'
    );

    expect(fileInfo.issues).toEqual([
      {
        title: rule.title,
        description: rule.description,
        extraInfo: [
          'darkness - client-side only',
          'entity_texture_features - client-side only',
        ],
        severity: rule.severity,
        lineNumbers: [127, 172],
      },
    ]);
  });
});
