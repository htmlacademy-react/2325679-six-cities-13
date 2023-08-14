import { useAppSelector, useAppDispatch } from '../../hooks';
import { AppRoute, AuthorizationStatus } from '../../constants';
import { logoutAction } from '../../store/api-actions';
import { Link } from 'react-router-dom';

function Auth(): JSX.Element {
  const authorizationStatus = useAppSelector((state) => state.authorizationStatus);
  const authorizationStatusAuth = authorizationStatus === AuthorizationStatus.Auth;
  const userData = useAppSelector((state) => state.userData);
  const dispatch = useAppDispatch();

  return (
    <nav className="header__nav">
      <ul className="header__nav-list">
        {!authorizationStatusAuth &&
          <li className="header__nav-item">
            <Link className="header__nav-link" to={AppRoute.Login}>
              <span className="header__signout">Sign in</span>
            </Link>
          </li>}
        {authorizationStatusAuth &&
          <>
            <li className="header__nav-item user">
              <a
                className="header__nav-link header__nav-link--profile"
                href="#"
              >
                <div className="header__avatar-wrapper user__avatar-wrapper"><img src={userData.avatarUrl} alt={userData.email} /></div>
                <Link className="header__user-name user__name" to={AppRoute.Favorites}>
                  {userData.email}
                </Link>
                <span className="header__favorite-count">3</span>
              </a>
            </li>
            <li className="header__nav-item">
              <Link
                className="header__nav-link"
                onClick={(evt) => {
                  evt.preventDefault();
                  dispatch(logoutAction());
                }}
                to='/'
              >
                <span className="header__signout">Sign out</span>
              </Link>
            </li>
          </>}
      </ul>
    </nav>
  );
}

export default Auth;
