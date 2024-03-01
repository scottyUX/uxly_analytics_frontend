import React from "react";
import "./home.css";

const LoadScreen: React.ForwardRefRenderFunction<HTMLDivElement> = (_, ref) => {
  return (
    <div ref={ref} className="circle-loader-container">
      <div className="circle-loader"></div>
    </div>
  );
};

export default React.forwardRef(LoadScreen);
