import shapeOne from "@/assets/images/shape_one.svg";
import shapeTwo from "@/assets/images/shape_two.svg";
import shapeThree from "@/assets/images/shape_three.svg";
import { toast } from "@/components/ui/use-toast";

const imageArray = [shapeOne, shapeTwo, shapeThree];

export const getImage = (data: string) => {
  let result = 0;
  let start = 0;

  if (data.length > 4) {
    start = data.length - 4;
  }

  for (let i = start; i < data.length; i++) {
    result += data.charCodeAt(i);
  }

  return imageArray[result % 3];
};

export const responseToast = ({
  res,
}: {
  res: {
    error?: string;
    success?: string;
  };
}) => {
  if (!res) return null;
  if (!!res.error) {
    return toast({
      variant: "destructive",
      description: res.error,
      duration: 2000,
    });
  } else if (!!res.success) {
    return toast({
      variant: "success",
      duration: 2000,

      description: res.success ?? "Success",
    });
  }
};
