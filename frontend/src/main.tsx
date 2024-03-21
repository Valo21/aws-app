import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { router } from './routes.tsx';
import './theme.scss';
import 'primereact/resources/themes/lara-light-blue/theme.css';
import './index.scss';
import { Provider } from 'react-redux';
import { store } from './store';

const root: HTMLElement | null = document.getElementById('root');

if (root) {
  ReactDOM.createRoot(root).render(
    <React.StrictMode>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </React.StrictMode>,
  );
}
