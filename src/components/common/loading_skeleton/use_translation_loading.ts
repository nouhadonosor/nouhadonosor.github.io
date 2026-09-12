import { useDebugLoading } from "./use_debug_loading";

type TranslationLoadingOptions = {
  debugDuration?: number;
};

export const useTranslationLoading = (
  ready: boolean,
  { debugDuration }: TranslationLoadingOptions = {}
): boolean => {
  const debugLoadingActive = useDebugLoading(debugDuration);

  return !ready || debugLoadingActive;
};
