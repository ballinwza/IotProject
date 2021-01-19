import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import Picture1 from '../images/ARM.png';

class ProductItem extends Component {
    state = {
        icon:"false"
    }
    handleClick = () =>{
        if(this.state.icon === "false"){
            this.setState({icon: "true"})
        } else {
            this.setState({icon: "false"})
        }
    }
    render(){
        return( 
            <div className="item">
                <div className={` row justufy-content-center`}>
                    <div className="col-12 headText">
                        <a data-toggle="collapse" href={`#${this.props.itemNum}`} role="button" aria-expanded="false" aria-controls={`${this.props.itemNum}`}>
                            <FontAwesomeIcon className={`arrowIcon arrowIcon-${this.state.icon}`} icon={faChevronRight}
                            onClick={this.handleClick}/> 
                        </a>
                        <span className={`headName`}>
                            {this.props.productName}
                        </span>
                    </div>
                    <div className={`collapse itemContent row`} id={`${this.props.itemNum}`}>
                        <div className="col-6"><img src={Picture1}></img></div>
                        <div className="col-6">
                            <div className="row-cols-1 detailContainer">
                                <p>ข้อความที่ 1</p>
                                <p>ข้อความที่ 2</p>
                                <p>ข้อความที่ 3</p>
                                <p>ข้อความที่ 4</p>
                                <p>ข้อความที่ 5</p>
                            </div>
                        </div>
                        <div className="col-12 tableStyle">
                            <table>
                                <tr>
                                    <th>Detector</th>
                                    <td>Internal GM tube with 28.6 mm effective diameter and 66 mm effective length</td>
                                </tr>
                                <tr>
                                    <th>Linearity</th>
                                    <td>within 15% of true value from 30 keV – 3 MeV</td>
                                </tr>
                                <tr>
                                    <th>Sensitivity</th>
                                    <td>typically 40 cps / mR / hr (60Co Gamma)</td>
                                </tr>
                            </table>
                        </div>
                    </div>
                    
                </div>
            </div>
        )
    }
}

export default ProductItem;