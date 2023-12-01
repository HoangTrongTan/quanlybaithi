import { Input, message } from "antd";
import style from "./Search.module.scss";
import classNames from "classnames/bind";
import { SearchOutlined } from "@ant-design/icons";
import * as request from '../../../ApiService';
import UseDebounce from "../../../Hooks/useDebounce";
import { useEffect, useState } from "react";
const cx = classNames.bind(style);
function Search({ setList , link ,renderNull }) {
    const [search,setSearch] = useState("");
    const handleSearch = (e) => {
        setSearch(e.target.value.trim());
    }
    const debounceValue = UseDebounce(search,700);

    useEffect( () => {
        console.log(debounceValue);
        if(!debounceValue){
          renderNull();
          return;
        }
        const render = async () => {
          try{
              const res = await request.get(link+debounceValue);
              console.log(res);
              setList(res);
          }catch(err){
            console.log(JSON.stringify(err));
            message.error("Lỗi thay đổi dữ liệu các tabs",3)
          }
      };
      render();
    } , [debounceValue]);
  return (
    <div className={cx("wrapper")}>
      <Input
        placeholder="tìm kiếm...."
        allowClear
        suffix={<SearchOutlined style={{ color: "rgba(0,0,0,.45)" }} />}
        onChange={handleSearch}
      />
    </div>
  );
}

export default Search;
