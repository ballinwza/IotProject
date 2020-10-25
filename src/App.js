import React,{Component} from 'react';

import './style.css';

import {BrowserRouter, Route, Switch} from "react-router-dom";
import Header from './components/Header';
import Home from './components/layout/Home';
import Product from './components/layout/Product';
import Service from './components/layout/Service';
import Contact from './components/layout/Contact';
import signIn from './components/signIn';


class App extends Component {

    renderRouter(){
        return (
            <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/product" component={Product} />
                <Route exact path="/service" component={Service} />
                <Route exact path="/contact" component={Contact} />
                <Route exact path="/signIn" component={signIn} />
            </Switch>
        )
      }

    render(){
        return(
            <BrowserRouter>
                <Header />
                {this.renderRouter()}
            </BrowserRouter>

        )
    }
}

export default App;