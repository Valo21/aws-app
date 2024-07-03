import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import './theme.scss';
import 'primereact/resources/themes/lara-light-blue/theme.css';
import './index.scss';
import App from "./App.tsx";

const root: HTMLElement | null = document.getElementById('root');

if (root) {
  ReactDOM.createRoot(root).render(
    <React.StrictMode>
      <App/>
    </React.StrictMode>,
  );
}
