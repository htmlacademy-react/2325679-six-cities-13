import React, { FormEventHandler } from 'react';
import { ChangeEvent, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { postNewCommentAction } from '../../store/api-actions';
import { getStatusComment } from '../../store/offers-data/offers-data.selectors';
import { StatusComment } from '../../constants';

const ratingData = [
  { value: 5, title: 'perfect' },
  { value: 4, title: 'good' },
  { value: 3, title: 'not bad' },
  { value: 2, title: 'badly' },
  { value: 1, title: 'terribly' }
];

type ReviewFormProps = {
  id: string;
};

function ReviewForm({ id }: ReviewFormProps): JSX.Element {
  const dispatch = useAppDispatch();
  const statusComment = useAppSelector(getStatusComment);

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

  const canSubmit = review.comment.length >= 50 && review.comment.length <= 300 && review.rating > 0;

  const handleReviewFormSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    dispatch(postNewCommentAction({
      offerId: id,
      rating: review.rating,
      comment: review.comment,
      onSuccess: () => {
        setUserReview({
          rating: 0,
          comment: ''
        });
      }
    }));
  };

  return (
    <form className="reviews__form form" method="post" onSubmit={handleReviewFormSubmit}>
      <fieldset disabled={statusComment === StatusComment.Loading} style={{ border: '0px solid white' }}>
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
                checked={Number(rating.value) === Number(review.rating)}
                id={`${rating.value}-stars`}
                type="radio"
                onChange={handleRatingChange}
                disabled={statusComment === StatusComment.Loading}
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
          ))}
        </div>
        <textarea
          className="reviews__textarea form__textarea"
          id="review"
          name="review"
          placeholder="Tell how was your stay, what you like and what can be improved"
          disabled={statusComment === StatusComment.Loading}
          onChange={handleCommentChange}
          value={review.comment}
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
            disabled={!canSubmit || statusComment === StatusComment.Loading}
          >
            Submit
          </button>
        </div>
      </fieldset>
    </form>
  );
}

export default ReviewForm;
