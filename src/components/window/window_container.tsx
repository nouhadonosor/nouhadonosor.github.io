import { FC } from "react";
import { WindowPrefabs, WindowPrefabsUnion } from "./window_prefabs";
import { useCommonSelector } from "components/common/common_state/common_hooks";

export const WindowContainer: FC<{}> = () => {
  const active_windows = useCommonSelector(
    (state) => state.windows.active_windows
  );
  return (
    <div style={{ width: "100%", height: "100%" }}>
      {Object.keys(active_windows).map((k) => {
        return WindowPrefabs[k as WindowPrefabsUnion]({ key: k, window_id: k });
      })}
    </div>
  );
};
