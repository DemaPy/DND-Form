import React, { useTransition } from "react";
import { Button } from "./ui/button";
import { HiSaveAs } from "react-icons/hi";
import useDesigner from "./hooks/useDesigner";
import { updateFormContent } from "../../actions/form";
import { toast } from "sonner";
import { Loader } from "lucide-react";

const SaveFormBtn = ({ id }: { id: number }) => {
  const [loading, startTransition] = useTransition();
  const { elements } = useDesigner();

  const updateFormContext = async () => {
    try {
      const JSONElements = JSON.stringify(elements);
      await updateFormContent(id, JSONElements);
      toast.success("Form has been saved");
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
    }
  };
  return (
    <Button
      onClick={() => startTransition(updateFormContext)}
      className="gap-2"
      variant={"outline"}
      disabled={loading}
    >
      <HiSaveAs className="h-6 w-6" /> Save
      {loading && <Loader className="w-4 h-4 animate-spin" />}
    </Button>
  );
};

export default SaveFormBtn;
