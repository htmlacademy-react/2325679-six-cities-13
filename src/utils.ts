import { Offer } from './types/offer';
import { Review } from './types/review';

function sortPriceUp(offerA: Offer, offerB: Offer): number {
  return offerA.price - offerB.price;
}

function sortPriceDown(offerA: Offer, offerB: Offer): number {
  return offerB.price - offerA.price;
}

function sortRate(offerA: Offer, offerB: Offer): number {
  return offerB.rating - offerA.rating;
}

function sortReviews(reviewA: Review, reviewB: Review): number {
  const reviewDateA = new Date(reviewA.date);
  const reviewDateB = new Date(reviewB.date);
  return reviewDateB.getTime() - reviewDateA.getTime();
}

function capitalizeString(string: string) : string {
  return string && string[0].toUpperCase() + string.slice(1);
}

function sortOffers(offers: Offer[], sortingType: string) {
  switch (sortingType) {
    case 'popular': return offers.slice();
    case 'priceRaise': return offers.slice().sort(sortPriceUp);
    case 'priceFall': return offers.slice().sort(sortPriceDown);
    case 'top': return offers.slice().sort(sortRate);
  }
}

export { sortPriceUp, sortPriceDown, sortRate, sortReviews, capitalizeString, sortOffers };
