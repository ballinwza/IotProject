import React,{Component} from 'react';
import { connect } from 'react-redux'

import Productlist from '../Productlist';

import ARMpic from '../../images/ARM.png';
import Ranger from '../../images/Ranger.jpg';
import Dosei from '../../images/Dosei.jpg';
import Rad60 from '../../images/Rad60.jpg';
import Rad7 from '../../images/Rad7.jpg';

class Product extends Component {
    constructor(props) {
        super(props);
    }


    render() {
        const { uid } = this.props;
        console.log('uid :',uid)
        console.log(this.state); 
        
        return(
            <div className='container'>
                <Productlist item="item1" picture={ARMpic} itemname="Area Monitoring" price="20,000 Bath" 
                info="Internal / External GM-tube for Gamma and high energy X-rays"
                moreInfo="Area Monitoring using for counting radioactive especially X-ray and Gamma-ray"/>

                <Productlist item="item2" picture={Ranger} moreInfo="เครื่องมือ ranger"/>

                <Productlist item="item3" picture={Dosei}/>

                <Productlist item="item4" picture={Rad60} />

                <Productlist item="item5" picture={Rad7}/>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return{
        uid : state.firebase.auth.uid
    }
}
export default connect(mapStateToProps)(Product);