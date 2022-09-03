import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import Home from "./components/Home";
import PokeCreate from "./components/PokeCreate";
import PokeDetails from "./components/PokeDetails";
import PokeUpdate from "./components/PokeUpdate";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path={"/"} component={LandingPage} />
          <Route path={"/home"} component={Home} />
          <Route path={"/pokeCreate"} component={PokeCreate} />
          <Route path={"/pokeDetails/:id"} component={PokeDetails} />
          <Route path={"/pokeUpdate/:id"} component={PokeUpdate} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
