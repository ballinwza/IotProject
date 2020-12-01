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
            <Link to ={`/product/${this.props.item}`} 
            className={`grid-item grid-${this.props.item} ${this.state.onItem} ${this.state.offItem}`} 
            onMouseOver={(e)=>this.mouseOver(e,this.props.item)} 
            onMouseOut={(e)=>this.mouseOut(e,this.props.item)}
            >
                <div className="textHover row align-content-center  ">
                    <div className="col-12 "> Test {this.props.itemname}</div>
                    <div className="col-12">Price</div>
                    <div className="col-12">Information</div>
                </div>
                <img src={this.props.picture}></img>
                <div>{this.props.content}</div>
            </Link>
        )
    }
}

export default productlist;

/*
<div className={`grid-item grid-item-2 ${this.state.mousehoverOut} ${this.state.mousehoverOn}`} onMouseOut={(e) => this.mouseOut(e,"item2")} onMouseOver={(e)=>this.mouseOver(e,"item2")}>
                    {this.props.name}
            </div>
            */