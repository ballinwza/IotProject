
import React,{Component} from 'react';

class MapContainer extends Component{
    
    render(){

        return(
            <div className="container">
                <iframe src={this.props.src} height={this.props.height} width={this.props.width} frameborder={this.props.frameborder}
                aria-hidden={this.props.ariaHidden} tabindex={this.props.tabindex} className="map"/>
            </div>
            
        )
    }
}

export default MapContainer;