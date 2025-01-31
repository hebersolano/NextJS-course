import { readFile, writeFile } from 'node:fs/promises';

export async function readJsonFile<T>(filePath: string) {
  try {
    const data = await readFile(filePath, 'utf8');
    const jsonData = JSON.parse(data) as T;
    return jsonData;
  } catch (err) {
    console.error('Error reading or parsing the file:', err);
  }
}

export async function updateFile(filePath: string, data: string) {
  try {
    await writeFile(filePath, data);
  } catch (error) {
    console.error(error);
    throw new Error('Error writing file: ' + filePath);
  }
}
