import { Offer } from './types/offer';

function sortPriceUp(offerA : Offer, offerB : Offer) : number{
  return offerA.price - offerB.price;
}

function sortPriceDown(offerA : Offer, offerB : Offer) : number{
  return offerB.price - offerA.price;
}

function sortRate(offerA : Offer, offerB : Offer) : number{
  return offerB.rating - offerA.rating;
}


export {sortPriceUp, sortPriceDown, sortRate};
