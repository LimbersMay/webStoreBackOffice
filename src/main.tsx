import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";
import {store} from "./apps/webStoreBackOffice";
import NiceModal from "@ebay/nice-modal-react";

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <Provider store={store}>
            <NiceModal.Provider>

                <BrowserRouter>
                    <App/>
                </BrowserRouter>
            </NiceModal.Provider>
        </Provider>
    </React.StrictMode>,
)
