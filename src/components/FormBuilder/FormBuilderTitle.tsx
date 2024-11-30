import React from "react";

interface FormBuilderTitleProps {
  title: string;
}

const FormBuilderTitle = ({ title }: FormBuilderTitleProps) => {
  return (
    <h2 className="truncate font-medium">
      <span className="text-muted-foreground mr-2">Form:</span>
      {title}
    </h2>
  );
};

export default FormBuilderTitle;
