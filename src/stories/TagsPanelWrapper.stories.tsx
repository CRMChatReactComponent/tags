import { useState } from "react";
import { Button } from "antd";
import TagsPanelWrapper from "../components/TagsPanelWrapper";
import { TagsContext } from "../context/TagsContext";
import { TagType } from "../types/index";
import { getTagsFakeData } from "./helpers/getTagsFakeData";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof TagsPanelWrapper> = {
  title: "TagsPanelWrapper",
  component: TagsPanelWrapper,
  args: {},
  render(props) {
    const [ids, setIds] = useState<TagType["id"][]>([]);
    const [tags, setTags] = useState<TagType[]>(getTagsFakeData());
    return (
      <div style={{ paddingLeft: 42 }}>
        <TagsContext.Provider value={{ data: tags, onDataChange: setTags }}>
          <TagsPanelWrapper>
            <Button>标签管理</Button>
          </TagsPanelWrapper>
        </TagsContext.Provider>
      </div>
    );
  },
};

type Story = StoryObj<typeof TagsPanelWrapper>;

export const Basic: Story = {
  args: {},
};

export default meta;
