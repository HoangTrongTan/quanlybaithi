import React, { useState } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import style from "./MonhocWithKhoa.module.scss";
import classNames from "classnames/bind";
import { HTML5Backend } from "react-dnd-html5-backend";

const cx = classNames.bind(style);

function MonhocWithKhoa() {
  return (
    <DndProvider backend={HTML5Backend}>
      <div>
        <DragDrop />
      </div>
    </DndProvider>
  );
}

export default MonhocWithKhoa;

const PictureList = [
  {
    id:1,
    url: "https://telegraph-image-bak.pages.dev/file/900af1ded9657b3c3ec4d.png"
  },
  {
    id:2,
    url: "https://img.kemono.su/thumbnail/data/78/5a/785aa37f1deb9645830127fc6aefa5703e60bcbf38aab2e55e1cebd98db5c7f9.jpg"
  },
  {
    id:3,
    url: "https://img.kemono.su/thumbnail/data/7e/11/7e110eb9f59b3ddbf78059a05e91324931407d1f22d873e625abc2f795d12ac5.jpg"
  },
]
const DragDrop = () => {

  const [board,setBoard] = useState([]);
  const [{isOver}, drop] = useDrop( () => ({
      accept:"image",
      drop: (item) => addImageToBoard(item.id),
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
      }),
  }) )

  const addImageToBoard = (id) => {
    const im = PictureList.filter( i => i.id === id );
    setBoard( prev => [...prev,im[0] ] );
  }

  return (
    <>
      <div className={cx('Pictures')}>
        {
          PictureList.map( (item) => {
            return <PictureOk url={item.url} id={item.id} />
          } )
        }
      </div>
      <div style={{width:400, height:600, border:"1px solid #000"}} ref={drop}>
        {
          board.map( (img) => {
             return <PictureOk url={img.url} id={img.id} />
          } )
        }
      </div>
    </>
  )
}
const PictureOk = ({id , url}) => {
  const [{isDragging}, drag] = useDrag( () => ({
    type: "image",
    item: { id: id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }) );

  return (
    <>
      <img ref={drag} src={url} id={id} style={{width:100, height:100 , border: isDragging ? "5px solid pink" : "0px" }}/>
    </>
  )
}