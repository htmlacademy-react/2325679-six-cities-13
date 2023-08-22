import {store} from '../store';
import {setError, setErrorOfferData, setOffersDataLoadingStatus} from '../store/action';
import {clearErrorAction} from '../store/api-actions';

export const processErrorHandle = (message: string): void => {
  store.dispatch(setOffersDataLoadingStatus(false));
  store.dispatch(setErrorOfferData(true));
  store.dispatch(setError(message));
  store.dispatch(clearErrorAction());
};
