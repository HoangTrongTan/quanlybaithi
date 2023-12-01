import { Tabs } from "antd";
import { useState } from "react";
import style from "./KhoaLopMon.module.scss";
import classNames from "classnames/bind";
import Khoa from "../Khoa";
import Lop from "../Lop";
import KhoaDK from "../KhoaDK";
import Mon from "../Mon";
const cx = classNames.bind(style);

function KhoaLopMon() {
    const [tabs,setTabs] = useState([
        {
            label:"Khoa",
            key: "Danh sách khoa",
            children:<Khoa />
        },
        {
            label:"Danh sách Khóa",
            key: "khoadk",
            children:<KhoaDK />
        },
        {
            label:"Danh sách Lớp",
            key: "lop",
            children:<Lop />
        },
        {
            label:"Danh sách môn",
            key: "mon",
            children:<Mon />
        },
    ])
    return ( <div className={cx('wrapper')}>
            <div className={cx('content')}><Tabs items={tabs} /></div>
    </div> );   
}

export default KhoaLopMon;