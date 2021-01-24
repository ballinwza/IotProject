import React from 'react';
import ReactDom from 'react-dom';
import App from './App';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

import "animate.css/animate.min.css";

import { Provider, useSelector } from 'react-redux'
import { createStore, applyMiddleware, compose} from 'redux'
import rootReducer from "./store/reducers/rootReducer"
import thunk from 'redux-thunk'
import { ReactReduxFirebaseProvider, getFirebase, isLoaded } from 'react-redux-firebase'
import { createFirestoreInstance, reduxFirestore, getFirestore } from 'redux-firestore'
import firebase from "firebase/app";
import firebaseApp from './displayFirebase/firebaseConnection/firebase' ;//fbConfig

const store = createStore(rootReducer,
    compose(
        applyMiddleware(thunk.withExtraArgument({getFirebase, getFirestore})),
        //reduxFirestore(fbConfig),
        reduxFirestore(firebase, firebaseApp)
        //reactReduxFirebase(fbConfig)
    )
)
const rrfProps = {
    firebase,
    config: firebaseApp,
    dispatch: store.dispatch,
    createFirestoreInstance,
  };
function AuthIsLoaded({ children }) {
    const auth = useSelector(state => state.firebase.auth)
    if (!isLoaded(auth)) return <div>Loading</div>;
    return children
  };

ReactDom.render(<Provider store={store}>
                    <ReactReduxFirebaseProvider {...rrfProps}>
                        <AuthIsLoaded>
                            <App />
                        </AuthIsLoaded>
                    </ReactReduxFirebaseProvider>
                </Provider>,document.getElementById('root'))    
            