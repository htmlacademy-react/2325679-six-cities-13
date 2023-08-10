import { MouseEventHandler, useState } from 'react';
import { SORT_OPTIONS } from '../../constants';
import { useAppSelector } from '../../hooks';
import { useAppDispatch } from '../../hooks/index';
import { sortOffers } from '../../store/action';
import { SortingType } from '../../types/sorting';
import { State } from '../../types/state';

function Sorting(): JSX.Element {
  const dispatch = useAppDispatch();
  const [isShow, setClickSort] = useState(false);
  const selectedSortingType = useAppSelector((store: State) => store.currentSortingType);

  const handleSortClick: MouseEventHandler<HTMLSpanElement> = () => {
    setClickSort(!isShow);
  };

  const handleSortOptionClick: MouseEventHandler<HTMLLIElement> = (event) => {
    dispatch(sortOffers({ sortingType: event.currentTarget.id as SortingType}));
    setClickSort(false);
  };

  const ulClassName = `places__options places__options--custom ${isShow ? 'places__options--opened' : ''}`;
  const currentSortingOption = SORT_OPTIONS.find((option) => option.type === selectedSortingType) || SORT_OPTIONS[0];

  return (
    <div className="places__sorting">
      <span className="places__sorting-caption">Sort by&nbsp;</span>
      <span className="places__sorting-type" tabIndex={0} onClick={handleSortClick}>
        {currentSortingOption.title}
        <svg className="places__sorting-arrow" width={7} height={4}>
          <use xlinkHref="#icon-arrow-select" />
        </svg>
      </span>
      <ul className={ulClassName}>
        {SORT_OPTIONS.map((option) => (
          <li key={option.type}
            id={option.type}
            onClick={handleSortOptionClick}
            className={`places__option ${selectedSortingType === option.type ? 'places__option--active' : ''}`}
            tabIndex={0}
          >
            {option.title}
          </li>))}
      </ul>
    </div>
  );
}

export default Sorting;
