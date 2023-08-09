export type SortingType = 'popular' | 'priceRaise' | 'priceFall' | 'top';

export type Sorting = {
  type: SortingType;
  title: string;
};
