
interface file {
  name: string;
  size: number;
  type: string;
  lastModified: number;
}

export interface IDocx {
  title: string;
  file: File;
  _file: file;
  tags: string[],
  status: string;
  timestamp: string;
  folder: string;
}
