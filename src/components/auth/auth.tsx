import { useAppSelector, useAppDispatch } from '../../hooks';
import { AppRoute, AuthorizationStatus } from '../../constants';
import { logoutAction } from '../../store/api-actions';
import { Link } from 'react-router-dom';
import { MouseEventHandler, useCallback } from 'react';
import { getAuthorizationStatus, getUserData } from '../../store/auth-process/auth-process.selectors';
import { getFavoritesOffers } from '../../store/offers-data/offers-data.selectors';

function Auth(): JSX.Element {
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const authorizationStatusAuth = authorizationStatus === AuthorizationStatus.Auth;
  const userData = useAppSelector(getUserData);
  const favoritesOffers = useAppSelector(getFavoritesOffers);
  const dispatch = useAppDispatch();

  const handleLogout: MouseEventHandler<HTMLAnchorElement> = useCallback((event) => {
    event.preventDefault();
    dispatch(logoutAction());
  }, [dispatch]);

  return (
    <nav className="header__nav">
      <ul className="header__nav-list">
        {!authorizationStatusAuth &&
          <li className="header__nav-item">
            <Link className="header__nav-link header__nav-link--profile" to={AppRoute.Login}>
              <div className="header__avatar-wrapper user__avatar-wrapper"></div>
              <span className="header__login">Sign in</span>
            </Link>
          </li>}
        {authorizationStatusAuth &&
          <>
            <li className="header__nav-item user">
              <Link
                className="header__nav-link header__nav-link--profile"
                to={AppRoute.Favorites}
              >
                <div className="header__avatar-wrapper user__avatar-wrapper">
                  <img src={userData.avatarUrl} alt={userData.email} />
                </div>
                <span className="header__user-name user__name">
                  {userData.email}
                </span >
                <span className="header__favorite-count">{favoritesOffers.length}</span>
              </Link>
            </li>
            <li className="header__nav-item">
              <Link
                className="header__nav-link"
                onClick={handleLogout}
                to={AppRoute.Main}
              >
                <span className="header__signout">Sign out</span>
              </Link>
            </li>
          </>}
      </ul>
    </nav >
  );
}

export default Auth;
