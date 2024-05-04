import { FC } from "react";

interface Props {
  strokeWidth?: number;
  sqSize?: number;
  percentage: number;
  text?: string;
}

const CircularProgressBar: FC<Props> = ({
  strokeWidth = 8,
  sqSize = 160,
  percentage,
  text,
}: Props) => {
  const radius = (sqSize - strokeWidth) / 2;
  const viewBox = `0 0 ${sqSize} ${sqSize}`;
  const dashArray = radius * Math.PI * 2;
  const dashOffset = dashArray - (dashArray * (percentage || 0)) / 100;
  const textX = sqSize / 2;
  const textY = sqSize / 2 + 6; // Adjust this value as needed

  return (
    <svg
      width={sqSize}
      height={sqSize}
      viewBox={viewBox}
    >
      <circle
        className="fill-none stroke-gray-200"
        cx={sqSize / 2}
        cy={sqSize / 2}
        r={radius}
        strokeWidth={`${strokeWidth}px`}
      />
      <circle
        className="fill-none stroke-leaf-bold transition-all ease-in"
        cx={sqSize / 2}
        cy={sqSize / 2}
        r={radius}
        strokeLinecap="round"
        strokeWidth={`${strokeWidth}px`}
        transform={`rotate(-90 ${sqSize / 2} ${sqSize / 2})`}
        style={{
          strokeDasharray: dashArray,
          strokeDashoffset: dashOffset,
        }}
      />
      {text && (
        <text
          x={textX}
          y={textY}
          textAnchor="middle"
          className="text-2xl font-bold text-red-400 stroke-white fill-white"
        >
          {text}
        </text>
      )}
    </svg>
  );
};

export default CircularProgressBar;
