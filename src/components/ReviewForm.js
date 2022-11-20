import { useState } from "react";

function ReviewForm(props) {
  const { addReview } = props;
  const [review, setReview] = useState({ name: "", message: "", rating: "", recommend: "" });

  const submitForm = (e) => {
    e.preventDefault();
    addReview(review);

    setReview({ name: "", message: "", rating: "", recommend: "" });
  };

  const fillName = (e) => {
    setReview((previousState) => ({ ...previousState, name: e.target.value }));
  };

  const fillMessage = (e) => {
    setReview((previousState) => ({ ...previousState, message: e.target.value }));
  };

  const fillRating = (e) => {
    setReview((previousState) => ({ ...previousState, rating: e.target.value }));
  };

  const fillRecommend = (e) => {
    setReview((previousState) => ({ ...previousState, recommend: e.target.value }));
  };

  const isEmpty = () => {
    return !review.name || !review.message || !review.rating || !review.recommend;
  };

  return (
    <form className="review-form" onSubmit={submitForm}>
      <h3>Leave a review</h3>
      <label htmlFor="name">Name:</label>
      <input type="text" id="name" value={review.name} onChange={fillName} />

      <label htmlFor="message">Review:</label>
      <textarea name="message" id="message" cols="30" rows="10" value={review.message} onChange={fillMessage}></textarea>

      <label htmlFor="rating">Rating:</label>
      <select name="rating" id="rating" value={review.rating} onChange={fillRating}>
        <option value=""></option>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
      </select>

      <label htmlFor="recommend">Do you recommend this product?</label>
      <select name="recommend" id="recommend" value={review.recommend} onChange={fillRecommend}>
        <option value=""></option>
        <option value="yes">Yes</option>
        <option value="no">No</option>
      </select>

      <button type="submit" className={`button ${isEmpty() ? "disabled-button" : ""}`} disabled={isEmpty()}>
        Submit
      </button>
    </form>
  );
}

export default ReviewForm;
