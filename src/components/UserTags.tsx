import { FC, useContext, useMemo } from "react";
import TagLabel from "@/components/TagLabel";
import { TagType } from "@/types";
import TagSelector from "./TagSelector";
import { TagsContext, TagsContextType } from "$/TagsContext";
import styled from "styled-components";

export type UserTagsProps = {
  ids?: TagType["id"][];
  closable?: boolean;
  addable?: boolean;
  maxCount?: number;
  onChange?: (ids: TagType["id"][]) => void;
};

const TagListWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: nowrap;
`;

const UserTagsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: nowrap;
`;

const UserTags: FC<UserTagsProps> = ({
  ids = [],
  onChange = () => {},
  maxCount = 3,
  closable = false,
}) => {
  const { data } = useContext(TagsContext) as TagsContextType;
  const selectedTags = useMemo(() => {
    return ids
      .map((id) => data.find((tag) => tag.id === id))
      .filter((tag) => !!tag) as TagType[];
  }, [data, ids]);

  function handleRemoveTagById(id: TagType["id"]) {
    const newTagsId = [...ids].filter((_id) => _id !== id);
    onChange(newTagsId);
  }

  return (
    <UserTagsWrapper>
      <TagListWrapper>
        {selectedTags.map((tag) => {
          return (
            <TagLabel
              key={tag.id}
              id={tag.id}
              closable={closable}
              onClose={() => handleRemoveTagById(tag.id)}
            />
          );
        })}
      </TagListWrapper>
      <TagSelector
        ids={ids}
        onChange={(val) => onChange(val)}
        maxCount={maxCount}
      />
    </UserTagsWrapper>
  );
};

export default UserTags;
