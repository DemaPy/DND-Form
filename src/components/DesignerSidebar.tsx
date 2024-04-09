import React from "react";
import { FormElements } from "./FormElements";
import SidebarButtonElement from "./SidebarButtonElement";
import useDesigner from "./hooks/useDesigner";
import FormElementsSidebar from "./FormElementsSidebar";
import ProperitesFormSidebar from "./ProperitesFormSidebar";

const DesignerSidebar = () => {
  const { selectedElement, setSelectedElement } = useDesigner();

  return (
    <aside className="w-[400px] max-w[400px] flex flex-col flex-grow gap-2 border-l-2 border-muted p-4 bg-background overflow-y-auto h-full">
      {!selectedElement && <FormElementsSidebar />}
      {selectedElement && <ProperitesFormSidebar />}
    </aside>
  );
};

export default DesignerSidebar;
