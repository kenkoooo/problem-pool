import { HashRouter, Route, Switch } from "react-router-dom";
import NavigationBar from "../components/NavigationBar";
import * as React from "react";
import { Container } from "reactstrap";
import SettingsPage from "./SettingsPage";
import TodoPage from "./TodoPage";
import LoginPage from "./LoginPage";

const App = () => (
  <HashRouter>
    <NavigationBar />
    <Container>
      <Switch>
        <Route>
          <Route exact path="/" component={TodoPage} />
          <Route exact path="/settings" component={SettingsPage} />
          <Route exact path="/login" component={LoginPage} />
        </Route>
      </Switch>
    </Container>
  </HashRouter>
);

export default App;
