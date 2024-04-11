import React from "react";
import { Button } from "./ui/button";
import { MdPreview } from "react-icons/md";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import useDesigner from "./hooks/useDesigner";
import { FormElements } from "./FormElements";

const PreviewDialogBtn = () => {
  const { elements } = useDesigner();
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="gap-2" variant={"outline"}>
          <MdPreview className="h-6 w-6" /> Preview
        </Button>
      </DialogTrigger>
      <DialogContent className="w-screen h-screen max-h-screen max-w-full flex flex-col flex-grow p-0 gap-0">
        <div className="px-4 py-2 border-b">
          <p className="text-lg font-bold text-muted-foreground">
            Form preview
          </p>
          <p className="text-sm text-muted-foreground">
            This is how form looks like for your users
          </p>
        </div>
        <div className="bg-accent flex flex-col flex-grow items-center overflow-y-auto justify-center bg-[url(/bg.svg)]">
          <div className="max-w-[620px] flex flex-col gap-4 flex-grow bg-background h-full w-full rounded-2xl p-4 overflow-y-auto">
            {elements.map((elem) => {
              const FormComponent = FormElements[elem.type].formComponent;
              return <FormComponent key={elem.id} elementInstance={elem} />;
            })}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PreviewDialogBtn;
