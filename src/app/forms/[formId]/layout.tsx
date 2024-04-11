import React, { PropsWithChildren } from "react";

const layout = ({ children }: PropsWithChildren) => {
  return <div className="flex h-full flex-col w-full mx-auto">{children}</div>;
};

export default layout;
