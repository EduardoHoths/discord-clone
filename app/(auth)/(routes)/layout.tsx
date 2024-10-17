import React, { PropsWithChildren } from "react";

function Authlayout({ children }: PropsWithChildren) {
  return <div className="h-full flex justify-center items-center">{children}</div>;
}

export default Authlayout;
