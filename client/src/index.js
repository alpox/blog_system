// ---------------------------------------------------------------------------
// **** Setup React with Redux ****
// ---------------------------------------------------------------------------

import * as React from "react";
import * as ReactDOM from "react-dom";
import { createStore, applyMiddleware } from "redux";
import { Provider } from 'react-redux';
import { AppContainer } from "react-hot-loader";
import { rootEpic, rootReducer } from "./reducer";
import App from "./App";
import { createEpicMiddleware } from 'redux-observable';
import '../semantic/dist/semantic.min.css';

const epicMiddleware = createEpicMiddleware(rootEpic);

const store = applyMiddleware(epicMiddleware)(createStore)(rootReducer, 
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

const rootEl = document.getElementById("root");
ReactDOM.render(
  <AppContainer>
    <Provider store={store}>
      <App />
    </Provider>
  </AppContainer>,
  rootEl
);

// Hot Module Replacement API
if (module.hot) {
  module.hot.accept("./App", () => {
    const NextApp = require("./App").default;
    ReactDOM.render(
      <AppContainer>
        <Provider store={store}>
          <NextApp />
        </Provider>
      </AppContainer>
      ,
      rootEl
    );
  });
}