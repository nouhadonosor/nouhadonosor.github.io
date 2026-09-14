import { FC } from "react";
import { Iframe } from "components/common/iframe/iframe";
import { Window } from "components/window/window";
import "./topographic.scss";

export const TopographicWindow: FC<{}> = () => {
    return (
        <Window
            window_id="topographic"
            tab_text="topographic_tab_text"
            content_style={{
                minWidth: "30vw",
                maxWidth: "99vw",
                height: "60vh",
                width: "64vw",
                padding: 0,
            }}
        >
            <Iframe
                className="topographic-content"

                src="https://nouhadonosor.github.io/topographic-gpu/"
                title="Topographic GPU"
            />
        </Window>
    );
};
