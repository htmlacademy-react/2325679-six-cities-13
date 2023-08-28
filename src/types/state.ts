import { store } from '../store/index';
import { FavoriteOffer, Offer, OfferData } from './offer';
import { Review } from './review';
import { SortingType } from './sorting';
import { UserData } from './user-data';

export type AuthProcess = {
  authorizationStatus: string;
  userData: UserData;
}

export type OffersData = {
  city: string;
  currentSortingType: SortingType;
  offers: Offer[];
  offersByCity: Offer[];
  offerData: OfferData;
  errorOfferData: boolean;
  isOffersDataLoading: boolean;
  isCommentSending: boolean;
  offersNearby: Offer[];
  offerReviews: Review[];
  favoriteOffers: (Offer | FavoriteOffer)[];
  isFavoritesLoading: boolean;
}

export type MapType = {
  selectedOfferId: string;
}

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;


