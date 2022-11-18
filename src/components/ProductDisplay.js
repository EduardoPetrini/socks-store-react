import { useEffect, useState } from "react";
import ProductDetails from "./ProductDetails";

function getProduct() {
  return {
    name: "Socks",
    brand: "React",
    description: "This is the description",
    inStock: true,
    selectedVariant: 0,
    onSale: false,
    details: ["50% cotton", "30% wool", "20% polyester"],
    variants: [
      { id: 1, color: "green", image: "assets/images/socks_green.jpg", quantity: 12 },
      { id: 2, color: "blue", image: "assets/images/socks_blue.jpg", quantity: 0 },
    ],
    sizes: [
      { id: 2, size: 38, out: true },
      { id: 1, size: 40 },
      { id: 2, size: 42 },
    ],
    reviews: [],
  };
}

const getInStock = (quantity) => {
  if (quantity > 10) {
    return <p>In Stock</p>;
  }

  if (quantity > 0) {
    return <p>Almost sold out </p>;
  }

  return <p>Out of stock</p>;
};

function ProductDisplay(props) {
  const { premium, cartSize, addToCart, removeFromCart } = props;

  const [product, setProduct] = useState(() => getProduct());
  const [image, setImage] = useState(() => product.variants[product.selectedVariant].image);
  const [inStockText, setInStockText] = useState(() => getInStock(product.variants[product.selectedVariant].quantity));
  const [inStock, setInStock] = useState(() => !!product.variants[product.selectedVariant].quantity);

  useEffect(() => {
    console.log('Product changed...');
    setInStockText((previousState) => getInStock(product.variants[product.selectedVariant].quantity));
    setInStock((previousState) => !!product.variants[product.selectedVariant].quantity);
  }, [product]);

  const title = `${product.brand} ${product.name}`;
  const onSale = product.onSale ? <p>On Sale</p> : "";

  // const inStockText = getInStock(product.variants[product.selectedVariant].quantity);
  // const inStock = !!product.variants[product.selectedVariant].quantity

  const shipping = premium ? "free" : 2.99;

  const selectVariant = (index) => {
    console.log('Select variant...');
    setProduct((previousState) => ({ ...previousState, selectedVariant: index }))
    setImage((previousState) => product.variants[index].image);
  };

  const clickAddToCart= ()=>{
    addToCart(product.variants[product.selectedVariant]);
    product.variants[product.selectedVariant].quantity -= 1;
    setProduct((previousState) => ({ ...previousState, ...product }));
  }

  const clickRemoveFromCart= ()=>{
    removeFromCart(product.variants[product.selectedVariant].id);
    product.variants[product.selectedVariant].quantity += 1;
    setProduct((previousState) => ({ ...previousState, ...product }));
  }

  return (
    <div className="product-display">
      <div className="product-container">
        <div className="product-image">
          <img src={image} alt="product icon" />
        </div>
        <div className="product-info">
          <h1>{title}</h1>
          <p>{product.description}</p>
          {onSale}
          {inStockText}
          <p>Shipping {shipping}</p>

          <ProductDetails details={product.details}></ProductDetails>

          {product.variants.map((variant, index) => (
            <div key={index} onMouseOver={() => selectVariant(index)} className="color-circle" style={{ backgroundColor: variant.color }}></div>
          ))}

          {product.sizes.map((size, index) =>
            <div key={index} className={`${size.out ? "class-disabled" : ""}`}>{size.size}</div>
          )}

          <button className={`button ${inStock ? "" : "disabled-button"}`} onClick={clickAddToCart} disabled={!inStock}>Add to Cart</button>
          <button className={`button ${cartSize === 0 ? "disabled-button" : ""}`} onClick={clickRemoveFromCart} disabled={cartSize === 0}>Remove from Cart</button>
        </div>
      </div>
    </div>
  );
}

export default ProductDisplay;
