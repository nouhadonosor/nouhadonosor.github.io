import { FC } from "react";
import "./text_button.scss";
import { LoadingSkeleton } from "components/common/loading_skeleton/loading_skeleton";

type TextButtonStyleType = { [k: string]: string | number };

type TextButtonType = {
  text?: string;
  onClick?: () => void;
  style?: TextButtonStyleType;
  height?: string | number;
  width?: string | number;
  fontSize?: string;
  left?: string;
  top?: string;
  loading?: boolean;
};

const initialStyle = {};

export const MainMenuTextButton: FC<TextButtonType> = ({
  text = null,
  onClick = () => {},
  loading = false,
  style = initialStyle,
}) => {
  const contentClassName = "text-button";

  return (
    loading ? (
      <LoadingSkeleton
        style={{
          fontFamily: "Trebuchet MS",
          height: "max-content",
          width: "max-content",
          fontSize: "inherit",
        }}
      />
    ) : (
      <div className={contentClassName} onClick={onClick} style={style}>
        {text}
      </div>
    )
  );
};
