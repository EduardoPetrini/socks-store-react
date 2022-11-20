function ListReview(props) {
  const { reviews = [] } = props;
  console.log(`List reviews: ${JSON.stringify(reviews)}`);
  return (
    <div className="review-container">
      <h3>Reviews ({reviews.length})</h3>
      <ul>
        {
          reviews.map((review, index) => (
            <li key={index}>
              {review.name} gave this {review.rating} stars
              <br />
              "{review.message}"
              <br />
              Is this product recommended? "{review.recommend}"
            </li>
          ))
        }
      </ul>
    </div>
  )
}

export default ListReview;
