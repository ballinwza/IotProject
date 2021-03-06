import React,{Component} from 'react';

import './style.css';

import {BrowserRouter, Route, Switch, HashRouter } from "react-router-dom";

import Home from './layout/Home';
import Product from './layout/Product';
import Service from './layout/Service';
import Contact from './layout/Contact';
import SignIn from './layout/SignIn';
import UserInfo from './layout/UserInfo';

import Header from './components/Header';
import Footer from './components/Footer';
import item1 from './components/Products/Item1';

import Patient from './displayFirebase/pages/Patient';
import PatientSortedList from './displayFirebase/pages/PatientSortedList';
import PatientList from './displayFirebase/pages/PatientList';
import Register from './displayFirebase/pages/Register';



class App extends Component {

    renderRouter(){
        return (
            <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path='/product' component={Product} />
                <Route exact path="/service" component={Service} />
                <Route exact path="/contact" component={Contact} />
                <Route exact path="/signIn" component={SignIn} />
                <Route exact path="/userInfo" component={UserInfo}/>
                <Route exact path="/product/item1" component={item1}/>
    
                <Route exact path="/patientsortedlist" component={PatientSortedList} />
                <Route exact path="/patientlist" component={PatientList} />
                <Route exact path="/patient" component={Patient} /> 
                <Route exact path="/register" component={Register} /> 
            </Switch>
        )
      }
      

    render(){
        return(
            <BrowserRouter>
                <HashRouter basename="/">
                    <Header />
                    {this.renderRouter()}
                    <Footer />
                </HashRouter >
            </BrowserRouter>

        )
    }
}

export default App;
