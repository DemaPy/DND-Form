import React from "react";
import FormBuilderTitle from "./FormBuilderTitle";
import PreviewDialogBtn from "../PreviewDialogBtn";
import SaveFormBtn from "../SaveFormBtn";
import PublishFormBtn from "../PublishFormBtn";
import { Form } from "@prisma/client";

interface FormBuilderNavBarProps {
  form: Form;
}

const FormBuilderNavBar = ({ form }: FormBuilderNavBarProps) => {
  return (
    <nav className="flex justify-between border-b-2 p-4 gap-3 items-center">
      <FormBuilderTitle title={form.name} />
      <div className="flex items-center gap-2">
        <PreviewDialogBtn />
        {!form.published && (
          <>
            <SaveFormBtn id={form.id} />
            <PublishFormBtn id={form.id} />
          </>
        )}
      </div>
    </nav>
  );
};

export default FormBuilderNavBar;
