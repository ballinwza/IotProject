import React,{Component} from 'react';
import ProductItem from '../ProductItem';

import ARM from '../../images/ARM.png'
class Item1 extends Component {
    render(){
        return(
            <ProductItem item="item1" picture={ARM} content="ข้อมูลทั้งหมด"/>
        )
    }
}

export default Item1;