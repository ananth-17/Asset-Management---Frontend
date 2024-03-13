
import { Provider } from 'react-redux';
import './App.css';

import Router from './routes';
import { store } from './store';
import { MsalProvider } from '@azure/msal-react';


function App(props : any) {
  const { msalInstance } = props;
  
  return (
    <>
      <MsalProvider instance={msalInstance}>
        <Provider store={store}>
          <Router/>
        </Provider>
      </MsalProvider>
    </>
  );
}

export default App;
