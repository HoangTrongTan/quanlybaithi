import { Button, Layout, Menu, Space } from "antd";
import style from "./Sidebar.module.scss";
import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCake, faHome } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const cx = classNames.bind(style);

function Sidebar() {
  const [expan, setExpan] = useState(false);
  const navigate = useNavigate();
  const handleClospan = () => {
    setExpan( prev => !prev );
  }
  return (
    <div className={cx('wrapper')}>
        <img src="https://upload.wikimedia.org/wikipedia/vi/4/49/Logo_dhsaodo_moi.PNG" className={cx('img-logo')} />
        <div className={cx('wrapper-child')}>
          <Menu
            style={{width:"100%", background:"#fff", color:"#000"}}
            mode="inline"
            defaultOpenKeys={["upfile"]}
            inlineCollapsed={expan}
            onClick={({key}) => {
              navigate(key);
            }}
            items={[
              {
                
                label: "Thống kê",
                key: "upfile",
                icon: <FontAwesomeIcon icon={faCake} />,
                children: [
                  {
                    label: "Danh sách",
                    key: "/adm",
                    icon: <FontAwesomeIcon icon={faCake} />,
                  },
                  {
                    label: "Up files",
                    key: "/up",
                    icon: <FontAwesomeIcon icon={faCake} />,
                  },
                ],
              },
              {
                label: "Quản lý thông tin",
                key: "/qltt",
                icon: <FontAwesomeIcon icon={faCake} />,
              },
              {
                label: "Quản lý môn học",
                key: "/mhk",
                icon: <FontAwesomeIcon icon={faCake} />,
              },
            ]}
          >

            <Menu.Item key="login">
                <Link>
                  <span>login</span>
                </Link>
            </Menu.Item>
          </Menu>
        </div>

    </div>
  );
}

export default Sidebar;
