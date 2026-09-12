import { CSSProperties, FC } from "react";

type LoadingSkeletonProps = {
  style?: CSSProperties;
};

const loadingSkeletonStyle: CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  boxSizing: "border-box",
  width: "calc(100% - 15px)",
  height: "100%",
  minHeight: "100%",
  color: "#d6a84b",
  fontFamily: "'Source Code Pro', monospace",
  fontSize: "18px",
  letterSpacing: 0,
  textTransform: "uppercase",
};

export const LoadingSkeleton: FC<LoadingSkeletonProps> = ({
  style,
}) => {

  return (
    <div
      style={{ ...loadingSkeletonStyle, ...style }}
      aria-busy="true"
      role="status"
    >
      Loading...
    </div>
  );
};
