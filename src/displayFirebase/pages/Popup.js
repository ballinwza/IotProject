import React,{Component} from 'react'



class Popup extends Component  {
    
    //console.log(uuid)
    handleChange= (e) =>{
        e.preventDefault();
        this.props.handleChange(e.target.id,e.target.value)
    }
    handleSubmit= (e) =>{
        e.preventDefault();
        this.props.handleSubmit()
    }

    render(){
    return (
        <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                <div class="modal-header">
                    <h3 class="modal-title" id="exampleModalLabel">Edit Registered Data</h3>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
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
                            value={this.props.previousData.date}

                        />
                    </div>
                    <div class="form-group">
                        <label for="message-text" class="col-form-label">Time:</label>
                        <input 
                            onChange={this.handleChange}
                            type="text" 
                            class="form-control" 
                            id="time"
                            value={this.props.previousData.time}
                            
                        />
                    </div>
                    <div class="form-group">
                        <label for="message-text" class="col-form-label">Activity:</label>
                        <input 
                            onChange={this.handleChange}
                            type="text" 
                            class="form-control"
                            id="activity"
                            value={this.props.previousData.activity}
                            
                        />
                    </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button className="btn btn-secondary" data-dismiss="modal">Close</button>
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