import React from "react";
import { StorageAll } from "../../App";
export default function Info({ title, image, description }){
    const {setCartOpened} = React.useContext(StorageAll)
    return(
        <div className="cartEmpty d-flex align-center justify-center flex-column flex">
      <img className="mb-20" width="120px" src={image} alt="Empty" />
      <h2>{title}</h2>
      <p className="opacity-6">{description}</p>
      <button onClick={() => setCartOpened(false)} className="greenButton">
        <img src="icons/back.png" alt="Arrow" />
        Вернуться назад
      </button>
    </div>
    )
}