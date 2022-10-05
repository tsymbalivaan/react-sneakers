import Info from "./Card/Info"
import React from "react"
import { StorageAll } from "../App";
import axios from 'axios';
export default function Drawer({items = [], onClose, onRemove}){
  const {setCartItems, cartItems} = React.useContext(StorageAll);
  const [isCompleted, setIsCompleted] = React.useState(false);
  const [orderID, setOrderID] = React.useState(null);
  const [isLoad, setIsLoad] = React.useState(false);

  const total = cartItems.reduce( (sum, item) => sum + Number(item.price), 0);
  const onOrder = async () => {
 try {
  setIsLoad(true);
  const {data} = await axios.post('https://631ba86d4fa7d3264c9fbafb.mockapi.io/accountItems',{
    items: cartItems,
  });
  setOrderID(data.id);
  setIsCompleted(true);
  setCartItems([]);
  
  for (let i = 0; i< cartItems.length; i++) {
  const element = cartItems[i];
  axios.delete(`https://631ba86d4fa7d3264c9fbafb.mockapi.io/cart/${element.id}`)
  }
 } catch (error) {
  alert('Не удалось оформить заказ')
 }
 setIsLoad(false);
 
 };
    return(
      <div className="overlay">
    <div className="drawer">
    <h2 className="mb-30 d-flex justify-between">Корзина <img onClick={onClose} src="icons/btn.svg" className="cu-p imgBtn" alt="btn"/></h2>
{(items.length > 0) ? <><div className="d-flex flex-column flex">
   <div className="items">

   {
    items.map((item) => {
      return (
      <div key={item.id} className="cartItem d-flex align-center mb-20">
      <div style={{backgroundImage: `url(${item.imgUrl})`}} className="cartItemImg"></div>
      <div className="mr-20 flex">
        <p className="mb-5">{item.title}</p>
        <b>{item.price} руб.</b>
      </div>
      <img src="icons/btn.svg" onClick={() => onRemove(item.id)} className="imgBtn" alt="btn"/>
    </div>)
    })
   }
    
    
   </div>
  
 <div className="cartTotalBlock">
 <ul>
    <li className="d-flex">
      <span>Итого:</span>
      <div></div>
      <b>{total} руб. </b>
      </li>
    <li className="d-flex">
    <span>Налог 5%:</span>
      <div></div>
      <b>{(5 * total)/100} руб. </b>
    </li>
  </ul>
  <button onClick={onOrder} className="greenButton">Оформить заказ <img src="icons/btnroad.svg" alt="button"/></button>
 </div>
 </div></> :
 <><Info image={isCompleted? 'icons/ordered.jpg':'icons/box.png'} description={isCompleted ?`Ваш заказ #${orderID} скоро будет передан курьерской доставке`:'Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ.'} title={isCompleted?'Заказ оформлен!':'Корзина пустая'}/></>
  }
    </div>
    </div>)
  
}