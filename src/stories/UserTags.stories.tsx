import { useState } from "react";
import UserTags from "../components/UserTags";
import { TagsContext } from "../context/TagsContext";
import { TagType } from "../types/index";
import { getTagsFakeData } from "./helpers/getTagsFakeData";
import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";

const meta: Meta<typeof UserTags> = {
  title: "UserTags",
  component: UserTags,
  args: {
    onChange: fn(),
  },
  render(props) {
    const [ids, setIds] = useState<TagType["id"][]>([]);
    const [tags, setTags] = useState<TagType[]>(getTagsFakeData());
    return (
      <div style={{ paddingLeft: 42 }}>
        <TagsContext.Provider value={{ data: tags, onDataChange: setTags }}>
          <UserTags
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

type Story = StoryObj<typeof UserTags>;

export const Basic: Story = {
  args: {},
};

export const Closable: Story = {
  args: {
    closable: true,
  },
};

export default meta;
