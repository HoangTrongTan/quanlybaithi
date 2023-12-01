import { Button, Form, Input, Select, message } from "antd";
import style from "./FixModal.module.scss";
import classNames from "classnames/bind";
import { UserOutlined } from "@ant-design/icons";
import * as req from "../../../ApiService";
import { useEffect, useState } from "react";
const cx = classNames.bind(style);
function AddFixModal({
  arrField = [],
  obj = {},
  setOpen,
  render,
  dataSelect = [],
  fieldSelect = "",
  links = {},
  nameSelect = ''
}) {
  const [value, setValue] = useState(obj);
  const [labelSelect,setLabelSelect] = useState("")
  useEffect(() => {
    console.log("vào effect !",obj);
    var objNew = {...obj};
    for(let key in objNew){
      if(typeof objNew[key] === 'object'){
        delete objNew[key];
      }
    }
    setValue(objNew);
    if(dataSelect.length > 0){
      setLabelSelect(nameSelect);
    }
  }, [obj]);

  const handleInputChange = (context) => {
    setValue((prev) => {
      return {
        ...prev,
        [context.name]: context.value,
      };
    });
    
  };
  const handleChangeSelect = (value, option) => {
    setValue((prev) => {
      return {
        ...prev,
        [fieldSelect]:value
      }
    });
    setLabelSelect(option.label);
  };
  const Validate = () => {
    arrField.forEach( (obj,index) => {
        if(value[obj.field] ){
          console.log(obj.field);
          message.warning(`Bạn chưa nhập ${obj.label}`,3);
          return false;
        }
    } );
  }
  const handleSubmit = async () => {
    console.log(value);
    try {
      // var res;
      // if (Object.keys(obj).length === 0) {
      //   res = await req.post(links.add, value);
      // } else {
      //   res = await req.put(links.fix, value);
      // }
      if(!Validate){
          return;
      }
      setOpen(false);
      // render();
      // message.success(res, 3);
    } catch (err) {
      console.log(JSON.stringify(err));
      message.error("Có lỗi", 3);
    }
  };
  return (
    <div className={cx("wrapper")}>
      {dataSelect.length > 0 && (
        <div className={cx("form-item")}>
          <Select
            showSearch
            value={labelSelect}
            style={{ width: 250 }}
            placeholder="Search to Select"
            optionFilterProp="children"
            filterOption={(input, option) =>
              (String(option?.label) ?? "").includes(input)
            }
            filterSort={(optionA, optionB) =>
              (String(optionA?.label) ?? "")
                .toLowerCase()
                .localeCompare((String(optionB?.label) ?? "").toLowerCase())
            }
            options={dataSelect}
            onChange={handleChangeSelect}
            // value={ObjfilesCoppy.current.lop || labelFileInfo.lop}
          />
        </div>
      )}
      {arrField.map((item, index) => {
        var type = !item.type?"text":item.type;
          return (
            <div className={cx("form-item")}>
              <Input
                type={type}
                value={value[item.field]}
                onChange={(e) => handleInputChange(e.target)}
                prefix={item.icon}
                placeholder={item.label}
                allowClear
                name={item.field}
              />
            </div>
          );
      })}

      <Button type="primary" onClick={handleSubmit}>
        Submit
      </Button>
    </div>
  );
}

export default AddFixModal;
