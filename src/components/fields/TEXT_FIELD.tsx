import React from "react";
import {
  ElementsType,
  FormElement,
  FormElementInstance,
} from "../FormElements";
import { MdTextFields } from "react-icons/md";
import { Label } from "../ui/label";
import { Input } from "../ui/input";

const type: ElementsType = "TEXT_FIELD";

const TEXT_FIELD_FORM_ELEMENT: FormElement = {
  type: type,
  construct: (id) => {
    return {
      id: id,
      type: "TEXT_FIELD",
      extraAttributes: {
        label: "Text field",
        helperText: "Helper text",
        required: false,
        placeholder: "Value here...",
      },
    };
  },
  designerButtonElement: {
    icon: <MdTextFields className="h-8 w-8 text-primary cursor-grab" />,
    label: "Text field",
  },
  designerComponent: DesignerComponent,
  formComponent: () => <div className="text-white">Form component</div>,
  properties: () => <div className="text-white">Properties component</div>,
};

function DesignerComponent({
  elementInstance,
}: {
  elementInstance: FormElementInstance;
}) {
  return (
    <div className="flex flex-col gap-2 w-full">
      <Label>
        {elementInstance?.extraAttributes?.label || "Default"}
        {elementInstance?.extraAttributes?.required && "*"}
      </Label>
      <Input
        readOnly
        disabled
        placeholder={elementInstance?.extraAttributes?.placeholder || ""}
      />
      {elementInstance?.extraAttributes?.placeholder.helperText && (
        <p className="text-muted-foreground text-[0.8rem]">
          {elementInstance?.extraAttributes?.placeholder.helperText}
        </p>
      )}
    </div>
  );
}

export default TEXT_FIELD_FORM_ELEMENT;
