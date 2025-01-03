import { FC } from "react";
import { Window } from "./window";
import SettingsContent from "components/content/settings/settings";
import { CVContent } from "components/content/cv/cv";

const DefaultWindow: FC<{}> = () => {
  return <Window window_id="default"></Window>;
};

const AboutMeWindow: FC<{}> = () => {
  return (
    <Window
      window_id="aboutme"
      tab_text="about_me_tab_text"
      content_style={{
        fontSize: "24px",
        minWidth: "30vw",
        maxWidth: "99vw",
        height: "60vh",
        width: "64vw",
      }}
    >
      <CVContent />
    </Window>
  );
};

const SettingsWindow: FC<{}> = () => {
  return (
    <Window
      window_id="settings"
      tab_text="settings_tab_text"
      content_style={{ fontSize: "5vh", width: "450px" }}
      useBorder={false}
    >
      <SettingsContent />
    </Window>
  );
};

export const WindowPrefabs = {
  aboutme: AboutMeWindow,
  settings: SettingsWindow,
  default: DefaultWindow,
} as const;

export type WindowPrefabsUnion = [keyof typeof WindowPrefabs][number];
