import {
  ChaiBlockComponentProps,
  ChaiStyles,
} from "@chaibuilder/pages/runtime";
import Image from "next/image";
import * as React from "react";

export const ImageBlock = (
  props: ChaiBlockComponentProps<{
    height: string;
    width: string;
    alt: string;
    styles: ChaiStyles;
    lazyLoading: boolean;
    image: string;
  }>
) => {
  const { image, styles, alt, height, width, lazyLoading } = props;

  // If width or height are missing/invalid, use fill mode
  const shouldUseFill =
    !width || !height || isNaN(parseInt(width)) || isNaN(parseInt(height));

  const imageElement = React.createElement(Image, {
    ...styles,
    src: image,
    alt: alt || "",
    priority: !lazyLoading,
    fill: shouldUseFill,
    height: shouldUseFill ? undefined : parseInt(height),
    width: shouldUseFill ? undefined : parseInt(width),
    style: shouldUseFill ? { objectFit: "cover" } : undefined,
    unoptimized: true,
  });

  if (shouldUseFill) {
    return React.createElement(
      "div",
      { className: "relative flex w-full h-full" },
      imageElement
    );
  }

  return imageElement;
};

export const ImageConfig = {
  type: "Image",
  i18nProps: ["alt"],
};
