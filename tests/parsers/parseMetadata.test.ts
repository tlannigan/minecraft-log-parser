import parseMetadata from '@/parsers/parseMetadata';
import { getTestFile } from '../files/fileHelpers';
import convertFileToLines from '@/lib/convertFileToLines';
import { FileType } from '@/types/enums';

describe('Metadata parser', () => {
  it('returns standard log file metadata', async () => {
    const file = await getTestFile('/standard/forge-1.20.1.log');
    const fileLines = await convertFileToLines(file);
    const metadata = parseMetadata(fileLines, file);

    expect(metadata.fileName).toEqual('forge-1.20.1.log');
    expect(metadata.fileSize).toEqual(8799);
    expect(metadata.lastModified).toEqual(0);
    expect(metadata.lineCount).toEqual(61);
    expect(metadata.fileType).toEqual(FileType.STANDARD_LOG);
  });

  it('returns extended MultiMC log file metadata', async () => {
    const file = await getTestFile('/extendedMultimc/prism_extended.txt');
    const fileLines = await convertFileToLines(file);
    const metadata = parseMetadata(fileLines, file);

    expect(metadata.fileName).toEqual('prism_extended.txt');
    expect(metadata.fileSize).toEqual(20799);
    expect(metadata.lastModified).toEqual(0);
    expect(metadata.lineCount).toEqual(206);
    expect(metadata.fileType).toEqual(FileType.EXTENDED_MULTIMC_LOG);
  });

  it('returns crash report file metadata', async () => {
    const file = await getTestFile('/crashReports/forge-1.12.2.txt');
    const fileLines = await convertFileToLines(file);
    const metadata = parseMetadata(fileLines, file);

    expect(metadata.fileName).toEqual('forge-1.12.2.txt');
    expect(metadata.fileSize).toEqual(473527);
    expect(metadata.lastModified).toEqual(0);
    expect(metadata.lineCount).toEqual(6448);
    expect(metadata.fileType).toEqual(FileType.CRASH_REPORT);
  });

  it('returns launcher log file metadata', async () => {
    const file = await getTestFile('/launcherLogs/launcher_log.txt');
    const fileLines = await convertFileToLines(file);
    const metadata = parseMetadata(fileLines, file);

    expect(metadata.fileName).toEqual('launcher_log.txt');
    expect(metadata.fileSize).toEqual(5730563);
    expect(metadata.lastModified).toEqual(0);
    expect(metadata.lineCount).toEqual(45431);
    expect(metadata.fileType).toEqual(FileType.LAUNCHER_LOG);
  });

  it('returns hs_err_pid file metadata', async () => {
    const file = await getTestFile('/hotspotCrashDumps/hs_err_pid.log');
    const fileLines = await convertFileToLines(file);
    const metadata = parseMetadata(fileLines, file);

    expect(metadata.fileName).toEqual('hs_err_pid.log');
    expect(metadata.fileSize).toEqual(71183);
    expect(metadata.lastModified).toEqual(0);
    expect(metadata.lineCount).toEqual(843);
    expect(metadata.fileType).toEqual(FileType.HS_ERR_PID);
  });

  it('returns unknown file metadata', async () => {
    const file = await getTestFile('unknown.log');
    const fileLines = await convertFileToLines(file);
    const metadata = parseMetadata(fileLines, file);

    expect(metadata.fileName).toEqual('unknown.log');
    expect(metadata.fileSize).toEqual(34);
    expect(metadata.lastModified).toEqual(0);
    expect(metadata.lineCount).toEqual(1);
    expect(metadata.fileType).toEqual(FileType.UNKNOWN);
  });
});
