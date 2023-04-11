import React from "react";
import { RotatingLines } from "react-loader-spinner";

interface LoadingIndicatorProps {
  isFullScreen?: boolean;
}

const LoadingIndicator: React.FC<LoadingIndicatorProps> = ({
  isFullScreen = true,
}) => {
  return (
    <div
      className={`w-full ${
        isFullScreen ? "h-screen dark:bg-main-dark-bg" : "h-full"
      } flex items-center justify-center`}
    >
      <RotatingLines
        strokeColor="#0E97BC"
        strokeWidth="5"
        animationDuration="0.75"
        width={isFullScreen ? "96" : "4rem"}
        visible={true}
      />
    </div>
  );
};

export default LoadingIndicator;
