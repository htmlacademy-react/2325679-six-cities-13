import { Link } from 'react-router-dom';
import Logo from '../../components/logo/logo';
import { useAppDispatch } from '../../hooks';
import { setErrorOffer } from '../../store/offers-data/offers-data.slice';
import { AppRoute } from '../../constants';
import Auth from '../../components/auth/auth';

function Page404(): JSX.Element {
  const dispatch = useAppDispatch();
  const handleLinkClick = () => {
    dispatch(setErrorOffer());
  };

  return (
    <div className="page page--gray page--login">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Logo />
            </div>
            <Auth />
          </div>
        </div>
      </header>
      <main className="page__main page__main--login">
        <div className="page__login-container container">
          <section className="login" style={{ paddingTop: 0 }}>
            <div className="cities__status-wrapper tabs__content">
              <b className="cities__status">404 page not found</b>
              <p className="cities__status-description">We could not find such a page<br /><br /></p>
              <Link to={AppRoute.Main} className="login__submit form__submit button" type="button" onClick={handleLinkClick}>На главную страницу</Link>
            </div>
          </section>
          <section className="locations locations--login locations--current">
            <div className="locations__item">
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default Page404;
