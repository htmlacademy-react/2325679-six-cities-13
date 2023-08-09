export type SortingType = 'popular' | 'priceRaise' | 'priceFall' | 'top';

export type SortingOption = {
  type: SortingType;
  title: string;
};
