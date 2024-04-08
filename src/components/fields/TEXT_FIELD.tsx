import React from "react";
import { ElementsType, FormElement } from "../FormElements";
import { MdTextFields } from "react-icons/md";

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
  designerComponent: () => <div>Designer component</div>,
  formComponent: () => <div>Form component</div>,
  properties: () => <div>Properties component</div>,
};

export default TEXT_FIELD_FORM_ELEMENT;
