import { getTestFileLines } from '../../files/fileHelpers';
import parseModloader from '@/parsers/standardLog/parseModloader';

describe('Standard log modloader parser', () => {
  it('returns Forge 1.7.10 attributes', async () => {
    const fileLines = await getTestFileLines('/standard/forge-1.7.10.log');
    const attributes = parseModloader(fileLines);

    expect(attributes).toEqual({
      forgeVersion: '7.99.40.1614',
      mcVersion: '1.7.10',
    });
  });

  it('returns Forge 1.12.2 modloader attributes', async () => {
    const fileLines = await getTestFileLines('/standard/forge-1.12.2.log');
    const attributes = parseModloader(fileLines);

    expect(attributes).toEqual({
      forgeVersion: '14.23.5.2860',
      mcVersion: '1.12.2',
    });
  });

  it('returns Forge 1.16.5 modloader attributes', async () => {
    const fileLines = await getTestFileLines('/standard/forge-1.16.5.log');
    const attributes = parseModloader(fileLines);

    expect(attributes).toEqual({
      accessToken: '????????',
      assetIndex: '1.16',
      assetsDir: 'C:\\Users\\tlannigan\\curseforge\\minecraft\\Install\\assets',
      forgeGroup: 'net.minecraftforge',
      forgeVersion: '36.2.42',
      gameDir: 'C:\\Users\\tlannigan\\curseforge\\minecraft\\Instances\\1.16.5',
      height: '1440',
      launchTarget: 'fmlclient',
      launcher: 'CurseForge',
      mcVersion: '1.16.5',
      mcpVersion: '20210115.111550',
      userType: 'msa',
      username: 'Tirsty_',
      uuid: 'ca3b0aa1677e495fa6db96b61b1217b2',
      version: 'forge-36.2.42',
      versionType: 'release',
      width: '2560',
    });
  });

  it('returns Forge 1.18.2 modloader attributes', async () => {
    const fileLines = await getTestFileLines('/standard/forge-1.18.2.log');
    const attributes = parseModloader(fileLines);

    expect(attributes).toEqual({
      accessToken: '????????',
      assetIndex: '1.18',
      assetsDir: 'C:\\Users\\tlannigan\\curseforge\\minecraft\\Install\\assets',
      clientId: 'NmZmZDgxMGEtMjYyOS00N2RhLTllMTctZmY4YzM2ZWRiZWU1',
      forgeGroup: 'net.minecraftforge',
      forgeVersion: '40.2.18',
      gameDir: 'C:\\Users\\tlannigan\\curseforge\\minecraft\\Instances\\1.18.2',
      height: '1440',
      launchTarget: 'forgeclient',
      launcher: 'CurseForge',
      mcVersion: '1.18.2',
      mcpVersion: '20220404.173914',
      userType: 'msa',
      username: 'Tirsty_',
      uuid: 'ca3b0aa1677e495fa6db96b61b1217b2',
      version: 'forge-40.2.18',
      versionType: 'release',
      width: '2560',
      xuid: '2535418772033092',
    });
  });

  it('returns Forge 1.19.2 modloader attributes', async () => {
    const fileLines = await getTestFileLines('/standard/forge-1.19.2.log');
    const attributes = parseModloader(fileLines);

    expect(attributes).toEqual({
      accessToken: '????????',
      assetIndex: '1.19',
      assetsDir: 'C:\\Users\\tlannigan\\curseforge\\minecraft\\Install\\assets',
      clientId: 'NmZmZDgxMGEtMjYyOS00N2RhLTllMTctZmY4YzM2ZWRiZWU1',
      forgeGroup: 'net.minecraftforge',
      forgeVersion: '43.3.9',
      gameDir: 'C:\\Users\\tlannigan\\curseforge\\minecraft\\Instances\\1.19.2',
      height: '1440',
      launchTarget: 'forgeclient',
      launcher: 'CurseForge',
      mcVersion: '1.19.2',
      mcpVersion: '20220805.130853',
      userType: 'msa',
      username: 'Tirsty_',
      uuid: 'ca3b0aa1677e495fa6db96b61b1217b2',
      version: 'forge-43.3.9',
      versionType: 'release',
      width: '2560',
      xuid: '2535418772033092',
    });
  });

  it('returns Forge 1.20.1 modloader attributes', async () => {
    const fileLines = await getTestFileLines('/standard/forge-1.20.1.log');
    const attributes = parseModloader(fileLines);

    expect(attributes).toEqual({
      accessToken: '????????',
      assetIndex: '5',
      assetsDir: 'C:\\Users\\tlannigan\\curseforge\\minecraft\\Install\\assets',
      clientId: 'NmZmZDgxMGEtMjYyOS00N2RhLTllMTctZmY4YzM2ZWRiZWU1',
      forgeGroup: 'net.minecraftforge',
      forgeVersion: '47.2.21',
      gameDir: 'C:\\Users\\tlannigan\\curseforge\\minecraft\\Instances\\1.20.1',
      height: '1440',
      launchTarget: 'forgeclient',
      launcher: 'CurseForge',
      mcVersion: '1.20.1',
      mcpVersion: '20230612.114412',
      quickPlayPath:
        'C:\\Users\\tlannigan\\curseforge\\minecraft\\Install\\quickPlay\\java\\1711756231867.json',
      userType: 'msa',
      username: 'Tirsty_',
      uuid: 'ca3b0aa1677e495fa6db96b61b1217b2',
      version: 'forge-47.2.21',
      versionType: 'release',
      width: '2560',
      xuid: '2535418772033092',
    });
  });

  it('returns Fabric 1.18.2 modloader attributes', async () => {
    const fileLines = await getTestFileLines('/standard/fabric-1.18.2.log');
    const attributes = parseModloader(fileLines);

    expect(attributes).toEqual({
      fabricVersion: '0.16.9',
      mcVersion: '1.18.2',
    });
  });

  it('returns Fabric 1.19.2 modloader attributes', async () => {
    const fileLines = await getTestFileLines('/standard/fabric-1.19.2.log');
    const attributes = parseModloader(fileLines);

    expect(attributes).toEqual({
      fabricVersion: '0.16.9',
      mcVersion: '1.19.2',
    });
  });

  it('returns Fabric 1.20.1 modloader attributes', async () => {
    const fileLines = await getTestFileLines('/standard/fabric-1.20.1.log');
    const attributes = parseModloader(fileLines);

    expect(attributes).toEqual({
      fabricVersion: '0.16.9',
      mcVersion: '1.20.1',
    });
  });

  it('returns Fabric 1.21.1 modloader attributes', async () => {
    const fileLines = await getTestFileLines('/standard/fabric-1.21.1.log');
    const attributes = parseModloader(fileLines);

    expect(attributes).toEqual({
      fabricVersion: '0.16.9',
      mcVersion: '1.21.1',
    });
  });
});
