import React from 'react';
import ReactDOM from 'react-dom/client';
import {Provider} from "react-redux";
import store from "./store/redux-store";
import {BrowserRouter} from "react-router-dom";
import App from "./components/App/app";
import {QueryClient, QueryClientProvider} from "react-query";
import {ThemeProvider} from "./context/ThemeContext";

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
const queryClient = new QueryClient();

root.render(
    <Provider store={store}>
        <QueryClientProvider client={queryClient}>
            <BrowserRouter basename={process.env.PUBLIC_URL}>
                <ThemeProvider>
                    <App/>
                </ThemeProvider>
            </BrowserRouter>
        </QueryClientProvider>
    </Provider>
);

