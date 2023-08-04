import {Offer} from '../types/offer';

export const offers: Offer[] = [
  {
    id: '3eaac62f-443f-4b0e-9cdf-8e1f1f7e90a7',
    title: 'The Pondhouse - A Magical Place',
    type: 'hotel',
    price: 142,
    previewImage: 'https://13.design.pages.academy/static/hotel/12.jpg',
    city: {
      name: 'Amsterdam',
      location: {
        latitude: 52.37544,
        longitude: 4.897976,
        zoom: 13
      }
    },
    location: {
      latitude: 52.3609553943508,
      longitude: 4.88309666406198,
      zoom: 16
    },
    isFavorite: true,
    isPremium: true,
    rating: 3.9
  },
  {
    id: 'd91cee3f-c7d5-4448-8fc6-c50c71a0111f',
    title: 'Canal View Prinsengracht',
    type: 'apartment',
    price: 379,
    previewImage: 'https://13.design.pages.academy/static/hotel/1.jpg',
    city: {
      name: 'Paris',
      location: {
        latitude: 48.85661,
        longitude: 2.351499,
        zoom: 13
      }
    },
    location: {
      latitude: 48.837610000000005,
      longitude: 2.364499,
      zoom: 16
    },
    isFavorite: false,
    isPremium: false,
    rating: 1.8
  },
  {
    id: '84aca0ac-48c2-4161-b519-cb1ec03ab7bc',
    title: 'Loft Studio in the Central Area',
    type: 'apartment',
    price: 194,
    previewImage: 'https://13.design.pages.academy/static/hotel/17.jpg',
    city: {
      name: 'Paris',
      location: {
        latitude: 48.85661,
        longitude: 2.351499,
        zoom: 13
      }
    },
    location: {
      latitude: 48.83961,
      longitude: 2.342499,
      zoom: 16
    },
    isFavorite: true,
    isPremium: false,
    rating: 2.1
  },
  {
    id: '44f55eca-0519-439b-97ff-9cca72fbd47f',
    title: 'Penthouse, 4-5 rooms + 5 balconies',
    type: 'apartment',
    price: 263,
    previewImage: 'https://13.design.pages.academy/static/hotel/14.jpg',
    city: {
      name: 'Hamburg',
      location: {
        latitude: 53.550341,
        longitude: 10.000654,
        zoom: 13
      }
    },
    location: {
      latitude: 53.558341000000006,
      longitude: 9.999654000000001,
      zoom: 16
    },
    isFavorite: false,
    isPremium: true,
    rating: 2.9
  },
];
