import { FC } from "react";
import "./cv.scss";

export type StackTechType = {
  name: string;
  items: StackTechType[] | string[];
};

export const StackTech: FC<StackTechType> = ({
  name = "Unknown",
  items = [],
}) => {
  const buildStackTechNode = (item: string | StackTechType) => {
    if (typeof item === "string") {
      return <li className="stack-string">{item}</li>;
    } else {
      return (
        <li className="stack-item">
          <StackTech name={item.name} items={item.items} />
        </li>
      );
    }
  };

  return (
    <div className="stack-tech">
      <strong>{name}</strong>
      <ul>{items.map(buildStackTechNode)}</ul>
    </div>
  );
};
