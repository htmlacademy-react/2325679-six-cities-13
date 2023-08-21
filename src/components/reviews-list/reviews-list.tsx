
import { Review } from '../../types/review';
import { sortReviews } from '../../utils';
import ReviewItem from '../review-item/review-item';

type ReviewsListProps = {
  reviews: Review[];
};

function ReviewsList({reviews}: ReviewsListProps): JSX.Element {
  const currentReviews = reviews.slice().sort(sortReviews).slice(0, 10);
  return (
    <>
      <h2 className="reviews__title">
        Reviews · <span className="reviews__amount">{currentReviews.length}</span>
      </h2>
      <ul className="reviews__list">
        {currentReviews.map((review) => (
          <ReviewItem key={review.id} review={review} />
        ))}
      </ul>
    </>
  );
}

export default ReviewsList;
