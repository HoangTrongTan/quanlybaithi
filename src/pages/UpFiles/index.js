import { Button, Select, Spin, Upload } from "antd";
import style from "./UpFiles.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(style);
const optionskhoa = [
  {
    label: "CNTT",
    value: "CN",
  },
  {
    label: "ikgkghkg",
    value: "kh",
  },
  {
    label: "ytuityit",
    value: "iyu",
  },
];
function UpFiles() {
  const handleUpload = () => {
    
  }
  return (
    <div className={cx("wrapper")}>
      <h1>up files</h1>
      <div className={cx("select-khoa")}>
        Khoa
        <Select
          showSearch
          style={{ width: 200 }}
          placeholder="Search to Select"
          optionFilterProp="children"
          filterOption={(input, option) =>
            (option?.label ?? "").includes(input)
          }
          filterSort={(optionA, optionB) =>
            (optionA?.label ?? "")
              .toLowerCase()
              .localeCompare((optionB?.label ?? "").toLowerCase())
          }
          options={[
            {
              value: "1",
              label: "Not Identified",
            },
            {
              value: "2",
              label: "Closed",
            },
            {
              value: "3",
              label: "Communicated",
            },
            {
              value: "4",
              label: "Identified",
            },
            {
              value: "5",
              label: "Resolved",
            },
            {
              value: "6",
              label: "Cancelled",
            },
          ]}
        />
        Khóa
        <Select
          showSearch
          style={{ width: 200 }}
          placeholder="Search to Select"
          optionFilterProp="children"
          filterOption={(input, option) =>
            (option?.label ?? "").includes(input)
          }
          filterSort={(optionA, optionB) =>
            (optionA?.label ?? "")
              .toLowerCase()
              .localeCompare((optionB?.label ?? "").toLowerCase())
          }
          options={[
            {
              value: "1",
              label: "Not Identified",
            },
            {
              value: "2",
              label: "Closed",
            },
            {
              value: "3",
              label: "Communicated",
            },
            {
              value: "4",
              label: "Identified",
            },
            {
              value: "5",
              label: "Resolved",
            },
            {
              value: "6",
              label: "Cancelled",
            },
          ]}
        />
      </div>
      <div className={cx("upload")}>
        <div className={cx("upload-child")}>
          <Upload.Dragger
            multiple
            beforeUpload={(file) => {
              console.log(file);
              return false;
            }}
            style={{ display: "flex", alignItems: "center", minHeight: 150 }}
          >
            <p>Thả tệp hoặc nhấn chọn</p>
          </Upload.Dragger>
        </div>
      </div>
      <div className={cx('btn-upload')}>
            <Button onClick={handleUpload} type="primary">
                Tải lên
            </Button>
      </div>
    </div>
  );
}

export default UpFiles;
