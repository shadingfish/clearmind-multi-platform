// clear-mind/tamagui.config.ts

import { config as configBase } from "@tamagui/config/v3";
import { createTamagui, createTokens } from "tamagui";

export const config = createTamagui({
  ...configBase,
  themes: {
    light: {
      primary: "#007F5F",
      secondary: "#FFFFFF",
      link: "transparent",
      linkText: "#007F5F",
      background: "#F1FED7",
      text: "#000000",
      borderColor: "#54B363",
    },
  },
});

export default config;

export type Conf = typeof config;

declare module "tamagui" {
  interface TamaguiCustomConfig extends Conf {}
}
