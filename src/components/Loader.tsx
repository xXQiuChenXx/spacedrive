import { LoaderIcon } from "lucide-react";
import React from "react";

export const Loader = () => {
  return (
    <div className="flex items-center w-fit mx-auto mt-10">
      <LoaderIcon className="size-4 animate-spin mr-5" />
      <p>Loading...</p>
    </div>
  );
};
