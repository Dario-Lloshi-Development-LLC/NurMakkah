// Declarations for modules without TypeScript types in this project

declare module "react-native-vector-icons/MaterialIcons" {
  import { ComponentType } from "react";
  import { TextProps } from "react-native";
  const Icon: ComponentType<
    TextProps & { name: string; size?: number; color?: string }
  >;
  export default Icon;
}

declare module "react-native-fast-image" {
  import { ComponentType } from "react";
  import { ImageProps, ImageStyle } from "react-native";
  export interface FastImageProps extends ImageProps {
    source?: any;
    style?: ImageStyle;
  }
  const FastImage: ComponentType<FastImageProps>;
  export default FastImage;
}

declare module "crypto-js";

declare module "lodash" {
  const _default: any;
  export = _default;
}
