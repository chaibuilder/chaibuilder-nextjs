import {
  registerChaiServerBlock,
  setChaiServerBlockDataProvider,
} from "@chaibuilder/pages/runtime";

import { blogsGridDataProvider } from "./blogs-grid/data-provider";
import { ImageBlock, ImageConfig } from "./image/Image";
import { LinkBlock, LinkConfig } from "./link/Link";

export const registerServerBlocks = () => {
  registerChaiServerBlock(ImageBlock, ImageConfig);
  registerChaiServerBlock(LinkBlock, LinkConfig);

  //set Data Provider for RSC blocks
  setChaiServerBlockDataProvider("BlogsList", blogsGridDataProvider);
};
