
import { Review } from '../../types/review';
import ReviewItem from '../review-item/review-item';

type ReviewListProps = {
  reviews: Review[];
}

function ReviewsList({ reviews }: ReviewListProps): JSX.Element {
  return (
    <>
      <h2 className="reviews__title">
        Reviews · <span className="reviews__amount">{reviews.length}</span>
      </h2>
      <ul className="reviews__list">
        {reviews.map((review) => (
          <ReviewItem key={review.id} review={review} />
        ))}
      </ul>
    </>
  );
}

export default ReviewsList;
