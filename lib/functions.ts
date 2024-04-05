import shapeOne from "@/assets/images/shape_one.svg";
import shapeTwo from "@/assets/images/shape_two.svg";
import shapeThree from "@/assets/images/shape_three.svg";
import { toast } from "@/components/ui/use-toast";
import { getTableColumns } from "drizzle-orm";
import { userTable } from "./db/schema";
import { z } from "zod";
import { Data } from "@/types/general";
import { ToastActionElement } from "@/components/ui/toast";

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
  successAction,
}: {
  res: {
    error?: string;
    success?: string;
  };
  successAction?: ToastActionElement;
}) => {
  if (!!res.error) {
    toast({
      variant: "destructive",
      description: res.error,
      duration: 2000,
    });
  } else if (!!res.success) {
    toast({
      variant: "success",
      duration: 2000,

      description: res.success ?? "Success",
      action: successAction,
    });
  }
};

export const getUserTableAllowedColumn = () => {
  // dont return password when querying usertable
  const { hashedPassword, ...rest } = getTableColumns(userTable);
  return rest;
};

export const createZodValidationsErrorMessage = (
  validatedFields: z.SafeParseError<Data>
): string => {
  let errorMessage = "";

  validatedFields.error.issues.forEach((issue) => {
    errorMessage = `${errorMessage}${issue.path[0]} : ${issue.message}. `;
  });

  return errorMessage;
};
