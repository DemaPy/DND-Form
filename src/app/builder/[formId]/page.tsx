import React from "react";
import { getFormById } from "../../../../actions/form";
import FormBuilder from "@/components/FormBuilder";

const BuilderPage = async ({
  params: { formId },
}: {
  params: { formId: string };
}) => {
  const form = await getFormById(formId);
  if (!form) {
    throw new Error("Form not found");
  }
  return <FormBuilder form={form} />;
};

export default BuilderPage;
