import React, { FC } from "react";
import "./settings.scss";
import { useTranslation } from "react-i18next";
import {
  useCommonDispatch,
  useCommonState,
} from "components/common/common_state/common_hooks";
import { setGameOfLifeRunning } from "components/common/common_state/common_slice";

const SettingsContent: FC<{}> = () => {
  const { t, i18n } = useTranslation("window", { keyPrefix: "settings" });
  const { game_of_life_running } = useCommonState();
  const commonDispatch = useCommonDispatch();
  return (
    <div className="settings">
      <div className="settings-table">
        <div className="settings-table-text">{t("language_row_header")}</div>
        <div className="settings-table-option">
          <select
            className="settings-table-select"
            name="language"
            id="language"
            value={i18n.language.split("-")[0]}
            onChange={(e) => {
              i18n.changeLanguage(e.target.value);
            }}
          >
            <option value="en">English</option>
            <option value="ru">Русский</option>
          </select>
        </div>

        <div className="settings-table-text">{t("run_game_of_life")}</div>
        <div className="settings-table-option">
          <label className="settings-table-checkbox">
            <input
              type="checkbox"
              checked={game_of_life_running}
              onChange={(e) => {
                commonDispatch(setGameOfLifeRunning(e.target.checked));
              }}
            />
            <div className="settings-table-checkmark"></div>
          </label>
        </div>
      </div>
    </div>
  );
};

export default SettingsContent;
