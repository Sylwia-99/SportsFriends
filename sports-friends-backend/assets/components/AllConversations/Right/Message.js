import React from 'react';
import '../../../styles/Message.css'

class Message extends React.Component {
    render() {
        let img ='';

        if(this.props.message.mine != 1){
            img = <img className="medium-avatar" src={this.props.avatar}/>
        }
        return (
            <div className={`message-container ${this.props.message.mine == 1 ? `` : `not-mine-container`}`} >
                {img}
                <div className="media-body ml-3">
                    <p className={`message-content ${this.props.message.mine == 1 ? `` : `not-mine`}`}>{this.props.message.content}</p>
                    <div className={`date-content ${this.props.message.mine == 1 ? `` : `not-mine-date`}`}>
                        <p className="small-date"> {new Date(this.props.message.createdAt).toLocaleString()}</p>
                    </div>

                </div>
            </div>
        );
    }
}

export default Message;