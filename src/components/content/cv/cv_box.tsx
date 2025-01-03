import { FC } from "react";
import "./cv.scss";
import { MilestoneType, Milestone } from "./milestone";
import { useTranslation } from "react-i18next";
import { StackTech, StackTechType } from "./stack_tech";
import { TelegramButton } from "./buttons/telegram_button";
import { GithubButton } from "./buttons/github_button";
import { GmailButton } from "./buttons/gmail_button";

type CVBoxType = {
  type?: string;
  header?: string;
  text: string | JSX.Element;
};

type CVBoxExperienceType = {
  experience: MilestoneType[] | string;
};

type CVBoxStackType = {
  stack: StackTechType[] | string[];
};

type CVBoxAvatarType = {
  path_to_avatar?: string;
};

export const CVBoxAvatar: FC<CVBoxAvatarType> = ({
  path_to_avatar = "/avatar.png",
}) => {
  return (
    <div className="cv-box avatar">
      <img src={path_to_avatar} alt="Logo" />
    </div>
  );
};

export const CVBoxText: FC<CVBoxType> = ({ type = "", header = "", text }) => {
  type = type ? " " + type : type;
  return (
    <div className={"cv-box" + type}>
      {header ? <a>{header}</a> : null}
      <span>{text}</span>
    </div>
  );
};

export const CVBoxBio: FC<Pick<CVBoxType, "text">> = ({ text }) => {
  return (
    <CVBoxText
      type="bio"
      header="NATHAN"
      text={
        <>
          {text}
          <div className="contacts-container">
            <TelegramButton />
            <GithubButton />
            <GmailButton />
          </div>
        </>
      }
    />
  );
};

export const CVBoxExperience: FC<CVBoxExperienceType> = ({ experience }) => {
  const { t } = useTranslation("cv");
  return (
    <CVBoxText
      type="experience"
      header={t("headers.experience")}
      text={
        <div>
          {experience instanceof Array &&
            experience?.reverse().map((milestone, n, a) => (
              <div>
                <Milestone {...milestone} />
                {n === a.length - 1 ? null : <hr className="solid" />}
              </div>
            ))}
        </div>
      }
    />
  );
};

export const CVBoxStack: FC<CVBoxStackType> = ({ stack }) => {
  const { t } = useTranslation("cv");
  return (
    <CVBoxText
      type="stack"
      header={t("headers.stack")}
      text={
        <div>
          {stack instanceof Array &&
            stack.map((item) =>
              typeof item === "string" ? item : <StackTech {...item} />
            )}
        </div>
      }
    />
  );
};
