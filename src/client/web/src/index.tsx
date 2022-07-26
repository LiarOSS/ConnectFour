import ReactDOM from 'react-dom/client'
import "./styles/tailwind.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import React from 'react';
import {
    QueryClient,
    QueryClientProvider,
} from 'react-query'
import {Provider} from "react-redux";
import {store} from "./state/store";
import Notifications from "./components/ui/Notifications";
import {BrowserRouter} from "react-router-dom";

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <BrowserRouter>
            <Provider store={store}>
                <QueryClientProvider client={queryClient}>
                    <Notifications/>
                    <App/>
                </QueryClientProvider>
            </Provider>
        </BrowserRouter>
    </React.StrictMode>
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
