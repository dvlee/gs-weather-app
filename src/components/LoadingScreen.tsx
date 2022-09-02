import React, { ComponentType } from "react";
import { ReactComponent as LoadingSpinner } from "../assets/LoadingSpinner.svg";

const LoadingScreen: ComponentType = () => {
  return (
    <div className="loadingScreen">
      <LoadingSpinner />
    </div>
  );
};

export default LoadingScreen;
