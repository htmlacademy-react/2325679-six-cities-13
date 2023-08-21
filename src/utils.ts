import { Offer } from './types/offer';
import { Review } from './types/review';

function sortPriceUp(offerA : Offer, offerB : Offer) : number{
  return offerA.price - offerB.price;
}

function sortPriceDown(offerA : Offer, offerB : Offer) : number{
  return offerB.price - offerA.price;
}

function sortRate(offerA : Offer, offerB : Offer) : number{
  return offerB.rating - offerA.rating;
}

function sortReviews(reviewA : Review, reviewB : Review) : number{
  const reviewDateA = new Date(reviewA.date);
  const reviewDateB = new Date(reviewB.date);
  return reviewDateB.getTime() - reviewDateA.getTime();
}


export {sortPriceUp, sortPriceDown, sortRate, sortReviews};
