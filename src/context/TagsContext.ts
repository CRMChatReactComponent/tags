import { createContext } from "react";
import { TagType } from "@/types";

export type TagsContextType = {
  data: TagType[];
  onDataChange: (data: TagType[]) => void;
};

export const TagsContext = createContext<TagsContextType | null>(null);
