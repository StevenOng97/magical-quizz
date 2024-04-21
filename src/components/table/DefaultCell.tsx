import { CustomColumnMeta } from "@/lib/types/tableCellMeta";
import { cn, formatDate } from "@/lib/utils";
import { CellContext } from "@tanstack/react-table";

const DefaultCell = <T,>({ getValue, column, row }: CellContext<T, unknown>) => {
  const initialValue = getValue();
  const columnMeta: CustomColumnMeta<T> | undefined = column.columnDef.meta;

  const convertValue = () => {
    if (columnMeta?.value) return columnMeta?.value;

    if (initialValue === undefined || initialValue === null || initialValue === "") return "N/A";

    // If value is Array
    if (columnMeta?.isArray) return (initialValue as Array<string>).join(", ");

    // Date format
    if (columnMeta?.formatDate) return formatDate(String(initialValue));

    return String(initialValue);
  };

  const handleOnClick = () => {
    if (!columnMeta) return;
    const { customFunction } = columnMeta;
    if (customFunction) {
      customFunction(row.original);
    }
  };

  const displayContent = () => {
    return convertValue();
  };

  return (
    <button
      className={cn("whitespace-pre-line", columnMeta?.className)}
      onClick={handleOnClick}
    >
      {displayContent()}
    </button>
  );
};

export default DefaultCell;
