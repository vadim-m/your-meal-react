import { Container } from "./components/Container/Container";
import { Header } from "./components/Header/Header";

const App = () => {
  return (
    <>
      <Header />
      <main>
        <nav>
          <Container className="navigation__container" />
        </nav>
      </main>
      <footer></footer>
    </>
  );
};

export default App;
