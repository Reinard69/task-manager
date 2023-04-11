import React from "react";
import LoadingIndicator from "./LoadingIndicator";

interface InfoCardProps {
  label: string;
  number: number;
  isLoading?: boolean;
}

export default function InfoCard({
  label,
  number,
  isLoading = false,
}: InfoCardProps) {
  return (
    <div className="rounded-3xl md:w-1/5 p-6 text-black w-full h-44 shadow-5xl border border-opacity-30 border-r-0 border-b-0 backdrop-filter backdrop-blur-sm">
      <p className="text-lg">{label}</p>
      {isLoading ? (
        <LoadingIndicator isFullScreen={false} />
      ) : (
        <p className="mt-4 text-4xl">{number}</p>
      )}
    </div>
  );
}
