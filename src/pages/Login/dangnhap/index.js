import { Button, Input, notification } from "antd";
import style from "../Login.module.scss";
import classNames from "classnames/bind";
import { EyeTwoTone, EyeInvisibleOutlined } from "@ant-design/icons";
import { useState } from "react";
import * as request from '../../../ApiService'
import { useNavigate } from "react-router-dom";
const cx = classNames.bind(style);
function DangNhap() {
  const navigate = useNavigate();
    const [taikhoan,setTaiKhoan] = useState({
        username:"",
        userpassHash:""
    });
    const handleTaiKhoan = (name,value) => {
        setTaiKhoan(prev => {
            return {
              ...prev,
              [name]: value
            }
        })
    }
    const handleLogin = async () => {
        try{
            const token = await request.post("TaiKhoan/login",taikhoan);
            sessionStorage.setItem('token',token);
            notification.success({
              message:"đăng nhập thành công",
              duration: 3
            });
            setTimeout( () => {
              navigate("/adm");
            } , 1000)
        }catch(err){
          console.log(JSON.stringify(err.message));
          notification.error({
            message:"sai tên đăng nhập hoặc mật khẩu",
            description:JSON.stringify(err),
            duration:3
          })
        }
    }
  return (
    <div className={cx("dang-nhap")}>
      <h2>Đăng nhập hệ thống</h2>
      <div className={cx("form-input")}>
        <Input onChange={(e) => handleTaiKhoan("username",e.target.value)}  style={{marginBottom:10,padding:"13px 10px"}} placeholder="Tài khoản" allowClear />
        <Input.Password
            onChange={(e) => handleTaiKhoan("userpassHash",e.target.value)}
            style={{marginBottom:10,padding:"13px 10px"}}
            placeholder="mật khẩu"
            iconRender={(visible) =>
            visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
          }
        />
      </div>

      <div style={{textAlign:"center"}}><Button type="primary" onClick={handleLogin} draggable >Vào</Button></div>
    </div>
  );
}

export default DangNhap;
