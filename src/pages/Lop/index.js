import { Button, Modal, Popconfirm, Table, message } from "antd";
import style from "./Lop.module.scss";
import classNames from "classnames/bind";
import * as request from "../../ApiService";
import { useEffect, useState } from "react";
import {
  EditOutlined,
  DeleteOutlined,
  ExclamationCircleFilled,
  QuestionCircleOutlined,
} from "@ant-design/icons";
import '../../Component/StyleNotModule/index.scss'
import AddFixModal from "../KhoaLopMon/AddFixModal";
import * as utill from '../../Util';
const cx = classNames.bind(style);

const { confirm } = Modal;
function Lop() {
  const columns = [
    {
      title: "Tên",
      dataIndex: "ten",
      key: "ten",
      ...utill.getColumnSearchProps("ten")
    },
    {
      title: "Mã",
      dataIndex: "ma",
      key: "ma",
      ...utill.getColumnSearchProps("ma")
    },
    {
      title: "Khóa",
      dataIndex: ["khoaDkNavigation", "loai"],
      key: "loai",
      ...utill.getColumnSearchProps(["khoaDkNavigation", "loai"])
    },
    {
      title: "Chức năng",
      dataIndex: "chucnang",
      render: (text, record) => (
        <span>
          <EditOutlined style={{ marginRight: 8 }} onClick={() => handleEdit(record)}/>
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
  const [khoaDKData,setKhoaDKData] = useState([]);

  const [dataSource, setDataSource] = useState([]);
  const [open, setOpen] = useState(false);
  const [obj,setObj] = useState({});
  //taoj select rooif guwir sang AddFixModal
  useEffect( () => {
    const getAllKhoaDk = async () => {
      try{
        const res = await request.get("KhoaDks");
        const khoaDkSelect = res.map( (obj) => {
          return {
            value: obj.id,
            label: `Khóa ${obj.loai} - ${obj.Khoa.ten}`,
          };
        } )
        setKhoaDKData(khoaDkSelect);
      }catch(err){
        console.log(JSON.stringify(err));
        message.error("lỗi gọi data khoa", 3 );
      }
    }
    getAllKhoaDk();
} , []);

  const handleEdit = (record) => {
    console.log("Edit clicked:", record);
    setObj(record);
    setOpen(true);
  };
  const handleDelete = async (id) => {
    try{
      const res = await request.del("Lop/"+id);
      render();
      message.success(res,3);
    }catch(err){
      console.log(JSON.stringify(err));
      message.error("Có lỗi xảy ra",3);
    }
  }
  const render = async () => {
    try {
      const res = await request.get("Lop/getWithKhoadk");
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
          style={{width:"100%"}}
          columns={columns}
          dataSource={dataSource}
          pagination={{ pageSize: 10  }}
        />
      </div>
      <Modal
        title={ Object.keys(obj).length === 0 ? "Thêm Mới" : "Sửa thông tin"} 
        open={open}
        onCancel={handleCancelModal}
        footer={false}
      >
        <AddFixModal arrField={[
          {
            label: "Tên",
            field: "ten",
            icon: <></>
          },
          {
            label: "Mã",
            field: "ma",
            icon: <></>
          }
        ]} 
        obj={obj}
        setOpen={setOpen}
        render={render}
        dataSelect={khoaDKData}
        fieldSelect={"khoaDk"} //gửi truowngf để gán giá trị cho select *chỉ khi sử dụng select
        links={{ add: "Lop", fix: "Lop" }}
        nameSelect={Object.keys(obj).length > 0?`Khóa ${obj.khoaDkNavigation.loai} - ${obj.khoaDkNavigation.Khoa.ten}` : ""}
        />
      </Modal>
      <Button type="primary" onClick={hanleOpenModal}>Settings</Button>
    </div>
  );
}

export default Lop;
