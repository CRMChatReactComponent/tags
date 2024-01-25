import { FC, ReactNode, useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Input,
  InputRef,
  Button,
  Space,
  Modal,
  ColorPicker,
  Typography,
} from "antd";
import { TagType } from "@/types";
import { uuidv4 } from "@/utils";

const { Text } = Typography;

export type TagFormProps = {
  //  如果为新增时可以传入 null
  data: TagType | null;
  //  是编辑还是新增
  isEdit?: boolean;
  //  字数限制
  limitation?: {
    title?: number;
  };
  children: ReactNode;
  onChange?: (data: TagType) => void;
  //  保存前需要判断下是否会出现冲突，比如 shortCode 冲突
  onBeforeSaved?: (data: TagType) => void | false | Promise<void | false>;
  onSaved?: (data: TagType) => void;
};

const TagFormWrapper: FC<TagFormProps> = ({
  data: _data,
  isEdit = false,
  limitation = {},
  onChange = () => {},
  onSaved = () => {},
  onBeforeSaved = () => {},
  children,
}) => {
  const { title: titleLimit = 40 } = limitation;
  const inputRef = useRef<InputRef>(null);

  const [data, setData] = useState<TagType>(
    _data ? _data : getDefaultTagData(),
  );
  const isAllowSaved = useMemo(() => {
    return data.label.trim().length > 0;
  }, [data]);
  const [open, setOpen] = useState(false);

  const { t } = useTranslation();

  useEffect(() => {
    _data ? setData(_data) : setData(getDefaultTagData());
  }, [_data]);

  async function handleSaved() {
    const cb = await onBeforeSaved(data);
    if (cb !== false) {
      onSaved(data);
      setOpen(false);
    }
  }

  function handleFieldChange<T extends keyof TagType>(
    key: T,
    value: TagType[T],
  ) {
    const newData = {
      ...data,
      [key]: value,
    };
    setData(newData);

    onChange(newData);
  }

  return (
    <>
      <Modal
        width={340}
        open={open}
        maskClosable={false}
        title={isEdit ? t("editTag") : t("createTag")}
        destroyOnClose={true}
        onCancel={() => setOpen(false)}
        footer={false}
      >
        <div data-testid={"tag-form"}>
          <Space direction={"vertical"} size={16} style={{ width: "100%" }}>
            <Space size={16}>
              <Text>{t("titleLabelName")}:</Text>
              <Input
                ref={inputRef}
                showCount={true}
                maxLength={titleLimit}
                value={data.label}
                onChange={(ev) => handleFieldChange("label", ev.target.value)}
              />
            </Space>
            <Space size={16}>
              <Text>{t("backgroundColorFieldName")}:</Text>
              {data.backgroundColor && (
                <ColorPicker
                  value={data.backgroundColor}
                  showText
                  onChangeComplete={(color) => {
                    handleFieldChange("backgroundColor", `#${color.toHex()}`);
                  }}
                />
              )}
            </Space>
            <Button
              block={true}
              type={"primary"}
              onClick={handleSaved}
              disabled={!isAllowSaved}
            >
              {isEdit ? t("save") : t("create")}
            </Button>
          </Space>
        </div>
      </Modal>
      <div onClick={() => setOpen(true)}>{children}</div>
    </>
  );
};

function getDefaultTagData(): TagType {
  return {
    id: uuidv4(),
    label: "",
    backgroundColor: "#1677ff",
  };
}

export default TagFormWrapper;
