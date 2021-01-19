import React,{Component} from 'react';
import ProductItem from '../ProductItem';

import ARM from '../../images/ARM.png'
import ARMitem from '../../images/ARMitem.jpg'
class Item1 extends Component {
    render(){
        return(
            <div className="container ">
                <div className="MainItem">
                    <div className="mainContainerItem">
                        <img src={ARMitem} id="mainImage"/>
                        <p>
                            เครื่องมือวัดรังสีเฉพาะพื้นที่ ใช้งานและติดตั้งง่าย มีทั้งหัววัดแบบในตัวเครื่องและนอกตัวเครื่อง หน้าจอแสดงผลขนาด 2.3นิ้ว LED 7-seagement 4digits
                            มีความแม่นยำในการวัดรังสีสูงถึง 75% มีทั้งหมด 3รูปแบบ
                        </p>
                    </div> 
                    <ProductItem itemNum="item1" productName="Area Monitor V1"/>
                    <ProductItem itemNum="item2" productName="Area Monitor V2"/>
                </div>
            </div>
        )
    }
}

export default Item1; 