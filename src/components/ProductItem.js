import React,{Component} from 'react';
import {Link} from 'react-router-dom';

class ProductItem extends Component {
    constructor(props){
        super(props);

        this.state={};
    }
    render(){
        return(
            <div className={`product-item`}>
                <div className={`product-${this.props.item}`}>
                    <Link to="/product" className="btn btn-light">X</Link>
                    <img src={this.props.picture}></img>
                    
                </div>
            </div>
        )
    }
}

export default ProductItem;