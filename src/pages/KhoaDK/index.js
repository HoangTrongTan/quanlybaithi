import { Button, Modal, Popconfirm, Table, message } from "antd";
import style from "./KhoaDK.module.scss";
import classNames from "classnames/bind";
import * as request from "../../ApiService";
import { useEffect, useState } from "react";
import {
  EditOutlined,
  DeleteOutlined,
  ExclamationCircleFilled,
  QuestionCircleOutlined,
} from "@ant-design/icons";
import AddFixModal from "../KhoaLopMon/AddFixModal";
import * as utill from '../../Util';

const cx = classNames.bind(style);
const { confirm } = Modal;
function KhoaDK() {
  const columns = [
    {
      title: "Khóa",
      dataIndex: "loai",
      key: "loai",
      ...utill.getColumnSearchProps("loai"),
    },
    {
      title: "Khoa",
      dataIndex: ["Khoa", "ten"],
      key: "ten",
      ...utill.getColumnSearchProps(["Khoa", "ten"])
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
              handleDelete(record.id);
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
  const [khoaData,setKhoaData] = useState([]);

  const [dataSource, setDataSource] = useState([]);
  const [open, setOpen] = useState(false);
  const [obj,setObj] = useState({});
  useEffect( () => {
      const getAllKhoa = async () => {
        try{
          const res = await request.get("Khoa");
          const khoaDkSelect = res.map( (obj) => {
            return {
              value: obj.ma,
              label: obj.ten,
            };
          } )
          setKhoaData(khoaDkSelect);
        }catch(err){
          console.log(JSON.stringify(err));
          message.error("lỗi gọi data khoa", 3 );
        }
      }
      getAllKhoa();
  } , []);
  const handleEdit = (record) => {
    console.log("Edit clicked:", record);
    setObj(record);
    setOpen(true);
  };
  const handleDelete = async (id) => {
    try{
      const res = await request.del("KhoaDks/"+id);
      render();
      message.success(res,3);
    }catch(err){
      console.log(JSON.stringify(err));
      message.error("Có lỗi xảy ra",3);
    }
  }
  const render = async () => {
    try {
      const res = await request.get("KhoaDks");
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
            label: "Khóa",
            field: "loai",
            type: "number",
            icon: <></>
          }
        ]} 
        obj={obj}
        setOpen={setOpen}
        render={render}
        dataSelect={khoaData}
        fieldSelect={"ma"} //gửi truowngf để gán giá trị cho select *chỉ khi sử dụng select
        links={{ add: "KhoaDks", fix: "KhoaDks" }}
        nameSelect={Object.keys(obj).length > 0?obj.Khoa.ten : ""}
        />
      </Modal>
    </div>
  );
}

export default KhoaDK;
