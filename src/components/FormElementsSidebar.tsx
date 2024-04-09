import React from "react";
import { FormElements } from "./FormElements";
import SidebarButtonElement from "./SidebarButtonElement";

const FormElementsSidebar = () => {
  return (
    <div>
      Elements
      <SidebarButtonElement formElement={FormElements.TEXT_FIELD} />
    </div>
  );
};

export default FormElementsSidebar;
