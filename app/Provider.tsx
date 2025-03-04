// clear-mind/app/Provider.tsx

import { useColorScheme } from "react-native";
import { TamaguiProvider, type TamaguiProviderProps } from "tamagui";
import { ToastProvider, ToastViewport } from "@tamagui/toast";
import { CurrentToast } from "./CurrentToast";
import { config } from "../tamagui.config";

export function Provider({
  children,
  ...rest
}: Omit<TamaguiProviderProps, "config">) {
  return (
    <TamaguiProvider config={config} {...rest}>
      <ToastProvider
        swipeDirection="vertical"
        // duration={1000000}
        native={
          [
            /* uncomment the next line to do native toasts on mobile. NOTE: it'll require you making a dev build and won't work with Expo Go */
            // "mobile",
          ]
        }
      >
        {children}
        <CurrentToast />
        <ToastViewport top="$9" left={0} right={0} />
      </ToastProvider>
    </TamaguiProvider>
  );
}
