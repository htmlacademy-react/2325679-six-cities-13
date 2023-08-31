import { SortingOption, SortingType } from './types/sorting';

export enum AppRoute {
  Main = '/',
  Login = '/login',
  Favorites = '/favorites',
  Offer = '/offer',
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

export const TILE_LAYER = 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png';

export const COPYRIGHT = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>';

export const URL_MARKER_DEFAULT = 'markup/img/pin.svg';

export const URL_MARKER_CURRENT = 'markup/img/pin-active.svg';

export const CITIES = ['Paris', 'Cologne', 'Brussels', 'Amsterdam', 'Hamburg', 'Dusseldorf'];

export const SORT_OPTIONS: SortingOption[] = [
  { type: 'popular', title: 'Popular'},
  { type: 'priceRaise', title: 'Price: low to high'},
  { type: 'priceFall', title: 'Price: high to low'},
  { type: 'top', title: 'Top rated first'},
];

export const DEFAULT_SORTING_TYPE : SortingType = SORT_OPTIONS[0].type;

export enum APIRoute {
  Offers = '/offers',
  Login = '/login',
  Logout = '/logout',
  Favorite = '/favorite'
}

export enum SliceNames {
  Map = 'Map',
  Data = 'Data',
  Auth = 'Auth'
}

export enum StatusComment {
  Idle = 'idle',
  Loading = 'loading',
  Success = 'success',
  Error = 'error',
}

export const IMAGE_COUNT = 6;

export enum CommentLengthLimit {
  Minimum = 50,
  Maximum = 300
}

export const REVIEWS_COUNT = 10;

export const NEARBY_OFFERS_COUNT = 3;
