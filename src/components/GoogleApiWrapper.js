
import React,{Component} from 'react';
import { Map, GoogleApiWrapper } from  'google-maps-react';

class ARDmap extends Component{
    
    render(){
        const mapStyles = {
            width: '100%',
            height: '100%',
          };
        return(
            <Map google={this.props.google}
                                zoom={8}
                                style={mapStyles}
                                initialCenter={{lat:13.889427 , lng:100.617831}}
                                ></Map>
        )
    }
}

export default GoogleApiWrapper({
    apiKey: 'TOKEN HERE'
  })(ARDmap);