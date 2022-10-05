import Card from '../components/Card'
import React from 'react';
import axios from 'axios';
import { StorageAll } from '../App';
export default function Orders(){
  const [orders, setOrders] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const {onAddToCart, onFav} = React.useContext(StorageAll)
  React.useEffect(() => {
    (async () => {
      const {data} = await axios.get('https://631ba86d4fa7d3264c9fbafb.mockapi.io/accountItems');
      setOrders(data.map((obj) => obj.items).flat())
      setIsLoading(false);
    })()
  }, [])
    return(<div className="content p-40">
   
    <div className='d-flex align-center justify-between mb-40'>
    <h1>Мои заказы</h1>
    {console.log(orders)}
    </div>
   
  <div className='d-flex flex-wrap '>
  {
    isLoading ? [...Array(8)] : orders.map((item, index) => (
      <Card isLoading = {isLoading} key={index}   {...item}/>
    ))
  }
  

  </div>
  </div>);
}