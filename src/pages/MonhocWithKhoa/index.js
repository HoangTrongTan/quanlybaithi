import React, { useState } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import style from "./MonhocWithKhoa.module.scss";
import classNames from "classnames/bind";
import { HTML5Backend } from "react-dnd-html5-backend";
import ListMon from "./ListMon";
import BoxKhoa from "./BoxKhoa";


const cx = classNames.bind(style);

function MonhocWithKhoa() {
  return (
    <div className={cx('wrapper')}>
      <div className={cx('content')}>
        <DndProvider backend={HTML5Backend}>
                <ListMon />
                <BoxKhoa />
        </DndProvider>
      </div>
    </div>
  );
}

export default MonhocWithKhoa;

