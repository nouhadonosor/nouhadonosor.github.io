import { FC } from "react";
import { useTranslation } from "react-i18next";
import "./cv.scss";
import { CVBoxAvatar, CVBoxText, CVBoxBio, CVBoxExperience, CVBoxStack } from "./cv_box";
import { MilestoneType } from "./milestone";

export const CVContent: FC<{}> = () => {
  const { t: t_cv } = useTranslation("cv");
  return (
    <div className="cv-container">
      <CVBoxAvatar />
      <CVBoxBio text={t_cv("bio")}/>
      <CVBoxExperience experience={t_cv("experience", {returnObjects: true}) as MilestoneType[]}/>
      <CVBoxStack stack={t_cv("stack", {returnObjects: true})}/>
    </div>
  );
};
