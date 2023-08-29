import Logo from '../../components/logo/logo';
import {useRef, FormEventHandler} from 'react';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {loginAction} from '../../store/api-actions';
import { getAuthorizationStatus } from '../../store/auth-process/auth-process.selectors';
import { AppRoute, AuthorizationStatus } from '../../constants';
import { redirectToRoute } from '../../store/action';
import { useEffect, useState } from 'react';

function LoginPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const loginRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const regexPassword = /^(?=.*\d)(?=.*[a-z])\S*$/i;
  const regexLogin = /^(([^<>()\\[\]\\.,;:\s@"]+(\.[^<>()\\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i;
  const [isCorrectLogin, setIsCorrectLogin] = useState(true);
  const [isCorrectPassword, setIsCorrectPassword] = useState(true);

  useEffect(() => {
    if (authorizationStatus === AuthorizationStatus.Auth) {
      dispatch(redirectToRoute(AppRoute.Main));
    }
  }, [authorizationStatus, dispatch]);

  const handleSubmit : FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    setIsCorrectLogin(true);
    setIsCorrectPassword(true);

    if (loginRef.current && passwordRef.current) {

      if (!regexLogin.test(loginRef.current.value)) {
        setIsCorrectLogin(false);
        return;
      }

      if (!regexPassword.test(passwordRef.current.value)) {
        setIsCorrectPassword(false);
        return;
      }

      dispatch(loginAction({
        email: loginRef.current.value,
        password: passwordRef.current.value
      }));
    }
  };

  return (
    <div className="page page--gray page--login">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Logo />
            </div>
          </div>
        </div>
      </header>
      <main className="page__main page__main--login">
        <div className="page__login-container container">
          <section className="login">
            <h1 className="login__title">Sign in</h1>
            <form className="login__form form" action="" onSubmit={handleSubmit}>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">E-mail</label>
                <input
                  ref={loginRef}
                  className="login__input form__input"
                  type="email"
                  name="email"
                  placeholder="Email"
                />
                {!isCorrectLogin && <p>Enter a valid email</p>}
              </div>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">Password</label>
                <input
                  ref={passwordRef}
                  className="login__input form__input"
                  type="password"
                  name="password"
                  placeholder="Password"
                />
                {!isCorrectPassword &&
                  <p>Password must contain at least one letter, one capital letter and one number
                  </p>}
              </div>
              <button className="login__submit form__submit button" type="submit">
                Sign in
              </button>
            </form>
          </section>
          <section className="locations locations--login locations--current">
            <div className="locations__item">
              <a className="locations__item-link" href="#">
                <span>Amsterdam</span>
              </a>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default LoginPage;
