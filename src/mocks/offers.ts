import {Offer} from '../types/offer';

export const offers: Offer[] = [
  {
    id: '3eaac62f-443f-4b0e-9cdf-8e1f1f7e90a7',
    title: 'The Pondhouse - A Magical Place',
    type: 'hotel',
    price: 142,
    previewImage: 'https://13.design.pages.academy/static/hotel/12.jpg',
    city: {
      name: 'Paris',
      location: {
        latitude: 48.85661,
        longitude: 2.351499,
        zoom: 13
      }
    },
    location: {
      latitude: 48.87561,
      longitude: 2.375499,
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
      name: 'London',
      location: {
        latitude: 48.85661,
        longitude: 2.351499,
        zoom: 13
      }
    },
    location: {
      latitude: 48.858610000000006,
      longitude: 2.330499,
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
      name: 'Rome',
      location: {
        latitude: 48.85661,
        longitude: 2.351499,
        zoom: 13
      }
    },
    location: {
      latitude: 48.834610000000005,
      longitude: 2.335499,
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
      name: 'Moscow',
      location: {
        latitude: 48.85661,
        longitude: 2.351499,
        zoom: 13
      }
    },
    location: {
      latitude: 48.85761,
      longitude: 2.358499,
      zoom: 16
    },
    isFavorite: false,
    isPremium: true,
    rating: 2.9
  },
];
