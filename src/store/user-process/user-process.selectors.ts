import { NameSpace } from '../../constants';
import { State } from '../../types/state';

export const getSelectedOfferId = (state: State): string => state[NameSpace.UserProcess].selectedOfferId;
