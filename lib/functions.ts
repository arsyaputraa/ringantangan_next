import shapeOne from "@/assets/images/shape_one.svg";
import shapeTwo from "@/assets/images/shape_two.svg";
import shapeThree from "@/assets/images/shape_three.svg";

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
