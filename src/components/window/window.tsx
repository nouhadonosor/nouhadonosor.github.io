import {
  FC,
  PropsWithChildren,
  useState,
  useLayoutEffect,
  useRef,
  useCallback,
  useEffect,
  CSSProperties,
} from "react";
import throttle from "lodash.throttle";
import { Vector2d } from "utils/types";
import { REFRESH_RATE } from "utils/consts";
import { useCommonDispatch } from "components/common/common_state/common_hooks";
import { closeWindow, touch } from "components/window/window_slice";
import { commonStore } from "components/common/common_state/common_store";
import { useSelector } from "react-redux";
import { Button } from "../common/button/button";
import "./window.scss";
import { WindowPrefabsUnion } from "./window_prefabs";
import { useTranslation } from "react-i18next";

type WindowStyleType = CSSProperties | any;

type WindowPropsType = {
  window_id: string;
  tab_text?: string | undefined;
  content_style?: WindowStyleType;
  tab_style?: WindowStyleType;
  initialPos?: Vector2d;
  useBorder?: boolean;
};

export const Window: FC<PropsWithChildren<WindowPropsType>> = ({
  children,
  window_id,
  initialPos = { x: window.innerWidth * 0.2, y: window.innerHeight * 0.2 },
  tab_text = undefined,
  content_style = {},
  tab_style = {},
  useBorder = true,
}) => {
  const portraitMode = window.innerWidth < window.innerHeight;
  if (portraitMode) {
    initialPos = { x: 0, y: 0 };
  }

  const mobileMode = window.innerWidth < 600;
  if (mobileMode) {
    content_style = {
      ...content_style,
      width: "calc(100vw - 12px)",
      height: "100%",
    };
  }


  const { t } = useTranslation("window");
  const [thPosition, setThPosition] = useState<Vector2d>(initialPos);
  const position = useRef<Vector2d>(initialPos);

  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [isResized, setIsResized] = useState<boolean>(false);

  const windowRef = useRef<HTMLDivElement>(null);

  const windowDispatch = useCommonDispatch();
  const windowState = useSelector(() => {
    return commonStore.getState().windows.active_windows[window_id];
  });
  const DragHandler = useCallback(
    (event: MouseEvent) => {
      const new_x = position.current.x + event.movementX;
      const new_y = position.current.y + event.movementY;
      const curRef = windowRef.current;
      const constrainBoundaryXMax =
        (curRef?.parentElement?.offsetWidth || 0) - (curRef?.offsetWidth || 0);
      const constrainBoundaryYMax =
        (curRef?.parentElement?.offsetHeight || 0) -
        (curRef?.offsetHeight || 0);
      const constrainBoundaryXMin = 0;
      const constrainBoundaryYMin = 0;
      const constrainCondXMin = constrainBoundaryXMin < new_x;
      const constrainCondXMax = new_x < constrainBoundaryXMax;
      const constrainCondYMin = constrainBoundaryYMin < new_y;
      const constrainCondYMax = new_y < constrainBoundaryYMax;
      if (isDragging) {
        position.current = {
          x: constrainCondXMin
            ? constrainCondXMax
              ? new_x
              : constrainBoundaryXMax
            : constrainBoundaryXMin,
          y: constrainCondYMin
            ? constrainCondYMax
              ? new_y
              : constrainBoundaryYMax
            : constrainBoundaryYMin,
        };
      }
    },
    [isDragging, windowRef]
  );

  const ResizeHandler = useCallback(
    (e: UIEvent) => {
      if (isResized) {
        position.current = { x: 1, y: 1 };
        setThPosition({
          x: position.current.x,
          y: position.current.y,
        });
        setIsResized(false);
      }
    },
    [isResized]
  );

  const ThDragHandler = (event: MouseEvent) => {
    setThPosition({
      x: position.current.x,
      y: position.current.y,
    });
  };

  useEffect(() => {
    const thListener = throttle((e: MouseEvent) => {
      ThDragHandler(e);
    }, REFRESH_RATE);

    const listener = (e: MouseEvent) => {
      DragHandler(e);
    };

    const listenerMouseUp = (e: MouseEvent) => {
      setIsDragging(false);
      window.removeEventListener("mousemove", thListener);
      window.removeEventListener("mousemove", listener);
    };

    window.addEventListener("mousemove", thListener);
    window.addEventListener("mousemove", listener);
    window.addEventListener("mouseup", listenerMouseUp);

    return () => {
      window.removeEventListener("mousemove", thListener);
      window.removeEventListener("mousemove", listener);
      window.removeEventListener("mouseup", listenerMouseUp);
    };
  }, [DragHandler]);

  useLayoutEffect(() => {
    const resizeListener = (e: UIEvent) => {
      setIsResized(true);
      ResizeHandler(e);
    };
    window.addEventListener("resize", resizeListener);
    return () => window.removeEventListener("resize", resizeListener);
  }, []);

  return (
    <div
      ref={windowRef}
      className="window-box"
      style={{
        top: thPosition.y,
        left: thPosition.x,
        zIndex: windowState.style.zindex,
      }}
      onMouseDown={(e) => {
        windowDispatch(touch(window_id as WindowPrefabsUnion));
      }}
    >
      <div
        className="window-tab"
        style={{
          ...tab_style,
        }}
        onMouseDown={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
      >
        <div className="window-tab-text">{t(tab_text as string)}</div>

        <div className="window-tab-buttons">
          <Button
            className="window-tab-buttons-close"
            svg={require("./svg/window-close.svg").default}
            onClick={() => {
              windowDispatch(closeWindow(window_id as WindowPrefabsUnion));
            }}
          />
        </div>
      </div>
      <div
        className={`window-content ${useBorder ? "border" : ""}`}
        style={{
          ...content_style,
        }}
      >
        {children}
      </div>
    </div>
  );
};
