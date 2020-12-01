import React,{Component} from 'react';
import ProductItem from '../ProductItem';

import Ranger from '../../images/Ranger.jpg'
class item2 extends Component {
    render(){
        return(
            <ProductItem item="item2" picture={Ranger} content="ข้อมูลทั้งหมด"/>
        )
    }
}

export default item2;