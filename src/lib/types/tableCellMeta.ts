export interface CustomColumnMeta<T> {
  value?: string;
  isArray?: boolean;
  className?: string;
  formatDate?: boolean;
  customFunction?: (options: T, newData?: string | number) => void;
  tableData?: T[];
}
