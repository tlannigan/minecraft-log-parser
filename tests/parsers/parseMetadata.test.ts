import parseMetadata from '@/parsers/parseMetadata';
import { getTestFile } from '../files/fileHelpers';
import convertFileToLines from '@/lib/convertFileToLines';
import { FileType } from '@/types/enums';

describe('Metadata parser', () => {
  it('returns standard log file metadata', async () => {
    const file = await getTestFile('/standard/forge-1.20.1.log');
    const fileLines = await convertFileToLines(file);
    const metadata = parseMetadata(fileLines, file);

    expect(metadata).toEqual(
      expect.objectContaining({
        fileName: 'forge-1.20.1.log',
        fizeSize: 8799,
        lastModified: 0,
        lineCount: 61,
        fileType: FileType.STANDARD_LOG,
      })
    );
  });

  it('returns extended MultiMC log file metadata', async () => {
    const file = await getTestFile('/extendedMultimc/prism_extended.txt');
    const fileLines = await convertFileToLines(file);
    const metadata = parseMetadata(fileLines, file);

    expect(metadata).toEqual(
      expect.objectContaining({
        fileName: 'prism_extended.txt',
        fizeSize: 20799,
        lastModified: 0,
        lineCount: 206,
        fileType: FileType.EXTENDED_MULTIMC_LOG,
      })
    );
  });

  it('returns crash report file metadata', async () => {
    const file = await getTestFile('/crashReports/forge-1.12.2.txt');
    const fileLines = await convertFileToLines(file);
    const metadata = parseMetadata(fileLines, file);

    expect(metadata).toEqual(
      expect.objectContaining({
        fileName: 'forge-1.12.2.txt',
        fizeSize: 473527,
        lastModified: 0,
        lineCount: 6448,
        fileType: FileType.CRASH_REPORT,
      })
    );
  });

  it('returns launcher log file metadata', async () => {
    const file = await getTestFile('/launcherLogs/launcher_log.txt');
    const fileLines = await convertFileToLines(file);
    const metadata = parseMetadata(fileLines, file);

    expect(metadata).toEqual(
      expect.objectContaining({
        fileName: 'launcher_log.txt',
        fizeSize: 5730563,
        lastModified: 0,
        lineCount: 45431,
        fileType: FileType.LAUNCHER_LOG,
      })
    );
  });

  it('returns hs_err_pid file metadata', async () => {
    const file = await getTestFile('/hotspotCrashDumps/hs_err_pid.log');
    const fileLines = await convertFileToLines(file);
    const metadata = parseMetadata(fileLines, file);

    expect(metadata).toEqual(
      expect.objectContaining({
        fileName: 'hs_err_pid.log',
        fizeSize: 71183,
        lastModified: 0,
        lineCount: 843,
        fileType: FileType.HS_ERR_PID,
      })
    );
  });

  it('returns unknown file metadata', async () => {
    const file = await getTestFile('unknown.log');
    const fileLines = await convertFileToLines(file);
    const metadata = parseMetadata(fileLines, file);

    expect(metadata).toEqual(
      expect.objectContaining({
        fileName: 'unknown.log',
        fizeSize: 34,
        lastModified: 0,
        lineCount: 1,
        fileType: FileType.UNKNOWN,
      })
    );
  });
});
