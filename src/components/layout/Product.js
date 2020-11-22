import React,{Component} from 'react';
import { connect } from 'react-redux'
import { Link, Redirect } from 'react-router-dom'

class Product extends Component {
    render() {
        const { uid } = this.props;
        console.log('uid :',uid)

        return(
            <div>
                Product
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