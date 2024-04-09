import TEXT_FIELD_FORM_ELEMENT from "./fields/TEXT_FIELD";

export type ElementsType = "TEXT_FIELD";

export type FormElement = {
  type: ElementsType;

  construct: (id: string) => FormElementInstance;

  designerButtonElement: {
    icon: React.ReactElement;
    label: string;
  };

  designerComponent: React.FC<{
    elementInstance: FormElementInstance;
  }>;
  formComponent: React.FC;
  properties: React.FC<{
    elementInstance: FormElementInstance;
  }>
};

export type FormElementInstance = {
  id: string;
  type: ElementsType;
  extraAttributes?: Record<string, any>;
};

type FormElementsType = {
  [key in ElementsType]: FormElement;
};
export const FormElements: FormElementsType = {
  TEXT_FIELD: TEXT_FIELD_FORM_ELEMENT,
};
