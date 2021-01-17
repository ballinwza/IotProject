import React,{Component} from 'react';
import {Link} from 'react-router-dom';

import LogoFooter from '../images/LogoFooter.jpg';

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faFacebookSquare, faLine } from "@fortawesome/free-brands-svg-icons";

class Footer extends Component {
    render() {
        return(
            <footer className="clearfix container-fluid">
               <div className="row-cols-1">
                    <div className="brand-zone">
                        <Link to="/"><img src={LogoFooter}></img></Link>
                    </div>
    
                    <div className="icon-zone">
                        <a className="brandLink" href="/">
                            <a href="/">
                                <FontAwesomeIcon className="brandIcon " icon={faLine}/>
                            </a> 

                        </a>
                        <a className="brandLink" href="/">
                            <a href="/">
                                <FontAwesomeIcon className="brandIcon brandIcon-facebook" icon={faFacebookSquare}/>
                            </a>
                        </a>
                        <a className="brandLink" href="/">
                            <a href="/">
                                <FontAwesomeIcon className="brandIcon brandIcon-facebook" icon={faFacebookSquare}/>
                            </a>
                        </a>
                        <a className="brandLink" href="/">
                            <a href="/">
                                <FontAwesomeIcon className="brandIcon brandIcon-facebook" icon={faFacebookSquare}/>
                            </a>
                        </a>
                    </div>
    
                    <div className="text-zone">
                        Powered by ADVANCED R&D TECHNOLOGY Co., Ltd. Copyright 2014 All right
                    </div>
               </div>
            </footer>
        )
    }
}

export default Footer;