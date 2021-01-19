import React,{Component} from 'react';
import Picture1 from '../images/Train01.jpg';

class ServiceItem extends Component{
    render(){
        return(
            <div className="mainServiceContainer"> 
                <div className="row">
                    <div className="col-12 HeadText">
                        {this.props.mainHead}
                    </div>
                    <div className="col-12 first">
                        <div className="row row-cols-3 imageSet01"> 
                            <p><img src={Picture1} /></p>
                            <p><img src={Picture1} /></p>
                            <p><img src={Picture1} /></p>
                        </div>
                        <div className="row row-cols-3 imageSet02">
                            <p><img src={Picture1} /></p>
                            <p><img src={Picture1} /></p>
                        </div>
                        <div className="firstText"> 
                            {this.props.content}
                        </div>
                    </div>
                    
                </div>
            </div>
        )
    }
}

export default ServiceItem;