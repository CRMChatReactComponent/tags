import { FC, ReactNode, useState } from "react";
import { useTranslation } from "react-i18next";
import { Modal } from "antd";
import { TagsPanelProps } from "@/components/TagsPanel";
import TagsPanel from "./TagsPanel";

export type TagsPanelWrapperProps = {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  children: ReactNode;
} & TagsPanelProps;

const TagsPanelWrapper: FC<TagsPanelWrapperProps> = ({
  open: _open = false,
  onOpenChange = () => {},
  children,
  ...resetProps
}) => {
  const [open, setOpen] = useState(_open);

  const { t } = useTranslation();

  return (
    <>
      <Modal
        destroyOnClose={true}
        open={open}
        width={680}
        title={t("tagsManage")}
        footer={false}
        onCancel={() => {
          setOpen(false);
          onOpenChange(false);
        }}
      >
        <TagsPanel {...resetProps} />
      </Modal>

      <div
        onClick={() => {
          setOpen(true);
          onOpenChange(true);
        }}
      >
        {children}
      </div>
    </>
  );
};

export default TagsPanelWrapper;
