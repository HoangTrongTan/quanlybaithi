import style from "./Login.module.scss";
import classNames from "classnames/bind";
import DangNhap from "./dangnhap";

const cx = classNames.bind(style);

function Login() {
  
  return (
    <div className={cx("wrapper")}>
      <div className={cx("header")}>
        <img src="https://mega.com.vn/media/news/1973_hinh_nen_xanh_la_cay_cho_may_tinh__43_.jpg" />
      </div>
        {/* đăng nhập đăng ký */}
        <div className={cx('tabs')}>
            <DangNhap />
        </div>

    </div>
  );
}

export default Login;
