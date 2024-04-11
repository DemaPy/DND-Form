import React from "react";
import { GetFormContentByUrl } from "../../../../actions/form";
import { FormElementInstance } from "@/components/FormElements";
import FormSubmitComponent from "@/components/FormSubmitComponent";

const SubmitPage = async ({ params }: { params: { url: string } }) => {
  const form = await GetFormContentByUrl(params.url);

  if (!form) {
    throw new Error("form not found");
  }

  const formContent = JSON.parse(form.content) as FormElementInstance[];

  return <FormSubmitComponent formUrl={params.url} content={formContent} />;
};

export default SubmitPage;
