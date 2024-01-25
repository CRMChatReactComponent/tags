import { useState } from "react";
import TagsPanel from "../components/TagsPanel";
import { TagsContext } from "../context/TagsContext";
import { TagType } from "../types/index";
import { getTagsFakeData } from "./helpers/getTagsFakeData";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof TagsPanel> = {
  title: "TagsPanel",
  component: TagsPanel,
  args: {},
};

type Story = StoryObj<typeof TagsPanel>;

export const Basic: Story = {
  args: {},
  render(props) {
    const [tags, setTags] = useState<TagType[]>(getTagsFakeData());
    return (
      <div style={{ paddingLeft: 42 }}>
        <TagsContext.Provider value={{ data: tags, onDataChange: setTags }}>
          <TagsPanel />
        </TagsContext.Provider>
      </div>
    );
  },
};

export const Empty: Story = {
  render(props) {
    const [tags, setTags] = useState<TagType[]>([]);
    return (
      <div style={{ paddingLeft: 42 }}>
        <TagsContext.Provider
          value={{
            data: tags,
            onDataChange(tags) {
              setTags(tags);
            },
          }}
        >
          <TagsPanel />
        </TagsContext.Provider>
      </div>
    );
  },
};

export const Slot: Story = {
  render(props) {
    const [tags, setTags] = useState<TagType[]>(getTagsFakeData());
    return (
      <div style={{ paddingLeft: 42 }}>
        <TagsContext.Provider
          value={{
            data: tags,
            onDataChange(tags) {
              setTags(tags);
            },
          }}
        >
          <TagsPanel
            SlotTableLabelColumn={({ tag }) => {
              return <>自定义 slot</>;
            }}
          />
        </TagsContext.Provider>
      </div>
    );
  },
};

export default meta;
