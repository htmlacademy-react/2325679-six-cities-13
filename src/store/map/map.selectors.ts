import { SliceNames } from '../../constants';
import { State } from '../../types/state';

export const getSelectedOfferId = (state: State): string => state[SliceNames.Map].selectedOfferId;
