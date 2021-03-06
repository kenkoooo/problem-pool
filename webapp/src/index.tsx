import React from "react";
import ReactDOM from "react-dom";
import App from "./pages/App";
import "bootstrap/dist/css/bootstrap.min.css";
import { Provider } from "react-redux";
import rootSaga from "./sagas";
import createSagaMiddleware from "redux-saga";
import { applyMiddleware, compose, createStore } from "redux";
import rootReducer from "./reducers";

const sagaMiddleware = createSagaMiddleware();
const store = createStore(
  rootReducer,
  compose(applyMiddleware(sagaMiddleware))
);
sagaMiddleware.run(rootSaga);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
