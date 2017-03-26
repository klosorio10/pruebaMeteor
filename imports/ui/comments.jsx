import React, {Component} from 'react';

class Comments extends Component{

    render(){
        if(this.props.comments){
            return(
                <div className="center">
                    {this.props.comments.map(comment => {
                        return (
                            <div className="comment">
                                <p>{comment}</p>
                            </div>
                        );
                    })}
                </div>
            );
        }else{
            return(
                <div>

                </div>
            );
        }
    }
}
export default Comments;