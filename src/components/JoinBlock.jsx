import React from 'react';
import socket from "../socket";
import axios from "axios";


const JoinBlock = ({onLogin}) => {


    const [roomId, setRoomId] = React.useState('');
    const [userName, setUserName] = React.useState('');
    const [isLoading, setLoading] = React.useState(false);

    const handlerInputId = value => {
        setRoomId(value)
    }
    const handlerInputName = value => {
        setUserName(value)
    }
    const onEnter = async () => {
        if(!roomId || !userName) {
          return   alert('Неверные данные!')
        }
        const obj = {
            roomId,
            userName
        }
        setLoading(true);
       await axios.post('/rooms', {
            roomId,
            userName
        });
       onLogin(obj);

    }


    return (
        <div className="join-block">
            <input
                type="text"
                placeholder="Room ID"
                value={roomId}
                onChange={event => handlerInputId(event.target.value)}
            />
            <input
                type="text"
                placeholder="Ваше имя"
                value={userName}
                onChange={event => handlerInputName(event.target.value)}

            />
            <button onClick={onEnter} className="btn btn-success">
                {isLoading
                    ? 'Вход....'
                    : 'Войти'
                }
            </button>
        </div>
    );
};

export default JoinBlock;