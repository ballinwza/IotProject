import React,{Component} from 'react';
import {Link} from 'react-router-dom';


class productlist extends Component {
    constructor(props){
        super(props);

        this.state= {
            onItem: '',
            offItem: '',
        }

        this.mouseOut = this.mouseOut.bind(this);
        this.mouseOver = this.mouseOver.bind(this);
    }



    mouseOut =(e,x) => {
        e.preventDefault();
        if(this.state.offItem === `mouseOut mouseOut-${x}`){
            this.setState({offItem: ""})
        } else{
            this.setState({offItem: `mouseOut mouseOut-${x}`});
            this.setState({onItem:""})
        }
    }

    mouseOver = (e,x) => {
        e.preventDefault();
        if(this.state.onItem === `mouseOver mouseOver-${x}`){
            this.setState({onItem: ""});
        } else{
            this.setState({onItem: `mouseOver mouseOver-${x}`});
            this.setState({offItem:""})
        }
    }

     


    render(){

        return( 
            
                <div className={`container productItem`}>
                    <Link to ={`/product/${this.props.item}`} >
                    <div className="row main-container">
                        <div className="col-5">
                            <img src={this.props.picture}></img>
                        </div>

                        <div className="col-7 ">
                            <div className="primary-content">
                                <div className="row-cols-1">
                                    <div className="head-text"> Test {this.props.itemname}</div>
                                    <div className="price-text">Price {this.props.price}</div>
                                    <div className="info-text">Information {this.props.info}</div>
                                </div>
                            </div>
                        </div>
                        
                        <div className="secondary-content">
                            <div className="secondary-content-text">
                                test {this.props.moreInfo}
                            </div>
                        </div>

                    </div>
                    </Link>
                </div>
            
        )
    }
}

export default productlist;

/*
<div className={`grid-item grid-item-2 ${this.state.mousehoverOut} ${this.state.mousehoverOn}`} onMouseOut={(e) => this.mouseOut(e,"item2")} onMouseOver={(e)=>this.mouseOver(e,"item2")}>
                    {this.props.name}
            </div>
            */