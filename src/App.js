import React,{Component} from 'react';

import './style.css';

import {BrowserRouter, Route, Switch} from "react-router-dom";
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/layout/Home';
import Product from './components/layout/Product';
import Service from './components/layout/Service';
import Contact from './components/layout/Contact';
import SignIn from './components/layout/SignIn';

import Item1 from './components/Products/Item1';
import Item2 from './components/Products/Item2';
import Item3 from './components/Products/Item3';
import Item4 from './components/Products/Item4';

import Patient from './displayFirebase/pages/Patient';
import PatientSortedList from './displayFirebase/pages/PatientSortedList';


class App extends Component {

    renderRouter(){
        return (
            <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/product" component={Product} />
                <Route exact path="/service" component={Service} />
                <Route exact path="/contact" component={Contact} />
                <Route exact path="/signIn" component={SignIn} />

                <Route exact path="/product/Item1" component={Item1}/>
                <Route exact path="/product/Item2" component={Item2}/>
                <Route exact path="/product/Item3" component={Item3}/>
                <Route exact path="/product/Item4" component={Item4}/>

                <Route exact path="/patientsortedlist" component={PatientSortedList} />
                <Route exact path="/patient" component={Patient} /> 
            </Switch>
        )
      }

    render(){
        return(
            <BrowserRouter>
                <Header />
                {this.renderRouter()}
                <Footer />
            </BrowserRouter>

        )
    }
}

export default App;