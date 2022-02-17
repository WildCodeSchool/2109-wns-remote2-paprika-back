import { v4 as uuidv4 } from 'uuid';

export default function generateFileName(name: string) {
  const index = name.lastIndexOf('.');
  const extention = name.slice(index);
  const baseName = name.slice(0, index);
  const fileName = `${baseName.replace(
    /[\s\.]/g,
    '-'
  )}-${uuidv4()}${extention}`;
  return fileName.toLowerCase();
}
