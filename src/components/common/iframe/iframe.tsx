import { CSSProperties, FC, useState } from "react";
import { LoadingSkeleton } from "components/common/loading_skeleton/loading_skeleton";
import "./iframe.scss";

type IframeProps = {
  src: string;
  title: string;
  className?: string;
  style?: CSSProperties;
};

export const Iframe: FC<IframeProps> = ({
  src,
  title,
  className,
  style,
}) => {
  const [loading, setLoading] = useState(true);

  return (
    <div className="common-iframe" style={style}>
      {loading && <LoadingSkeleton style={{ width: "100%" }} />}
      <iframe
        className={className}
        src={src}
        title={title}
        loading="lazy"
        onLoad={() => setLoading(false)}
        onError={() => setLoading(false)}
        style={{
          display: "block",
          width: "100%",
          height: "100%",
          border: 0,
          visibility: loading ? "hidden" : "visible",
        }}
      />
    </div>
  );
};