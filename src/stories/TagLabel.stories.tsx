import { useState } from "react";
import TagLabel from "../components/TagLabel";
import { TagsContext } from "../context/TagsContext";
import { TagType } from "../types/index";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof TagLabel> = {
  title: "TagLabel",
  component: TagLabel,
  args: {},
  render(props) {
    const [tags, setTags] = useState<TagType[]>([
      {
        id: "foo",
        label: "bar",
        backgroundColor: "#108ee9",
      },
    ]);
    return (
      <div style={{ paddingLeft: 42 }}>
        <TagsContext.Provider value={{ data: tags, onDataChange: setTags }}>
          <TagLabel {...props} />
        </TagsContext.Provider>
      </div>
    );
  },
};

type Story = StoryObj<typeof TagLabel>;

export const Basic: Story = {
  args: {
    id: "foo",
  },
};

export const Closable: Story = {
  args: {
    id: "foo",
    closable: true,
  },
};

export default meta;
