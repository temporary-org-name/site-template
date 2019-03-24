import path from 'path';

export const getAbsolutePath = (filePath: string): string => path.resolve(process.cwd(), filePath);
