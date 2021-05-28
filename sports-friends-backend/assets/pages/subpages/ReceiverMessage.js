import React, {useEffect, useState} from 'react';
import MessageNav from '../../components/message/MessageNav';
import Header from "../../components/Header";
import '../../styles/ReceiverSendMessage.css';
import {Api} from "../../apiHandler/apiHandler";
import Message from "../../components/message/Message";
import {BsArrowLeft} from "react-icons/bs";

const ReceiverMessage = () =>{
    const[receivedMessages, setReceivedMessages] = useState([]);
    const[sender, setSender] = useState({
        senderName: '',
        senderSurname: '',
        senderAvatar: '',
        contents: '',
        clicked: false
    })

    useEffect(() =>{
        getReceivedMessages();
    }, [])


    function getReceivedMessages(){
        Api.receivedMessages().then( response =>{
            if(response.status === 200){
                if(response.data === []){
                    console.log(response.data);
                }else{
                    setReceivedMessages(response.data);
                }
            }
        });
    }

    const clickedMessage = (n, m, a, c, tf) =>{
        import(`../../../src/uploads/${a}`)
            .then(({default: url}) =>{
                setSender({
                    senderName: n,
                    senderSurname: m,
                    senderAvatar: url,
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
                <div className="Receivers">
                    <div className='Receiver-messages'>
                        <h1>Odebrane</h1>
                        <div className="Rec-messages">
                            {
                                receivedMessages.length!==0 ?
                                    receivedMessages.map((receivedMessage, i) => {
                                        return (<Message
                                            key={i}
                                            contents={receivedMessage.contents}
                                            name={receivedMessage.name}
                                            surname={receivedMessage.surname}
                                            avatar={receivedMessage.avatar}
                                            onClick={() => clickedMessage(receivedMessage.name, receivedMessage.surname, receivedMessage.avatar, receivedMessage.contents, true)}
                                        />)
                                    }) :
                                        <div className="Statement">
                                            <h4>Brak wiadomości</h4>
                                        </div>
                            }
                        </div>
                    </div>
                    {
                        sender.clicked===false ?
                            null
                            :
                            <div className='Receiver-message'>
                                <BsArrowLeft
                                    className="Rowback"
                                    onClick={()=>setSender({clicked: false})}
                                />
                                <div className="Whole-message">
                                    <div className="One-friend">
                                        <h4>Od:</h4>
                                        <span>
                                            <img className="Medium-avatar" src={sender.senderAvatar} alt="this is avatar"/>
                                        </span>
                                        <h4>{sender.senderName} {sender.senderSurname}</h4>
                                    </div>
                                    <p>{sender.contents}</p>
                                </div>
                            </div>
                    }
                </div>
            </div>
        </div>
    )
}
export default ReceiverMessage;