import Card from '../components/Card'
import React from 'react'; 
import { StorageAll } from '../App';

export default function Home({items, searchVal, setSearchVal, onFav, onAddToCart}){

  const {isItemAdded, isLoading, cartItems} = React.useContext(StorageAll);
  const renderItem = () => {
    
    return (isLoading ? [...Array(8)] : items.filter(item => item.title.toLowerCase().includes(searchVal.toLowerCase())) ).map((item, index) => 
         (<Card  key={index} onFavorite={(obj) => onFav(obj)} onPlus={(obj) => onAddToCart(obj)} {...item}/>))
  };
    return(<div className="content p-40">
    <div className=" justify-between align-center mb-40 d-flex">
    <h1 >{searchVal ? `Поиск по запросу: "${searchVal}"`: 'Все кроссовки'}</h1>
    <div className="search-block ">
      <img src="icons/search.svg" alt="search"/>
      <img className="clearSearch" src="icons/btn.svg" onClick={() => setSearchVal('')} alt="btn"/>
      <input onChange={event => setSearchVal(event.target.value)} value={searchVal} placeholder="Поиск..."></input>
    </div>
    </div>
  

    <div className="sneakers flex-wrap d-flex ">
  
      {renderItem()}

    
    </div>

  </div>);
}