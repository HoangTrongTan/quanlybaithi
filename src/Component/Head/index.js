import { Ring } from "../Icons";
import { Button } from "antd";
import style from "./Head.module.scss";
import classNames from "classnames/bind";
import { BackLogin } from "../../Util";
import { useJwt } from "react-jwt";
import { useEffect, useState } from "react";

const cx = classNames.bind(style);

function Head() {
  const { decodedToken, isExpired } = useJwt(sessionStorage.getItem("token"));

  return (
    <div className={cx("wrapper")}>
      <div className={cx("child")}>
        <div className={cx("left")}>
          <div className={cx("info")}>
            <p>{decodedToken?.TenDangNhap ?? "name"}</p>
            <p>{decodedToken?.maUser ?? "info"}</p>
          </div>
        </div>
        <div className={cx("right")}>
          <p>
            <Ring />
          </p>
          <Button type="primary" block>
            Đăng nhập
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Head;
