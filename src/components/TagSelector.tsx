import { FC, useContext, useMemo } from "react";
import { Button, Select, SelectProps } from "antd";
import TagLabel from "@/components/TagLabel";
import { TagType } from "@/types";
import { TagsContext, TagsContextType } from "$/TagsContext";
import { TagsOutlined } from "@ant-design/icons";
import styled from "styled-components";

export type TagSelectorType = {
  ids: TagType["id"][];
  onChange: (ids: TagType["id"][]) => void;
} & SelectProps;

const TagSelectorWrapper = styled.div`
  position: relative;
  .ant-select {
    position: absolute;
    left: 2px;
    top: 2px;
    opacity: 0.5;
    width: 20px;
    height: 20px;
    opacity: 0;
  }
  .ant-select-selector {
    cursor: pointer;
    padding: 0 !important;
  }
  .ant-select,
  .ant-select-selector,
  .ant-select-selection-overflow,
  .ant-select-selection-search,
  .ant-select-selection-search-input,
  .ant-select-selection-overflow-item {
    cursor: pointer !important;
  }
`;

const TagSelector: FC<TagSelectorType> = ({
  ids = [],
  onChange = () => {},
  ...resetProps
}) => {
  const { data } = useContext(TagsContext) as TagsContextType;

  const options = useMemo(() => {
    return data.map((tag) => {
      return {
        value: tag.id,
        label: tag.label,
      };
    });
  }, [data]);

  return (
    <TagSelectorWrapper>
      <Button
        size={"small"}
        shape={"circle"}
        type={"text"}
        icon={<TagsOutlined />}
      />
      <Select
        value={ids}
        onChange={(val) => {
          onChange(val);
        }}
        dropdownStyle={{
          width: 200,
        }}
        mode={"tags"}
        tagRender={() => {
          return <></>;
        }}
        optionRender={(option) => {
          return <TagLabel id={option.value as string} />;
        }}
        options={options}
        virtual={true}
        {...resetProps}
      />
    </TagSelectorWrapper>
  );
};

export default TagSelector;
