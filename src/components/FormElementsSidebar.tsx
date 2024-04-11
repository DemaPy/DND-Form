import React from "react";
import { FormElements } from "./FormElements";
import SidebarButtonElement from "./SidebarButtonElement";

const FormElementsSidebar = () => {
  return (
    <div>
      Elements
      <SidebarButtonElement formElement={FormElements.TextField} />
    </div>
  );
};

export default FormElementsSidebar;
