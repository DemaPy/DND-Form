"use client";

import React, { useContext } from "react";
import { DesignerContext } from "../context/DesignerContext";

const useDesigner = () => {
  const context = useContext(DesignerContext);

  if (!context) {
    throw new Error(
      "Hook useDesigner must be used inside DesignerContextProvider"
    );
  }
  return context;
};

export default useDesigner;
