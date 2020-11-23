import React,{Component} from 'react';
import { connect } from 'react-redux'
import { Link, Redirect } from 'react-router-dom';

import ARMpic from '../../images/ARMpic.jpg';

class Product extends Component {
    render() {
        const { uid } = this.props;
        console.log('uid :',uid)

        return(
            <div className='grid-container'>
                <div className='grid-item grid-item-1'>
                    <img src={ARMpic}></img>
                    <div>Area Monitoring</div>
                </div>

                <div className='grid-item grid-item-2'>
                    2
                </div>

                <div className='grid-item grid-item-3'>
                    3
                </div>

                <div className='grid-item grid-item-4'>
                    4
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
export default connect(mapStateToProps)(Product);