import { CHECKBOX_FIELD_FORM_ELEMENT } from "./fields/CHECKBOX_FIELD";
import { DATE_FIELD_FORM_ELEMENT } from "./fields/DATE_FIELD";
import { NUMBER_FIELD_FORM_ELEMENT } from "./fields/NUMBER_FIELD";
import { PARAGRAPH_FIELD_FORM_ELEMENT } from "./fields/PARAGRAPH_FIELD";
import { SELECT_FIELD_FORM_ELEMENT } from "./fields/SELECT_FIELD";
import { SEPARATOR_FIELD_FORM_ELEMENT } from "./fields/SEPARATOR_FIELD";
import { SPACER_FIELD_FORM_ELEMENT } from "./fields/SPACER_FIELD";
import { SUBTITLE_FIELD_FORM_ELEMENT } from "./fields/SUBTITLE_FIELD";
import { TEXTAREA_FIELD_FORM_ELEMENT } from "./fields/TEXTAREA_FIELD";
import { TEXT_FIELD_FORM_ELEMENT } from "./fields/TEXT_FIELD";
import { TITLE_FIELD_FORM_ELEMENT } from "./fields/TITLE_FIELD";

export type SubmitFunction = (key: string, value: string) => void;

export type ElementsType =
  | "TextField"
  | "NumberField"
  | "TextAreaField"
  | "DateField"
  | "SelectField"
  | "CheckboxField"
  | "TitleField"
  | "SubTitleField"
  | "ParagraphField"
  | "SeparatorField"
  | "SpacerField";

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
  SubTitleField: SUBTITLE_FIELD_FORM_ELEMENT,

  ParagraphField: PARAGRAPH_FIELD_FORM_ELEMENT,
  SeparatorField: SEPARATOR_FIELD_FORM_ELEMENT,

  SpacerField: SPACER_FIELD_FORM_ELEMENT,
  TitleField: TITLE_FIELD_FORM_ELEMENT,

  CheckboxField: CHECKBOX_FIELD_FORM_ELEMENT,
  DateField: DATE_FIELD_FORM_ELEMENT,

  NumberField: NUMBER_FIELD_FORM_ELEMENT,
  SelectField: SELECT_FIELD_FORM_ELEMENT,

  TextAreaField: TEXTAREA_FIELD_FORM_ELEMENT,
};
