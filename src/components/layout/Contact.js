import React,{Component} from 'react';
import { connect } from 'react-redux'

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faEnvelope, faUserTie, faMobileAlt, faPhoneAlt } from "@fortawesome/free-solid-svg-icons";
import { faFacebookSquare, faLine } from "@fortawesome/free-brands-svg-icons";
import MapContainer from '../MapContainer';

import Picture01 from '../../images/LogoFooter.jpg'


class Contact extends Component {
    state = {
        ARDmap : ""
    }

    map1Chooser = () =>{
        this.setState({ARDmap:""})
    }
    map2Chooser = () =>{
        this.setState({ARDmap:"active"})
    }
    render() {
        const { uid } = this.props;
        console.log('uid :',uid)
        
   
        return(
            <div className="container">
                <div className="mainContact">
                    <div className="row">
                        <div className="col-12 HeadText">
                            <h2>บริษัท แอดวานซ์ อาร์แอนด์ดี เทคโนโลยี จำกัด (สำนักงานใหญ่)<br/>
                             ADVANCED R&D TECHNOLOGY CO., LTD</h2>
                        </div>  

                        <div className="col-12 mainPicture">
                            <img src={Picture01}/>
                        </div>
                    </div>

                    <div className="mainContent">
                        <div className="firstContent">
                            <p>
                                ๙/๗๐ ซอยพหลโยธิน ๕๐ แยก ๑๑-๑๕ แขวงคลองถนน เขตสายไหม กรุงเทพมหานคร ๑๐๒๒๐<br/>
                                9/70 Soi Phaholyothin 50 Yak 11-15, Khlong Thanon, Sai Mai, 10220, THAILAND<br/>
                                เลขประจำตัวผู้เสียภาษี 010 555 308 1067
                            </p>
                            <div className="icon-zone">
                                <a href="/">
                                    <FontAwesomeIcon className="brandIcon " icon={faLine}/>
                                </a>
                                <a href="/">
                                    <FontAwesomeIcon className="brandIcon brandIcon-facebook" icon={faFacebookSquare}/>
                                </a>
                                <a href="/">
                                    <FontAwesomeIcon className="brandIcon " icon={faFacebookSquare}/>
                                </a>
                                <a href="/">
                                    <FontAwesomeIcon className="brandIcon" icon={faFacebookSquare}/>
                                </a>
                            </div>
                        </div>

                        <div className="secondContent">
                            <p>
                                <FontAwesomeIcon className={`arrowIcon`} icon={faUserTie}/>
                                <span>Surakit Khaoprew / สุรกิจ ขาวแผ้ว</span>
                            </p>
                            <p>
                                <FontAwesomeIcon className={`arrowIcon`} icon={faEnvelope}/>
                                <span>surakit_ardt@hotmail.com</span>
                            </p>
                            <p>
                                <FontAwesomeIcon className={`arrowIcon`} icon={faEnvelope}/>
                                <span>ardtech.ardt@gmail.com</span>
                            </p>
                                
                            <p>
                                <FontAwesomeIcon className={`arrowIcon`} icon={faMobileAlt}/>
                                <span>086-089-1061</span>
                            </p>
                            <p>
                                <FontAwesomeIcon className={`arrowIcon`} icon={faPhoneAlt}/>
                                <span>02-077-7031</span>
                            </p>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-12">
                            <div className="mapBtn">
                                <button className="btn btn-danger" onClick={this.map1Chooser}>แผนที่</button>
                                <button className="btn btn-danger" onClick={this.map2Chooser}>แผนที่2</button>
                            </div>
                        </div>

                        <div className="col-12">
                            <div className="mapContainer">
                                <div id="map1">
                                    <MapContainer src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1936.5790872550212!2d100.61721297087274!3d13.889488671135338!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30e2835ba80bbdab%3A0x4cce38537b389a0a!2sAdvanced%20R%26D%20Technology%20Co.%2C%20LTD!5e0!3m2!1sth!2sth!4v1610976899680!5m2!1sth!2sth"
                                    height="500" width="100%" frameborder="0" ariaHidden="false" tabindex="0"/>
                                </div>
    
                                <div className={this.state.ARDmap} id="map2">
                                    <MapContainer src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d543.8086502712179!2d100.61773162361919!3d13.88941863057586!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30e2835ba80bbdab%3A0x4cce38537b389a0a!2sAdvanced%20R%26D%20Technology%20Co.%2C%20LTD!5e1!3m2!1sth!2sth!4v1610976997355!5m2!1sth!2sth"
                                    height="500" width="100%" frameborder="0" ariaHidden="false" tabindex="0"/>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return{
        uid : state.firebase.auth.uid
    }
}

export default connect(mapStateToProps)(Contact) ;
