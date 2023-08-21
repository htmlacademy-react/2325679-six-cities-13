import {store} from '../store';
import {setError, setErrorOfferData} from '../store/action';
import {clearErrorAction} from '../store/api-actions';

export const processErrorHandle = (message: string): void => {
  store.dispatch(setErrorOfferData(true));
  store.dispatch(setError(message));
  store.dispatch(clearErrorAction());
};
