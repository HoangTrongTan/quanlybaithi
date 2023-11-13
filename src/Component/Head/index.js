import { Ring } from "../Icons";
import { Button } from "antd";
import style from "./Head.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(style);

function Head() {
  return (
    <div className={cx("wrapper")}>
      <div className={cx('child')}>
          <div className={cx('left')}>
            <div className={cx("info")}>
              <p>Name</p>
              <p>Inffo nbame</p>
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
