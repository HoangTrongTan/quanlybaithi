import style from "./Mon.module.scss";
import classNames from "classnames/bind";
import { Button, Modal, Popconfirm, Table, message } from "antd";
import * as request from "../../ApiService";
import { useEffect, useState } from "react";
import {
  EditOutlined,
  DeleteOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";
import AddFixModal from "../KhoaLopMon/AddFixModal";
import * as utill from '../../Util';

const cx = classNames.bind(style);
function Mon() {
  const columns = [
    {
      title: "Tên",
      dataIndex: "tenhocphan",
      key: "tenhocphan",
      ...utill.getColumnSearchProps("tenhocphan")
    },
    {
      title: "Mã",
      dataIndex: "ma",
      key: "ma",
      ...utill.getColumnSearchProps("ma")
    },
    {
      title: "Chức năng",
      dataIndex: "chucnang",
      render: (text, record) => (
        <span>
          <EditOutlined
            style={{ marginRight: 8 }}
            onClick={() => handleEdit(record)}
          />
          <Popconfirm
            title="Delete the task"
            description="Bạn có chắc chắn xóa tác vụ này không ?"
            okText="Yes"
            cancelText="No"
            onConfirm={() => {
              handleDelete(record.ma);
            }}
            placement="topLeft"
            icon={<QuestionCircleOutlined style={{ color: "red" }} />}
          >
            <DeleteOutlined style={{ color: "red" }} />
          </Popconfirm>
        </span>
      ),
    },
  ];
  const [dataSource, setDataSource] = useState([]);
  const [open, setOpen] = useState(false);
  const [obj,setObj] = useState({});
  const handleEdit = (record) => {
    console.log("Edit clicked:", record);
    setObj(record);
    setOpen(true);
  };
  const handleDelete = async (id) => {
    try{
      const res = await request.del("MonHocKhoa/"+id);
      render();
      message.success(res,3);
    }catch(err){
      console.log(JSON.stringify(err));
      message.error("Có lỗi xảy ra",3);
    }
  }
  const render = async () => {
    try {
      const res = await request.get("MonHocKhoa");
      setDataSource(res);
    } catch (err) {
      console.log(JSON.stringify(err));
      message.error("Có lỗi khi load dữ liệu !", 3);
    }
  };
  useEffect(() => {
    render();
  }, []);
  const hanleOpenModal = () => {
    setObj({});
    setOpen(true);
  };
  const handleCancelModal = () => setOpen(false);
  return (
    <div className={cx("wrapper")}>
      <div className={cx("list")}>
        <Table
          columns={columns}
          dataSource={dataSource}
          pagination={{ pageSize: 10 }}
        />
      </div>
      <div className={cx("actions")}>
        <Button type="primary" onClick={hanleOpenModal}>
          Thêm mới
        </Button>
      </div>
      <Modal
        title={ Object.keys(obj).length === 0 ? "Thêm Mới" : "Sửa thông tin"}
        open={open}
        onCancel={handleCancelModal}
        footer={false}
      >
        <AddFixModal arrField={[
          {
            label: "Mã",
            field: "ma",
            icon: <></>
          },
          {
            label:"Tên Học Phần",
            field: "tenhocphan",
            icon: <></>
          }
        ]} 
        obj={obj}
        setOpen={setOpen}
        render={render}
        links={{ add: "MonHocKhoa", fix: "MonHocKhoa" }}
        />
      </Modal>
    </div>
  );
}

export default Mon;
