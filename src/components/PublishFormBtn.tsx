import React from "react";
import { Button } from "./ui/button";
import { MdOutlinePublish } from "react-icons/md";

type Props = {};

const PublishFormBtn = (props: Props) => {
  return (
    <Button className="gap-2 text-white bg-gradient-to-tr from-indigo-400 to-cyan-300" variant={"outline"}>
      <MdOutlinePublish className="h-6 w-6" /> Publish
    </Button>
  );
};

export default PublishFormBtn;
