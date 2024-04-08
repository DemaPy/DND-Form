import React from "react";
import { Button } from "./ui/button";
import { HiSaveAs } from "react-icons/hi";

type Props = {};

const SaveFormBtn = (props: Props) => {
  return (
    <Button className="gap-2" variant={"outline"}>
      <HiSaveAs className="h-6 w-6" /> Save
    </Button>
  );
};

export default SaveFormBtn;
