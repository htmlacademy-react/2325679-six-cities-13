import { SortingOption, SortingType } from './types/sorting';

export const Parameters = {
  OffersCount: 5
};

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

export const URL_MARKER_DEFAULT = 'https://assets.htmlacademy.ru/content/intensive/javascript-1/demo/interactive-map/pin.svg';

export const URL_MARKER_CURRENT = 'https://assets.htmlacademy.ru/content/intensive/javascript-1/demo/interactive-map/main-pin.svg';

export const CITIES = ['Paris', 'Cologne', 'Brussels', 'Amsterdam', 'Hamburg', 'Dusseldorf'];

export const SORT_OPTIONS: SortingOption[] = [
  { type: 'popular', title: 'Popular'},
  { type: 'priceRaise', title: 'Price: low to high'},
  { type: 'priceFall', title: 'Price: hign to low'},
  { type: 'top', title: 'Top rated first'},
];

export const DEFAULT_SORTING_TYPE : SortingType = SORT_OPTIONS[0].type;

export enum APIRoute {
  Offers = '/offers'
}

export const TIMEOUT_SHOW_ERROR = 2000;
