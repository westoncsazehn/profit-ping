// 3rd party
import React from 'react';
import ReactDOM from 'react-dom';
import { AppPageRx } from './App';
import { applyMiddleware, combineReducers, createStore } from 'redux';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import { all, fork } from 'redux-saga/effects';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
// local
import { portfolioReducer, userReducer, loadingReducer } from './store';
import portfolioSagas from './store/portfolio/saga';
import userSagas from './store/user/saga';
import addCoinSagas from './store/add-coin/saga';

// combine all reducers
const rootReducer = combineReducers({
  user: userReducer,
  portfolio: portfolioReducer,
  loader: loadingReducer
});

// combine all sagas
function* rootSaga() {
  yield all([fork(userSagas), fork(portfolioSagas), fork(addCoinSagas)]);
}

// init store with saga/reducers
const sagaMiddleware = createSagaMiddleware();
const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(rootSaga);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <AppPageRx />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
