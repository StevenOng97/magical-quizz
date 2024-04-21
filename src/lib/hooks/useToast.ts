import { IToastVariants } from "@/components/ui/toast";
import { useToast as shadcnUseToast } from "@/components/ui/use-toast";

type IToastContent = {
  title?: string;
  description?: string;
  variant?: IToastVariants;
};
const useToast = () => {
  const { toast } = shadcnUseToast();

  const showToast = ({
    title = "Error",
    description = "Something went wrong. Please try again",
    variant = "destructive",
  }: IToastContent) => {
    toast({
      title,
      description,
      variant,
    });
  };
  return { showToast };
};

export default useToast;
