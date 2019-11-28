import React, {useContext, useEffect, useState} from 'react';
import './Restaurant.css';
import api from '../services/api';

export default function Restaurant ({match}) {
  
  return (
    <CartProvider>
      <div>
        <Cart />
        <MealList id={match.params.id}/>
      </div>
    </CartProvider>
  )

}

const Cart = () => {
  const [cart] = useContext(CartContext);
  const totalPrice = cart.reduce((acc, curr) => acc + curr.price, 0);
  const order = [...cart.reduce( (acc, curr) => {
    if (!acc.has(curr.id)) acc.set(curr.id, { ...curr, count: 0 });
    acc.get(curr.id).count++;
    return acc;
}, new Map).values()];

  async function submitOrder () {
    const response = await api.post('/order', {
      order, totalPrice
    }); 
  }

  return (
    <div>
      <span>Itens no carrinho: {cart.length}</span>
      <br />
      <span>Preço Total : {totalPrice}</span>
      <button onClick={ submitOrder }>Enviar pedido</button>
    </div>
  )
}

const CartContext = React.createContext();

const CartProvider = (props) => {
  const [cart, setCart] = useState([]);
  return (
    <CartContext.Provider value={[cart, setCart]}>
      {props.children}
    </CartContext.Provider>
  )
}

const Meal = (props) => {
  const [cart, setCart] = useContext(CartContext);

  const addToCart = () => {
    const meal = { name: props.name, price: props.price, id: props.id };
    setCart(currentState => [...currentState, meal]);
  }

  

  return (
    <div>
      <h2>{props.name}</h2>
      <h4>{props.price}</h4>
      <button onClick={addToCart}>Add to cart</button>
      <hr />
    </div>
  )
}

const MealList = (props) => {
  const [meals, setMeals] = useState([]);

  useEffect(() => {
    async function loadMeals() {
      const response = await api.get(`/meals/${props.id}`);

      setMeals(response.data);
    }

    loadMeals();
  }, []);

  return (
    <div>
      {
        meals.map(item => (
          <Meal name={item.name} price={item.price} key={item.id} id={item.id} />
        ))
      }
    </div>
  )
}
