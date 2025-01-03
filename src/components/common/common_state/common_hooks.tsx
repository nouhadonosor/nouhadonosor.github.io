import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import {
  type CommonStateType,
  type CommonDispatchType,
  commonStore,
} from "./common_store";

export const useCommonDispatch: () => CommonDispatchType = useDispatch;
export const useCommonSelector: TypedUseSelectorHook<CommonStateType> =
  useSelector;
export const useCommonState = () => {
  return useSelector(() => commonStore.getState().common);
};
