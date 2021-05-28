import React, {useEffect, useState} from 'react';
import MessageNav from '../../components/message/MessageNav';
import Header from "../../components/Header";
import '../../styles/ReceiverSendMessage.css';
import {Api} from "../../apiHandler/apiHandler";
import Message from "../../components/message/Message";
import {BsArrowLeft} from 'react-icons/bs';

const SendMessage = () =>{
    const[sentMessages, setSentMessages] = useState([]);
    const[recipient, setRecipient] = useState({
        senderName: '',
        senderSurname: '',
        senderAvatar: '',
        contents: '',
        clicked:false
    })

    useEffect(() =>{
        getSentMessages();
    }, [])

    function getSentMessages(){
        Api.sentMessages().then( response =>{
            if(response.status === 200){
                if(response.data !== []){
                    setSentMessages( response.data);
                }
            }
        });
    }

    const clickedMessage=(n, m, a, c, tf)=>{
        import(`../../../src/uploads/${a}`)
            .then(({default: url}) =>{
                setRecipient({
                    recipientName: n,
                    recipientSurname: m,
                    recipientAvatar: url,
                    contents: c,
                    clicked: tf
                })
            })
    }
    return (
        <div className="App">
            <Header/>
            <div className="Messages">
                <MessageNav/>
                <div className="Sends">
                    <div className='Receiver-messages'>
                        <h1>Wysłane</h1>
                        <div className="Rec-messages">
                            {
                                sentMessages.length!==0 ?
                                    sentMessages.map((sentMessage, i) => {
                                        return (<Message
                                                key={i}
                                                contents={sentMessage.contents}
                                                name={sentMessage.name}
                                                surname={sentMessage.surname}
                                                avatar={sentMessage.avatar}
                                                onClick={()=>clickedMessage(sentMessage.name, sentMessage.surname, sentMessage.avatar, sentMessage.contents, true)}
                                            />)
                                    }) :
                                    <div className="Statement">
                                        <h4>Brak wiadomości</h4>
                                    </div>
                            }
                        </div>
                    </div>
                    {
                        recipient.clicked===false ?
                            null
                            :
                            <div className='Receiver-message'>
                                <BsArrowLeft
                                    className="Rowback"
                                    onClick={()=>setRecipient({clicked: false})}
                                />
                                <div className="Whole-message">
                                    <div className="One-friend">
                                        <h4>Do:</h4>
                                        <span>
                                            <img className="Medium-avatar" src={recipient.recipientAvatar}/>
                                        </span>
                                        <h4>{recipient.recipientName} {recipient.recipientSurname}</h4>

                                    </div>
                                    <p>{recipient.contents}</p>
                                </div>
                            </div>
                    }
                </div>
            </div>
        </div>
    )
}
export default SendMessage;