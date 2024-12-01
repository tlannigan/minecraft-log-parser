import parseFileType from '@/parsers/parseFileType';
import { getTestFileLines } from '../files/fileHelpers';
import { FileType } from '@/types/enums';

describe('File type parser', () => {
  it('returns standard log file type', async () => {
    const fileLines = await getTestFileLines('/standard/forge-1.20.1.log');
    const fileType = parseFileType(fileLines);
    expect(fileType).toEqual(FileType.STANDARD_LOG);
  });

  it('returns extended MultiMC log file type', async () => {
    const fileLines = await getTestFileLines(
      '/extendedMultimc/prism_extended.txt'
    );
    const fileType = parseFileType(fileLines);
    expect(fileType).toEqual(FileType.EXTENDED_MULTIMC_LOG);
  });

  it('returns crash report file type', async () => {
    const fileLines = await getTestFileLines('/crashReports/forge-1.12.2.txt');
    const fileType = parseFileType(fileLines);
    expect(fileType).toEqual(FileType.CRASH_REPORT);
  });

  it('returns launcher log file type', async () => {
    const fileLines = await getTestFileLines('/launcherLogs/launcher_log.txt');
    const fileType = parseFileType(fileLines);
    expect(fileType).toEqual(FileType.LAUNCHER_LOG);
  });

  it('returns hs_err_pid file type', async () => {
    const fileLines = await getTestFileLines(
      '/hotspotCrashDumps/hs_err_pid.log'
    );
    const fileType = parseFileType(fileLines);
    expect(fileType).toEqual(FileType.HS_ERR_PID);
  });

  it('returns unknown file type', async () => {
    const fileLines = await getTestFileLines('unknown.log');
    const fileType = parseFileType(fileLines);
    expect(fileType).toEqual(FileType.UNKNOWN);
  });
});
