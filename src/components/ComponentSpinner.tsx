import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
type ISpinnerProps = {
  size?: number;
  className?: string;
};

const Spinner = ({ size = 20, className }: ISpinnerProps) => {
  return (
    <Loader2
      width={size}
      className={cn("w-full h-full m-auto animate-spin", className)}
    />
  );
};

type IProps = {
  className?: string;
  size?: number;
};
const ComponentSpinner = ({ className, size = 50 }: IProps) => {
  return (
    <div className={cn("w-1/2 h-1/2 m-auto", className)}>
      <Spinner size={size} />
    </div>
  );
};

export default ComponentSpinner;
