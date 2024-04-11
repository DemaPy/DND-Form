import TEXT_FIELD_FORM_ELEMENT from "./fields/TEXT_FIELD";

export type SubmitFunction = (key: string, value: string) => void;

export type ElementsType =
  | "TextField"
  | "NumberField"
  | "TextAreaField"
  | "DateField"
  | "SelectField"
  | "CheckboxField";

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
  formComponent: React.FC<{
    submitValue?: SubmitFunction;
    elementInstance: FormElementInstance;
    isInvalid?: boolean;
    defaultValue?: string;
  }>;
  properties: React.FC<{
    elementInstance: FormElementInstance;
  }>;

  validate: (FormElement: FormElementInstance, currVal: string) => boolean;
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
  TextField: TEXT_FIELD_FORM_ELEMENT,
  CheckboxField: TEXT_FIELD_FORM_ELEMENT,
  DateField: TEXT_FIELD_FORM_ELEMENT,
  NumberField: TEXT_FIELD_FORM_ELEMENT,
  SelectField: TEXT_FIELD_FORM_ELEMENT,
  TextAreaField: TEXT_FIELD_FORM_ELEMENT,
};
