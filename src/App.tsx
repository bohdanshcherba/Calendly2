import React from 'react';

import { Home } from './screens/Home';
import { Provider } from 'react-redux';
import store from './store/store';
import { StatusBar } from 'react-native';

function App(): JSX.Element {
  return (
    <Provider store={store}>
      <StatusBar
        animated={true}
        backgroundColor="#ffffff"
        barStyle="dark-content"
      />
      <Home />
    </Provider>
  );
}

export default App;
