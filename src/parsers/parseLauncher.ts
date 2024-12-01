import { hasPath } from '@/lib/strings';
import { Launcher } from '@/types/enums';

export default function parseLauncher(assetsDirectory: string): Launcher {
  const filePathContains = (targetDir: string) =>
    hasPath(assetsDirectory, targetDir);

  if (filePathContains('appdata/roaming/.minecraft/assets')) {
    return Launcher.VANILLA;
  } else if (filePathContains('curseforge/minecraft/install/assets')) {
    return Launcher.CURSEFORGE;
  } else if (filePathContains('prismlauncher/assets')) {
    return Launcher.PRISM;
  } else if (filePathContains('polymc/assets')) {
    return Launcher.POLYMC;
  } else if (filePathContains('multimc/assets')) {
    return Launcher.MULTIMC;
  } else if (filePathContains('com.modrinth.theseus/meta/assets')) {
    return Launcher.MODRINTH;
  } else if (filePathContains('.ftba/bin/assets')) {
    return Launcher.FTB_APP;
  } else if (filePathContains('atlauncher/assets')) {
    return Launcher.ATLAUNCHER;
  } else if (
    filePathContains('datastore/assets') ||
    filePathContains('data/assets')
  ) {
    return Launcher.GDLAUNCHER;
  } else {
    return Launcher.UNKNOWN;
  }
}
