import { useState } from "react";
import { Button } from "antd";
import TagFormWrapper from "../components/TagFormWrapper";
import { TagsContext } from "../context/TagsContext";
import { TagType } from "../types/index";
import { getTagsFakeData } from "./helpers/getTagsFakeData";
import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";

const meta: Meta<typeof TagFormWrapper> = {
  title: "TagFormWrapper",
  component: TagFormWrapper,
  args: {
    onChange: fn(),
    onSaved: fn(),
    onBeforeSaved: fn(),
  },
  render(props) {
    const [tags, setTags] = useState<TagType[]>(getTagsFakeData());
    return (
      <div style={{ paddingLeft: 42 }}>
        <TagsContext.Provider value={{ data: tags, onDataChange: setTags }}>
          <TagFormWrapper {...props}>
            <Button>{props.isEdit ? "点击编辑" : "点击添加"}</Button>
          </TagFormWrapper>
        </TagsContext.Provider>
      </div>
    );
  },
};

type Story = StoryObj<typeof TagFormWrapper>;

export const Basic: Story = {
  args: {},
};

export const Edit: Story = {
  args: {
    isEdit: true,
    data: {
      label: "你好啊",
      id: "foo",
      backgroundColor: "#f20",
    },
  },
};

export default meta;
