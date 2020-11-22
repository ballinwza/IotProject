import React,{Component} from 'react';
import {Link} from 'react-router-dom';

import LogoFooter from '../images/LogoFooter.jpg';

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faFacebookSquare, faLine } from "@fortawesome/free-brands-svg-icons";

class Footer extends Component {
    render() {
        return(
            <footer className="clearfix">
                <Link to="/"><img src={LogoFooter}></img></Link>

                <div>
                    <a href="/" className="brandLink "><FontAwesomeIcon className="brandIcon brandIcon-line" icon={faLine}/></a>
                    <a href="/" className="brandLink "><FontAwesomeIcon className="brandIcon brandIcon-facebook" icon={faFacebookSquare}/></a>
                </div>

                Powered by ADVANCED R&D TECHNOLOGY Co., Ltd. Copyright 2014 All right
            </footer>
        )
    }
}

export default Footer;