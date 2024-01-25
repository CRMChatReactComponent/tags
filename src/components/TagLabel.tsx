import { FC, useContext, useMemo } from "react";
import { Tag, TagProps } from "antd";
import { TagType } from "@/types";
import { TagsContext, TagsContextType } from "$/TagsContext";
import Color from "color";
import styled from "styled-components";

export type TagLabelProps = {
  id: TagType["id"];
} & Pick<TagProps, "closable" | "onClose">;

const TagWrapper = styled.span<{
  $color: string;
}>`
  .ant-tag,
  .ant-tag-close-icon {
    color: ${(p) => p.$color} !important;
  }
`;

const TagLabel: FC<TagLabelProps> = ({
  id,
  closable = false,
  onClose = () => {},
}) => {
  const { data } = useContext(TagsContext) as TagsContextType;
  const tag = useMemo(() => {
    return data.find((tag) => tag.id === id);
  }, [data, id]);
  const color = useMemo(() => {
    if (!tag) return "";
    const c = Color(tag.backgroundColor);
    const isDark = c.isDark();
    return isDark ? "#fff" : "#000";
  }, [tag]);

  if (!tag) {
    console.warn(`tag id:${id} not exist`);
    return;
  }

  return (
    <TagWrapper $color={color}>
      <Tag color={tag.backgroundColor} closable={closable} onClose={onClose}>
        {tag.label}
      </Tag>
    </TagWrapper>
  );
};

export default TagLabel;
