import { ReactElement } from "react";

export type SlotType = (props: { tag: TagType }) => ReactElement | null;

export type TagType = {
  id: string;
  label: string;
  backgroundColor: string;
};
