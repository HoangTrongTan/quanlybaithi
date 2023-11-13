import FooterUser from "../../FooterUser";
import HeaderUser from "../../HeaderUser";
import style from "./LayoutUser.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(style);

function LayoutUser({ children , isHome=true}) {
  return (
    <div className={cx("wrapper")}>
      <HeaderUser isHome={isHome}/>
      <div className={cx("body")}>{children}</div>
      <FooterUser />
    </div>
  );
}

export default LayoutUser;
