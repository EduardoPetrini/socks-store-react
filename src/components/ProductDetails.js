function ProductDetails(props) {
  const {details} = props;
  return (
    <ul>
      {
        details.map((detail, index)=>
        <li key={index}>{detail}</li>
        )
      }
    </ul>
  )
}

export default ProductDetails;
