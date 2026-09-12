import { FC } from "react";
import { CVBoxAvatar, CVBoxBio, CVBoxExperience, CVBoxStack } from "./cv_box";
import { MilestoneType } from "./milestone";
import { LoadingSkeleton } from "components/common/loading_skeleton/loading_skeleton";
import { useTranslationWithSkeleton } from "components/common/loading_skeleton/use_translation_with_skeleton";
import "./cv.scss";

export const CVContent: FC<{}> = () => {
  const { t: t_cv, loading } = useTranslationWithSkeleton("cv");

  return (
    loading ? <LoadingSkeleton /> : <div className="cv-container">
      <CVBoxAvatar />
      <CVBoxBio text={t_cv("bio")}/>
      <CVBoxExperience experience={t_cv("experience", {returnObjects: true}) as MilestoneType[]}/>
      <CVBoxStack stack={t_cv("stack", {returnObjects: true})}/>
    </div>
  );
};
