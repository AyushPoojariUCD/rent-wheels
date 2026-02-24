"use client";

import { ShowMoreProps } from "@/types";
import CustomButton from "./CustomButton";

const ShowMore = ({ pageNumber, isNext, setLimit }: ShowMoreProps) => {

  const handleNavigation = () => {
    setLimit((pageNumber + 1) * 10);
  };

  if (!isNext) return null;

  return (
    <div className="w-full flex justify-center mt-10">

      <CustomButton
        title="Show More"
        btnType="button"
        containerStyles="
          bg-primary-blue
          text-white
          px-6 py-3
          rounded-full
          hover:bg-primary-blue/90
          transition-all duration-300
        "
        handleClick={handleNavigation}
      />

    </div>
  );
};

export default ShowMore;