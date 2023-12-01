import { Button, Select, Upload, message, notification } from "antd";
import style from "./UpFiles.module.scss";
import classNames from "classnames/bind";
import { useEffect, useRef, useState } from "react";
import * as request from "../../ApiService/formRequest";
import { useJwt } from "react-jwt";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setDanhSachFiles } from "../../StoreProvider/global";

const cx = classNames.bind(style);

function UpFiles({ Objfiles = null, state }) {
  const { decodedToken, isExpired } = useJwt(sessionStorage.getItem("token"));
  const dispacth = useDispatch();
  var ObjfilesCoppy = useRef({ ...Objfiles });
  const cksetLabel = useRef(false);

  const [fileUpInfo, setFileUpInfo] = useState({});
  const [labelFileInfo, setLabelFileInfo] = useState({});

  const [khoaDK, setKhoaDK] = useState([]);
  const [lop, setLop] = useState([]);
  const [monhoc, setMonhoc] = useState([]);
  const [filesBaiThi, setFilesBaiThi] = useState([{originFileObj : null}]);

  useEffect(() => {
    cksetLabel.current = true;
    const setdatatoFix = async () => {
      try {
        const khoadk_ma = await request.get(
          "KhoaDks/fintid/" + Objfiles.khoa_DK + "/" + decodedToken.MaKhoa
        );
        const lop_ma = await request.get(
          "Lop/findid/" + khoadk_ma + "/" + Objfiles.lop
        );
        const mon_ma = await request.get("MonhocPhan/findma/" + Objfiles.mon);
        ObjfilesCoppy.current = {...Objfiles};
        setFileUpInfo((prev) => {
          return {
            ...prev,
            idkhoaDk: khoadk_ma,
            lop: lop_ma,
            mahocphan: mon_ma,
          };
          
        });
      } catch (err) {
        console.log(JSON.stringify(err));
        message.error(JSON.stringify(err.message), 3);
      }
    };
    if (Object.keys(Objfiles).length > 0 ) {
      console.log("vào vào");
      setdatatoFix();
    }
  }, [Objfiles.id]);

  useEffect(() => {
    const getDataKhoaDk = async () => {
      try {
        const res = await request.get("KhoaDks/" + decodedToken.MaKhoa);
        setKhoaDK(res);
        const resMon = await request.get("MonhocPhan/" + decodedToken.MaKhoa);
        setMonhoc(resMon);
        notification.info({
          message: "load thành công",
          duration: 2,
        });
        setTimeout(() => {
          notification.destroy();
        }, 3000);
      } catch (err) {
        console.log(JSON.stringify(err));
        notification.error({
          message: "load méo thành công",
          description: JSON.stringify(err.message),
          duration: 2,
        });
      }
    };
    getDataKhoaDk();
  }, [decodedToken]);

  const validateFiles = () => {
    if (!fileUpInfo.idkhoaDk || !fileUpInfo.lop || !fileUpInfo.mahocphan) {
      message.warning("Vui lòng chọn đầy đủ thông tin", 2);
      return;
    }
    if(state[0][0]){
      return true
    }
    if (!filesBaiThi || Object.keys(filesBaiThi[0]).length === 1) {
      message.warning("Vui lòng chọn file !", 2);
      return;
    }
    return true;
  };
  const handleUpload = async () => {
    try {
      if (!validateFiles()) {
        return; // Chấm dứt hàm nếu việc kiểm tra không thành công
      }
      const form = new FormData();
      if (Object.keys(Objfiles).length !== 0) {
        console.log("vào objectfiles nè         gggggggggggkkkkkkkkkkkkkkfffffffffff", Objfiles);
        form.append("id", Objfiles.id);
      }
      form.append("makhoa", decodedToken.MaKhoa);
      form.append("idgiaovien", decodedToken.maUser);
      form.append("idkhoaDk", fileUpInfo.idkhoaDk);
      form.append("lop", fileUpInfo.lop);
      form.append("mahocphan", fileUpInfo.mahocphan);
      form.append("imageFile", filesBaiThi[0].originFileObj);

      var res;
      if (Object.keys(Objfiles).length !== 0) {
        res = await request.put("Files", form);
      } else {
        res = await request.post("Files", form);
      }

      message.success(res, 3);
      setFilesBaiThi([{originFileObj: null}]);
      if (Object.keys(Objfiles).length !== 0) {
        state[1]((prev) => {
          prev[0] = false;
          prev[3] = false;
          return [...prev];
        });
      }else{
        state[1]((prev) => {
          prev[3] = false;
          return [...prev];
        });
      }
      const allData = await request.get("Files/"+decodedToken.maUser);
      dispacth(setDanhSachFiles(allData));
    } catch (err) {
      console.log(JSON.stringify(err));
      message.error(JSON.stringify(err.message), 3);
    }
  };
  const handleChangeKhoaDk = async (value, option) => {
    try {
      setFileUpInfo((prev) => ({
        ...prev,
        idkhoaDk: value,
      }));
      if (cksetLabel.current) {
        ObjfilesCoppy.current.khoa_DK = null;
        setLabelFileInfo((prev) => ({
          ...prev,
          khoadk: option.label,
        }));
      }

      const resLop = await request.get("Lop/" + value);
      setLop(resLop);
    } catch (err) {
      console.log(JSON.stringify(err.message));
      notification.error({
        message: "load dữ liệu các cột méo thành công",
        description: JSON.stringify(err.message),
        duration: 2000,
      });
    }
  };
  const handleChangeSetFile = (info) => {
    setFilesBaiThi(info.fileList);
  };
  const handleChangeLop = (value, option) => {
    setFileUpInfo((prev) => ({
      ...prev,
      lop: value,
    }));
    if (cksetLabel.current) {
      ObjfilesCoppy.current.lop = null;
      setLabelFileInfo((prev) => ({
        ...prev,
        lop: option.label,
      }));
    }
  };
  const handleChangeHocPhan = (value, option) => {
    setFileUpInfo((prev) => ({
      ...prev,
      mahocphan: value,
    }));
    if (cksetLabel.current) {
      ObjfilesCoppy.current.mon = null;
      setLabelFileInfo((prev) => ({
        ...prev,
        mon: option.label,
      }));
    }
  };
  return (
    <div className={cx("wrapper")}>
      <h1>up files</h1>
      <div className={cx("select-khoa")}>
        Khóa
        <Select
          showSearch
          style={{ width: 200 }}
          placeholder="Search to Select"
          optionFilterProp="children"
          filterOption={(input, option) =>
            (option?.label ?? "").includes(input)
          }
          filterSort={(optionA, optionB) =>
            (optionA?.label ?? "")
              .toLowerCase()
              .localeCompare((optionB?.label ?? "").toLowerCase())
          }
          options={khoaDK.map((obj) => {
            return {
              value: obj.id,
              label: "Khóa " + obj.loai,
            };
          })}
          onChange={handleChangeKhoaDk}
          value={
            ObjfilesCoppy.current.khoa_DK
              ? `Khóa ${ObjfilesCoppy.current.khoa_DK}`
              : labelFileInfo.khoadk
          }
        />
        Lớp
        <Select
          showSearch
          style={{ width: 200 }}
          placeholder="Search to Select"
          optionFilterProp="children"
          filterOption={(input, option) =>
            (option?.label ?? "").includes(input)
          }
          filterSort={(optionA, optionB) =>
            (optionA?.label ?? "")
              .toLowerCase()
              .localeCompare((optionB?.label ?? "").toLowerCase())
          }
          options={lop.map((obj) => {
            return {
              value: obj.id,
              label: "Lớp " + obj.ten,
            };
          })}
          onChange={handleChangeLop}
          value={ObjfilesCoppy.current.lop || labelFileInfo.lop}
        />
        Môn
        <Select
          showSearch
          style={{ width: 200 }}
          placeholder="Search to Select"
          optionFilterProp="children"
          filterOption={(input, option) =>
            (option?.label ?? "").includes(input)
          }
          filterSort={(optionA, optionB) =>
            (optionA?.label ?? "")
              .toLowerCase()
              .localeCompare((optionB?.label ?? "").toLowerCase())
          }
          options={monhoc.map((obj) => {
            return {
              value: obj.ma,
              label: "Lớp " + obj.tenhocphan,
            };
          })}
          onChange={handleChangeHocPhan}
          value={ObjfilesCoppy.current.mon || labelFileInfo.mon}
        />
      </div>
      <div className={cx("upload")}>
        <div className={cx("upload-child")}>
          <Upload.Dragger
            multiple={false}
            beforeUpload={(file) => {
              return false;
            }}
            onChange={handleChangeSetFile}
            style={{ display: "flex", alignItems: "center", minHeight: 150 }}
          >
            <p>Thả tệp hoặc nhấn chọn</p>
          </Upload.Dragger>
        </div>
      </div>
      <div className={cx("btn-upload")}>
        <Button onClick={handleUpload} type="primary">
          {Object.keys(Objfiles).length !== 0 ? "Cập nhật" : "Tải lên"}
        </Button>
      </div>
    </div>
  );
}

export default UpFiles;
