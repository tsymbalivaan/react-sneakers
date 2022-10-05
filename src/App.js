import React from 'react';
import axios from 'axios';
import Orders from './pages/Orders';
import Header from './components/Header'
import Drawer from './components/Drawer'
import Favorites from './pages/Favorites'
import {
  Routes,
  Route
} from "react-router-dom";
import Home from './pages/Home';

export const StorageAll = React.createContext({});


function App() {

  const [cartOpened, setCartOpened] = React.useState(false);
  const [items, setItems] = React.useState([]);
  const [searchVal, setSearchVal] = React.useState('');
  const [cartItems, setCartItems] = React.useState([]);
  const [favorites, setFavorites] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [count, setCount] = React.useState(0);
  React.useEffect(() => {
    async function fetchData(){
      setIsLoading(true);
     let cartResponse = await axios.get('https://631ba86d4fa7d3264c9fbafb.mockapi.io/cart');
      let favResponse = await axios.get('https://631dae3c789612cd07ae84f9.mockapi.io/fav');
      setIsLoading(false)
      let itemResponse = await axios.get('https://631a0f198e51a64d2bf4a54b.mockapi.io/sneakers');
      
      setCartItems(cartResponse.data);
      setFavorites(favResponse.data);
      setItems(itemResponse.data);
      
    }   
    fetchData(); 
  
}, [])
  const onAddToCart = async (obj) => {
    const find = cartItems.find(item =>Number(item.parentID) === Number(obj.id));
    console.log(obj)
    try {
      if(find){
        setCartItems(prev => prev.filter(item => Number(item.parentID) !== Number(obj.id)))
        axios.delete(`https://631ba86d4fa7d3264c9fbafb.mockapi.io/cart/${Number(find.id)}`)
      }else{
        const {data} = await axios.post('https://631ba86d4fa7d3264c9fbafb.mockapi.io/cart', obj);
        setCartItems((prev) => [...prev, data])
      }
    } catch (error) {
      alert('Error')
    }
    
    
  };
  const isItemAdded = (id) => {
    return cartItems.some(obj => Number(obj.parentID) === Number(id));
  }
const onRemoveItemCart = (id) => {
  axios.delete(`https://631ba86d4fa7d3264c9fbafb.mockapi.io/cart/${id}`);
  setCartItems((prev) => prev.filter((item) => item.id !== id));
}
const onFav = async (obj) => {
  if(favorites.find(item => item.id === obj.id)){
    axios.delete(`https://631dae3c789612cd07ae84f9.mockapi.io/fav/${obj.id}`);
    
  }else{
    let {data} = await axios.post('https://631dae3c789612cd07ae84f9.mockapi.io/fav', obj);
    console.log(favorites);
    setFavorites([...favorites, data]);
  }

};

  return (
    <StorageAll.Provider value={{count, setCount, isLoading, cartItems,setCartItems, onFav, onAddToCart,isItemAdded, setCartOpened}}>
    <div className="wrapper clear">

       {cartOpened ? <Drawer onRemove = {(id) => onRemoveItemCart(id)} items = {cartItems} onClose = {() => setCartOpened(false)}/> : null} 

       <Header onClickCart = {() => setCartOpened(true)}/>
      <Routes><Route path='/favorites' exact element={<Favorites onFav={onFav} items = {favorites}/>}></Route>
      <Route path='/account' exact element={<Orders/>}></Route>
      <Route path='/' exact element={<Home isLoading = {isLoading} cartItems={cartItems} searchVal={searchVal} setSearchVal={setSearchVal} items={items} onFav ={onFav} onAddToCart={onAddToCart}/>}> </Route></Routes>
    </div>
    </StorageAll.Provider>
  );
}

export default App;
