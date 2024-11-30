import React from "react";
import { getFormById } from "../../../../actions/form";
import FormBuilder from "@/components/FormBuilder/FormBuilder";
import DesignerContextProvider from "@/components/context/DesignerContext";

const BuilderPage = async ({
  params: { formId },
}: {
  params: { formId: string };
}) => {
  const form = await getFormById(formId);
  if (!form) {
    throw new Error("Form not found");
  }
  return (
    <DesignerContextProvider>
      <FormBuilder form={form} />
    </DesignerContextProvider>
  );
};

export default BuilderPage;
