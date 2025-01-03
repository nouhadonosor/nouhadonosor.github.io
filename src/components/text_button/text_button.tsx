import { FC } from "react";
import "./text_button.scss";

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
};

const initialStyle = {};

export const MainMenuTextButton: FC<TextButtonType> = ({
  text = null,
  onClick = () => {},
  style = initialStyle,
}) => {
  return (
    <div className="text-button" onClick={onClick} style={style}>
      {text}
    </div>
  );
};
