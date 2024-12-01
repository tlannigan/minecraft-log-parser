import parseSystem from '@/parsers/standardLog/parseSystem';
import { getTestFileLines } from '../../files/fileHelpers';

describe('Standard log system parser', () => {
  it('returns Forge 1.7.10 system details', async () => {
    const fileLines = await getTestFileLines('/standard/forge-1.7.10.log');
    const system = parseSystem(fileLines);

    expect(system).toEqual({
      allocatedMemory: '-Xmx8192m, -Xms256m',
      java: '1.8.0.51',
      os: 'Windows 10:amd64:10.0',
    });
  });

  it('returns Forge 1.12.2 system details', async () => {
    const fileLines = await getTestFileLines('/standard/forge-1.12.2.log');
    const system = parseSystem(fileLines);

    expect(system).toEqual({
      allocatedMemory: '-Xmx8192m, -Xms256m',
      java: '1.8.0.51',
      os: 'Windows 10:amd64:10.0',
    });
  });

  it('returns Forge 1.16.5 system details', async () => {
    const fileLines = await getTestFileLines('/standard/forge-1.16.5.log');
    const system = parseSystem(fileLines);

    expect(system).toEqual({
      java: '1.8.0.51',
    });
  });

  it('returns Forge 1.18.2 system details', async () => {
    const fileLines = await getTestFileLines('/standard/forge-1.18.2.log');
    const system = parseSystem(fileLines);

    expect(system).toEqual({
      java: '17.0.1',
    });
  });

  it('returns Forge 1.19.2 system details', async () => {
    const fileLines = await getTestFileLines('/standard/forge-1.19.2.log');
    const system = parseSystem(fileLines);

    expect(system).toEqual({
      java: '17.0.8',
      os: 'Windows 10 arch amd64 version 10.0',
    });
  });

  it('returns Forge 1.20.1 system details', async () => {
    const fileLines = await getTestFileLines('/standard/forge-1.20.1.log');
    const system = parseSystem(fileLines);

    expect(system).toEqual({
      java: '17.0.8',
      os: 'Windows 10 arch amd64 version 10.0',
    });
  });

  it('returns Fabric system details', async () => {
    const fileLines = await getTestFileLines('/standard/fabric-1.16.5.log');
    const system = parseSystem(fileLines);

    expect(system).toEqual({
      java: '8',
    });
  });
});
