import ReactDOM from 'react-dom';
import {AppContainer} from 'react-hot-loader';
import Router from 'react-router/lib/Router';
import browserHistory from 'react-router/lib/browserHistory';
import createStore from 'redux/lib/createStore';
import combineReducers from 'redux/lib/combineReducers';
import {Provider} from 'react-redux';
import * as reducers from './reducers';
import { Route, Switch, BrowserRouter } from 'react-router-dom'
// import DefaultPage from './components/Index'
// import Login from './components/Login'
import routers from './components'
console.log(routers)


const reducer = combineReducers({
  ...reducers
});

export const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()   // eslint-disable-line
);

ReactDOM.render(
  <AppContainer>
    <Provider store={store}>
    <BrowserRouter>
      <Switch>
        {
          routers.map((item, index) => {
            return(
              <Route exact={true} path={item.path} component={item.component} key={index} />
            )
          })
        }
      </Switch>
      </BrowserRouter>
    </Provider>
  </AppContainer>,
  document.getElementById('approot')
);

if (process.env.NODE_ENV === 'dev') {
  /* eslint-disable */
  if (module.hot) {
    module.hot.accept();
  }
}