import { FC } from "react";
import "./cv.scss";
import { cvDateFormatter } from "./utils";
import { useTranslation } from "react-i18next";

export type MilestoneType = {
  company?: string;
  from: string;
  to?: string;
  role: string;
  achievments: string[];
};

export const Milestone: FC<MilestoneType> = ({
  company = "Unknown",
  from,
  to = null,
  role,
  achievments = [],
}) => {
  const { t } = useTranslation("other");
  return (
    <div className="milestone">
      <strong>
        {company} ({cvDateFormatter(from)}{" "}
        {"- " + (to ? cvDateFormatter(to) : t("now"))})
      </strong>
      <em>{role}</em>
      <ul>
        {achievments.map((achievment) => (
          <li>{achievment}</li>
        ))}
      </ul>
    </div>
  );
};
