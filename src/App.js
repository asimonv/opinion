import React from "react";
import { PersistGate } from "redux-persist/integration/react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { store, persistor } from "./store";

import Home from "./screens/Home";
import Navbar from "./components/Navbar";
import AuthRoute from "./screens/AuthRoute";
import Signin from "./screens/Signin";

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router>
          <div>
            <Navbar />
            <Switch>
              <AuthRoute exact path="/" component={() => <Home />} />
              <Route exact path="/signin" component={() => <Signin />} />
              <Route path="*" component={() => "404 Not found."} />
            </Switch>
          </div>
        </Router>
      </PersistGate>
    </Provider>
  );
}

export default App;
