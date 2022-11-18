import { useState } from "react";
import ProductDisplay from "./components/ProductDisplay";

function App() {
  const [cart, setCart] = useState(() => []);
  const [premium, setPremium] = useState(() => false);
  const [cartSize, setCartSize] = useState(() => 0);

  const addToCart = (item) => {
    console.log('adding...')
    setCart((previousState) => [...previousState, item]);
    setCartSize((previousState) => previousState + 1);
  }

  const removeFromCart = (id) => {
    console.log('removing...')
    setCart((previousState) => {
      const index = previousState.findIndex(item => item.id === id);
      return [...previousState.slice(0, index), ...previousState.slice(index + 1)]
    });
    setCartSize((previousState) => previousState - 1);
  }

  return (
    <div>
      <div className="nav-bar"></div>
      <div className="cart"> Cart({cartSize})</div>
      <ProductDisplay premium={premium} cartSize={cartSize} addToCart={addToCart} removeFromCart={removeFromCart}></ProductDisplay>
    </div>
  );
}

export default App;

