import { useState } from "react";
import { getTagsFakeData } from "@/stories/helpers/getTagsFakeData";
import TagSelector from "../components/TagSelector";
import { TagsContext } from "../context/TagsContext";
import { TagType } from "../types/index";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof TagSelector> = {
  title: "TagSelector",
  component: TagSelector,
  args: {},
  render(props) {
    const [ids, setIds] = useState([]);
    const [tags, setTags] = useState<TagType[]>(getTagsFakeData());
    return (
      <div style={{ paddingLeft: 42 }}>
        <TagsContext.Provider value={{ data: tags, onDataChange: setTags }}>
          <TagSelector
            {...props}
            ids={ids}
            onChange={(val) => {
              setIds(val);
              props?.onChange?.(val);
            }}
          />
        </TagsContext.Provider>
      </div>
    );
  },
};

type Story = StoryObj<typeof TagSelector>;

export const Basic: Story = {
  args: {},
};

export default meta;
