import React from 'react';
import ReactDOM from 'react-dom/client';
import {Provider} from "react-redux";
import store from "./store/redux-store";
import {BrowserRouter} from "react-router-dom";
import App from "./components/App/app";
import {QueryClient, QueryClientProvider} from "react-query";
import {ThemeProvider} from "./context/ThemeContext";

const root = ReactDOM.createRoot(document.getElementById('root'));
const queryClient = new QueryClient();

root.render(
    <React.StrictMode>
        <Provider store={store}>
            <QueryClientProvider client={queryClient}>
                <BrowserRouter>
                    <ThemeProvider>
                        <App/>
                    </ThemeProvider>
                </BrowserRouter>
            </QueryClientProvider>
        </Provider>
    </React.StrictMode>
);

