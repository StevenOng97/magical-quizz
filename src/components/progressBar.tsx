import React from "react";

type Props = {
  value: number;
};

const ProgressBar = (props: Props) => {
  return (
    <div className="w-full bg-white/50 rounded-full h-2.5">
      <div
        className="h-2.5 rounded-md bg-secondary transition-all"
        style={{
          width: `${props.value}%`,
        }}
      ></div>
    </div>
  );
};

export default ProgressBar;
