import MainPage from '../../pages/main/main';

type AppScreenProps = {
  offersCount: number;
}

function App({offersCount} : AppScreenProps): JSX.Element {
  return (
    <MainPage offersCount = {offersCount}/>
  );
}

export default App;
