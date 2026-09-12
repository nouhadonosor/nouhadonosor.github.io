import GameOfLife from "components/game_of_life/game_of_life";
import { WindowContainer } from "components/window/window_container";
import throttle from "lodash.throttle";
import { FC, useRef, useState, useEffect } from "react";
import { REFRESH_RATE } from "utils/consts";
import { Vector2d } from "utils/types";
import { MainMenuTextButton } from "components/text_button/text_button";
import { useCommonDispatch } from "components/common/common_state/common_hooks";
import { openWindow } from "components/window/window_slice";
import "./main_page.scss";
import { closeCurrentTab } from "components/utils/utils";
import { useCommonState } from "components/common/common_state/common_hooks";
import { useTranslationWithSkeleton } from "components/common/loading_skeleton/use_translation_with_skeleton";

const ContentCanvasStyle = {
  position: "absolute",
  width: "100%",
  height: "100%",
  //zIndex: "10",
  color: "white",
  textAlign: "center",
} as React.CSSProperties;

export const MainPage: FC<{}> = () => {
  const cellSize = 20;
  const pageId = "main-page";
  const [pageSize, setPageSize] = useState<Vector2d>({ x: 0, y: 0 });
  const thisElemRef = useRef<HTMLDivElement>(null);
  const windowDispatch = useCommonDispatch();
  const { t, loading } = useTranslationWithSkeleton("main_menu");
  const { game_of_life_running } = useCommonState();

  useEffect(() => {
    const node = document.getElementById(pageId);
    const listener = throttle((entries: ResizeObserverEntry[]) => {
      setPageSize({
        x: entries[0].contentRect.width,
        y: entries[0].contentRect.height,
      });
    }, REFRESH_RATE);
    const observer = new ResizeObserver(listener);
    if (node) observer.observe(node);
    return () => {};
  }, []);

  return (
    <div id={pageId} className={pageId} ref={thisElemRef}>
      <div
        id="content-canvas"
        className="content-canvas"
        style={ContentCanvasStyle}
      >
        <header className="name-header">nouhadonosor</header>

        <div className="text-button-container">
          <MainMenuTextButton
            text={t("about_me_button")}
            loading={loading}
            onClick={() => {
              windowDispatch(openWindow("aboutme"));
            }}
          />
          <MainMenuTextButton
            text={t("settings_button")}
            loading={loading}
            onClick={() => {
              windowDispatch(openWindow("settings"));
            }}
          />
          <MainMenuTextButton
            text={t("quit_button")}
            loading={loading}
            onClick={() => {
              closeCurrentTab();
            }}
          />
        </div>
      </div>
      <GameOfLife
        cell_size={cellSize}
        width_cells={Math.ceil(pageSize.x / cellSize)}
        height_cells={Math.ceil(pageSize.y / cellSize)}
        isRunning={game_of_life_running}
      ></GameOfLife>

      <WindowContainer />
    </div>
  );
};
