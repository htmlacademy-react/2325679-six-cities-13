import React from 'react';
import { ChangeEvent, useState } from 'react';

function ReviewForm(): JSX.Element {
  const [review, setUserReview] = useState({
    rating: 0,
    comment: ''
  });

  const handleRatingChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    const value = Number(target.value);
    setUserReview({
      ...review,
      rating: value
    });
  };

  const handleCommentChange = ({ target }: ChangeEvent<HTMLTextAreaElement>) => {
    const value = target.value;
    setUserReview({
      ...review,
      comment: value
    });
  };

  const ratingData = [
    {
      value: 5,
      title: 'perfect'
    },
    {
      value: 4,
      title: 'good'
    },
    {
      value: 3,
      title: 'not bad'
    },
    {
      value: 2,
      title: 'badly'
    },
    {
      value: 1,
      title: 'terribly'
    }
  ];

  return (
    <form className="reviews__form form" action="#" method="post">
      <label className="reviews__label form__label" htmlFor="review">
        Your review
      </label>
      <div className="reviews__rating-form form__rating">
        {ratingData.map((rating) => (
          <React.Fragment key={rating.title}>
            <input
              className="form__rating-input visually-hidden"
              name="rating"
              defaultValue={rating.value}
              id={`${rating.value}-stars`}
              type="radio"
              onChange={handleRatingChange}
            />
            <label
              htmlFor={`${rating.value}-stars`}
              className="reviews__rating-label form__rating-label"
              title={rating.title}
            >
              <svg className="form__star-image" width={37} height={33}>
                <use xlinkHref="#icon-star" />
              </svg>
            </label>
          </React.Fragment>
        ))};
      </div>
      <textarea
        className="reviews__textarea form__textarea"
        id="review"
        name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
        defaultValue={''}
        onChange={handleCommentChange}
      />
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set{' '}
          <span className="reviews__star">rating</span> and describe
          your stay with at least{' '}
          <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button
          className="reviews__submit form__submit button"
          type="submit"
        >
          Submit
        </button>
      </div>
    </form>
  );
}

export default ReviewForm;
