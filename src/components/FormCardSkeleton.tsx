import React from "react";
import { Skeleton } from "./ui/skeleton";
import { getForms } from "../../actions/form";
import FormCard from "./FormCard";

export async function FormCards() {
  const forms = await getForms();

  return (
    <>
      {forms?.map((form) => (
        <FormCard key={form.id} form={form} />
      ))}
    </>
  );
}

const FormCardSkeleton = () => {
  return <Skeleton className="border-2 border-primary/20 h-[190px] w-full" />;
};

export default FormCardSkeleton;
