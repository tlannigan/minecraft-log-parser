import ParserBuilder from '@/index';
import convertFileToLines from '@/lib/convertFileToLines';
import { FileInfo } from '@/types/fileInfo';
import { Issue } from '@/types/issue';
import fs from 'node:fs/promises';
import path from 'path';

export async function getTestFile(filePath: string): Promise<File> {
  const location = path.join(__dirname, filePath);
  const directories = filePath.split('/');
  const fileName = directories[directories.length - 1];
  try {
    const text = await fs.readFile(location, 'utf8');
    return new File([new Blob([text])], fileName, {
      type: 'text/plain',
      lastModified: 0,
    });
  } catch (error) {
    console.error(error);
    throw new Error('Could not read file: ' + location);
  }
}

export async function getTestFileLines(fileName: string): Promise<string[]> {
  const file = await getTestFile(fileName);
  return convertFileToLines(file);
}

export async function getTestFileInfo(fileName: string): Promise<FileInfo> {
  const fileLines = await getTestFileLines(fileName);
  const fileInfo = await ParserBuilder.setup(fileLines);
  return fileInfo.withAll().parse();
}
