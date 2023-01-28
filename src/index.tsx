import './index.scss';

import ReactDOM from 'react-dom/client';
import { Helmet } from 'react-helmet';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import App from './App';
import { setupStore } from './state/store';
import ScrollToTop from './components/ScrollToTop/ScrollToTop';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
const store = setupStore();
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <ScrollToTop />
      <Helmet>
        <title>Character Crisis</title>
      </Helmet>
      <App />
    </BrowserRouter>
  </Provider>
);
