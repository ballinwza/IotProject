import React,{Component} from 'react'



class Popup extends Component  {
    
    constructor(props) {
        super(props)

        this.state = {
            date: this.props.previousData.date,
            time: this.props.previousData.time,
            activity: this.props.previousData.activity
        }
        
    }

    componentDidUpdate(prevProps, prevState) {
        //console.log("updatedState:",this.state)
        //console.log("this.props:",this.props.previousData.date)
        if ((this.state.date==null || this.state.date=="") && (prevProps.previousData.date!=this.props.previousData.date)) {
            this.setState({
                date: this.props.previousData.date,
                time: this.props.previousData.time,
                activity: this.props.previousData.activity
            })
            
            
        }

    }
    
    //console.log(uuid)
    handleChange= (e) =>{
        e.preventDefault();
        this.setState({
            [e.target.id] : e.target.value                    
          })
        console.log(this.state)
        
    }
    handleSubmit= (e) =>{
        e.preventDefault();
        try{
            this.props.handleSubmit(this.state)
        } catch(err){
            console.log("Error submit update:",err)
        }
    }
    handleClose= (e) =>{
        e.preventDefault();
        this.setState({
            date: this.props.previousData.date,
            time: this.props.previousData.time,
            activity: this.props.previousData.activity
        })
        
    }

    render(){
    return (
        <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                <div class="modal-header">
                    <h3 class="modal-title" id="exampleModalLabel">Edit Registered Data</h3>
                    
                </div>
                <div class="modal-body">
                    <form onSubmit={this.handleSubmit}>
                    <div class="form-group">
                        <label for="recipient-name" class="col-form-label">Date:</label>
                        <input 
                            onChange={this.handleChange}
                            type="text" 
                            class="form-control" 
                            id="date"
                            value={this.state.date}
                            required

                        />
                    </div>
                    <div class="form-group">
                        <label for="message-text" class="col-form-label">Time:</label>
                        <input 
                            onChange={this.handleChange}
                            type="text" 
                            class="form-control" 
                            id="time"
                            value={this.state.time}
                            required
                            
                        />
                    </div>
                    <div class="form-group">
                        <label for="message-text" class="col-form-label">Activity:</label>
                        <input 
                            onChange={this.handleChange}
                            type="text" 
                            class="form-control"
                            id="activity"
                            value={this.state.activity}
                            required
                            
                        />
                    </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button className="btn btn-secondary" data-dismiss="modal" onClick={this.handleClose}>Close</button>
                    <button className="btn btn-primary" data-dismiss="modal" onClick={this.handleSubmit}>Update</button>
                </div>
                </div>
            </div>
        </div>
                
    )
    }
}


export default Popup
//<button onClick = {onClose}>Close</button>
