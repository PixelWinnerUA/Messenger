import React, {lazy, Suspense} from 'react';
import ReactDOM from 'react-dom/client';
import {Provider} from "react-redux";
import store from "./store/redux-store";
import {BrowserRouter} from "react-router-dom";
import Preloader from "./components/Preloader/Preloader";
const AppContainer = lazy(() => import("./components/App/appcontainer"));

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <BrowserRouter>
                <Suspense fallback={<Preloader/>}>
                    <AppContainer/>
                </Suspense>
            </BrowserRouter>
        </Provider>
    </React.StrictMode>
);

