import { useSelector, useDispatch } from 'react-redux'
import { Button, Modal, Popconfirm, Table } from "antd";
import style from "./Danhsach.module.scss";
import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as request from "../../ApiService";
import * as requestForm from "../../ApiService/formRequest";
import { EditOutlined,DeleteOutlined, ExclamationCircleFilled, QuestionCircleOutlined } from "@ant-design/icons";
import FormFix from "./FormFix";
import { setDanhSachFiles } from "../../StoreProvider/global";
import { useJwt } from 'react-jwt';
import UpFiles from '../UpFiles';
import * as utill from '../../Util';
const cx = classNames.bind(style);

const {confirm} = Modal;
function Danhsach() {
  const token = sessionStorage.getItem("token");
  const navigate = useNavigate();
  if (token === null) {
    navigate("/login");
  }
  const { decodedToken, isExpired } = useJwt(sessionStorage.getItem("token"));
  // chỉ để re-render
  const [fileState,setFileState] = useState({});


  const [fixDelAddModel,setFixDelAddModel] = useState([false,false,{},false]); //[0] là sửa [1] là xóa [2] gửi object sang để sửa [3] thêm
  const dataSource = useSelector( (state) => state.global.danhsachFiles );
  const dispacth = useDispatch();
  const column = [
    {
      title: "Giáo viên",
      dataIndex: "giaovien",
      
    },
    {
      title: "Khoa",
      dataIndex: "khoa",
      
    },
    {
      title: "Khóa",
      dataIndex: "khoa_DK",
      sorter: (a, b) => {
        return String(a.khoa_DK).localeCompare(String(b.khoa_DK));
      }
    },
    {
      title: "Lớp",
      dataIndex: "lop",
    },
    {
      title: "Môn",
      dataIndex: "mon",
      ...utill.getColumnSearchProps("mon")
    },
    {
      title: "File",
      dataIndex: "filesUp",
      render: (text, record) => (
        <a href={`https://localhost:7029/contents/${text}`}>
          <img
            src="https://images.sftcdn.net/images/t_app-icon-m/p/c3152528-96bf-11e6-b8e7-00163ed833e7/3833258526/winrar-64bit-WinRAR.png"
            alt={`${record}`}
            style={{ width: 50, height: 50 }}
          />
        </a>
      ),
    },
    {
      title: "Thời gian",
      dataIndex: "thoigian",
      ...utill.getColumnSearchProps("thoigian")
    },
    {
      title: "Chức năng",
      dataIndex: "chucnang",
      render: (text, record) => (
          <span>
            <EditOutlined style={{ marginRight: 8 }} onClick={ () => handleEdit(record)  }/>
            <Popconfirm
              title="Delete the task"
              description="Bạn có chắc chắn xóa tác vụ này không ?"
              okText="Yes"
              cancelText="No"
              onConfirm={() => {handleDelete(record.id);} }
              placement="topLeft"
              icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
            >
              <DeleteOutlined style={{ color: 'red' }} />
            </Popconfirm>

          </span>
        ),
    },
  ];

  const handleEdit = (record) => {
      setFixDelAddModel( prev => {
        prev[0] = true;
        prev[2] = record;
        prev[3] = false;
        return [...prev]
      } );
  }
  const handleDelete = async (id) => {
      await requestForm.del("Files/"+id);
      render();
  }
  
  
  const [columns, setColumns] = useState(column);
  
  const render = async () => {
      const res = await request.get("Files/"+decodedToken.maUser);
      dispacth(setDanhSachFiles(res) );
  };
  useEffect( () => {
    if(decodedToken){
      render();
      // cho cái state để set lại cho cái decodedToken có dữ liệu thôi
      setFileState(decodedToken);
    }
  } , [decodedToken]);
  useEffect(() => {
    if(decodedToken){
      render();
    }
  }, [dataSource.length ]);

  const pagination = {
    pageSize: 5,
  };
  const handleOpenFormAdd = () => {
    setFixDelAddModel( prev => {
      prev[0] = false
      prev[2] = {};
      prev[3] = true;
      return [...prev];
    } )
  };
  const handleCancelModelAdd = () => {
    setFixDelAddModel( prev => {
      prev[0] = false
      prev[2] = {};
      prev[3] = false;
      return [...prev];
    } )
  }
  return (
    <div className={cx("wrapper")}>
      <Button type='primary' onClick={handleOpenFormAdd}> Thêm mới </Button>
      <FormFix state={[fixDelAddModel,setFixDelAddModel]} />
      <h1>Danh sách</h1>
      <Table
        columns={columns}
        dataSource={dataSource}
        pagination={pagination}
      />
      <Modal
          title="Basic Modal"
          open={fixDelAddModel[3]} 
          onCancel={handleCancelModelAdd}
          footer={false}
        >
          <UpFiles state={[fixDelAddModel,setFixDelAddModel]} Objfiles={fixDelAddModel[2]}/>
        </Modal>
    </div>
  );
}

export default Danhsach;
