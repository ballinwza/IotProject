import React , {Component} from 'react';
import {Link} from 'react-router-dom'
import Slideshow from '../Slideshow';
import Picture1 from '../../images/mainHome01.jpg';
import Picture2 from '../../images/mainHome02.jpg';
import Picture3 from '../../images/mainHome03.jpg';

class Home extends Component {
    
    render() {
        return(
            <div>
                <Slideshow />
                <div className="container">
                    <div className="homeHeadText">
                        <div className="row">
                            <div className="col-12 firstText">
                                <h1>Advanced R&D Technology</h1>
                            </div>
                            <div className="col-12 secondText">
                                <div className="row row-cols-4 justify-content-center">
                                    <div className="secondText-container">
                                        <Link exact to="/product">
                                            <img src={Picture1}/>
                                            <div className="secondText-head">Product</div>
                                            <p>มีการจัดจำหน่ายอุปกรณื และเครื่องมือที่ใช้งานเกี่ยวกับทางดานรังสี</p>
                                        </Link>
                                    </div>
                                    <div className="secondText-container">
                                        <Link exact to="/services">
                                            <img src={Picture2}/>
                                            <div className="secondText-head">Service</div>
                                            <p>บริษัทมีการให้บริการ ปรึกษาปัญหาที่เกี่ยวกับรังสี ซ่อมแซมเครื่องมือทางรัง สอบเทียบเครื่องรังสี และจัดอบรบเกี่ยวกับการป้องกันรังสีเบื้องต้น</p>
                                        </Link>
                                    </div>
                                    <div className="secondText-container">
                                        <Link exact to="/contact">
                                            <img src={Picture3}/>
                                            <div className="secondText-head">Contact</div>
                                            <p>สามารถติดต่อบริษัทได้ตามที่อยู่ต่อไปนี้</p>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                            
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default (Home)