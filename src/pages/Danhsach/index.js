import { Table } from "antd";
import style from "./Danhsach.module.scss";
import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import axios from "axios";

const cx = classNames.bind(style);
const column = [
    {
        title:"ID",
        dataIndex:"id",
    },
    {
        title:"quotest",
        dataIndex:"quote",
        filters:[
            {
                text:'quote',
                value:'Whatever'
            },
            {
                text:'achieve',
                value:'achieve'
            },
        ],
        onFilter: (value, record) => record.quote.indexOf(value) === 0,
        sorter: (a, b) => a.quote.localeCompare(b.quote),
    },
    {
        title:"author",
        dataIndex:"author",
        filters:[
            {
                text:'tên',
                value:'Albert'
            },
            {
                text:'achieve',
                value:'achieve'
            },
        ],
        onFilter: (value, record) => record.author.indexOf(value) === 0,
    }
];

function Danhsach() {
    const [columns,setColumns] = useState(column);
    const [dataSource,setDataSource] = useState([]);
    useEffect( () => {
        const render = async () => {
            const res = await axios.get("https://dummyjson.com/quotes");
            console.log(res);
            setDataSource(res.data.quotes)
        };
        render();
    }, [] );
    const pagination = {
        pageSize:5
    }
    return ( <div className={cx('wrapper')}>
          <h1>Dnh sách</h1>
          <Table columns={columns} dataSource={dataSource} pagination={pagination}/>
    </div> );
}

export default Danhsach;