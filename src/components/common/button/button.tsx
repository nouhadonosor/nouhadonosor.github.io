import { FC, useState, useEffect } from "react";

type ButtonType = {
  onClick?: () => {} | any;
  className?: string;
  svg?: string;
};

export const Button: FC<ButtonType> = ({
  onClick = () => {},
  className,
  svg,
}) => {
  const [isPressed, setIsPressed] = useState<boolean>(false);
  useEffect(() => {
    const listener = () => {
      setIsPressed(false);
    };
    window.addEventListener("mouseup", listener);
    window.addEventListener("ontouchend", listener);
    return () => {
      window.removeEventListener("mouseup", listener);
      window.removeEventListener("ontouchend", listener);
    };
  }, []);
  return (
    <div
      className={`${className}${isPressed ? " pressed" : ""}`}
      onTouchStart={() => setIsPressed(true)}
      onMouseDown={() => setIsPressed(true)}
      onClick={onClick}
    >
      <img className={className + '-svg'} src={svg} alt={className + '-svg'} />
    </div>
  );
};
