import { FC, useContext } from "react";
import { useTranslation } from "react-i18next";
import { Table, Space, Button, Popconfirm, Flex, Empty } from "antd";
import TagLabel from "@/components/TagLabel";
import { SlotType, TagType } from "@/types";
import TagFormWrapper from "./TagFormWrapper";
import { AntdApiContext, AntdApiContextType } from "$/AntdApiContext";
import { TagsContext, TagsContextType } from "$/TagsContext";
import styled from "styled-components";

export type TagsPanelProps = {
  //  用于渲染 table 中 label 栏目的 DOM 节点
  //  比如渲染一个 tag 有多少数据再使用
  //  tagName (124)
  SlotTableLabelColumn?: SlotType;
};

const LabelWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 8px;
`;

const ActionWrapper = styled.span`
  opacity: 0.4;
  &:hover {
    opacity: 1;
  }
`;

const TagsPanel: FC<TagsPanelProps> = (props) => {
  const { SlotTableLabelColumn } = props;
  const { data, onDataChange } = useContext(TagsContext) as TagsContextType;
  const { messageApi } = useContext(AntdApiContext) as AntdApiContextType;
  const { t } = useTranslation();

  function handleTagChange(tag: TagType) {
    const newData = [...data];
    const targetIndex = newData.findIndex((_tag) => tag.id === tag.id);
    if (!!~targetIndex) {
      newData[targetIndex] = tag;
    }
    onDataChange(newData);
  }

  function handleDeleteTag(tag: TagType) {
    const newData = [...data];
    onDataChange(newData.filter((_tag) => _tag.id !== tag.id));
    messageApi.success(t("deletedSuccessfully"));
  }

  function handleAddTag(tag: TagType) {
    const newData = [tag, ...data];
    onDataChange(newData);
    messageApi.success(t("createSuccessfully"));
  }

  return (
    <Table
      size={"small"}
      bordered={true}
      dataSource={data}
      rowKey={"id"}
      pagination={false}
      scroll={{
        y: 420,
      }}
      virtual={true}
      footer={() => {
        return (
          <Flex justify={"end"}>
            <TagFormWrapper data={null} onSaved={handleAddTag} isEdit={false}>
              <Button type={"primary"}>{t("createTag")}</Button>
            </TagFormWrapper>
          </Flex>
        );
      }}
      locale={{
        emptyText: () => {
          return (
            <Space
              direction={"vertical"}
              size={24}
              style={{
                width: "100%",
                textAlign: "center",
                padding: "62px 0px",
              }}
            >
              <Empty />
              <TagFormWrapper data={null} onSaved={handleAddTag} isEdit={false}>
                <Button type={"primary"}>{t("createTag")}</Button>
              </TagFormWrapper>
            </Space>
          );
        },
      }}
    >
      <Table.Column
        key={"label"}
        title={t("tag")}
        dataIndex={"label"}
        width={480}
        render={(_, tag: TagType) => {
          return (
            <LabelWrapper>
              <TagLabel id={tag.id} />
              {SlotTableLabelColumn && <SlotTableLabelColumn tag={tag} />}
            </LabelWrapper>
          );
        }}
      />
      <Table.Column
        key={"id"}
        title={"Actions"}
        dataIndex={"id"}
        render={(_, tag: TagType) => {
          return (
            <ActionWrapper>
              <Space size={4}>
                <TagFormWrapper
                  data={tag}
                  onSaved={handleTagChange}
                  isEdit={true}
                >
                  <Button size={"small"} type={"link"}>
                    {t("edit")}
                  </Button>
                </TagFormWrapper>
                <Popconfirm
                  title={t("confirmDelete")}
                  okText={t("delete")}
                  cancelText={t("cancel")}
                  okButtonProps={{
                    danger: true,
                  }}
                  onConfirm={() => handleDeleteTag(tag)}
                >
                  <Button size={"small"} type={"text"} danger={true}>
                    {t("delete")}
                  </Button>
                </Popconfirm>
              </Space>
            </ActionWrapper>
          );
        }}
      />
    </Table>
  );
};

export default TagsPanel;
