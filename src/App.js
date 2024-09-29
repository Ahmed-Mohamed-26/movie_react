import logo from "./logo.svg";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./pages/home";
import LoginPage from "./pages/login";
import Register from "./pages/register";
import MyNavbar from "./componants/navbar";
import Details from "./pages/details";
import Favorites from "./pages/favorites";
import { LangChange } from "./context/context";
import { useState } from "react";
import PrivateRoute from "./componants/PrivateRoute.js"; // استيراد PrivateRoute

function App() {
  const [lang, setlang] = useState("EN");

  return (
    <BrowserRouter>
      <LangChange.Provider value={{ lang, setlang }}>
        <MyNavbar />
        <Switch className="bg-color">
          <Route path="/" component={LoginPage} exact />
          <PrivateRoute path="/home" component={Home} exact />{" "}
          <Route path="/register" component={Register} exact />
          <PrivateRoute path="/details/:id" component={Details} exact />
          <PrivateRoute path="/favorites" component={Favorites} exact />
        </Switch>
      </LangChange.Provider>
    </BrowserRouter>
  );
}

export default App;
