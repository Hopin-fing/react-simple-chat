import React from 'react'
import socket from './socket';

import JoinBlock from "./components/JoinBlock";
import reducer from "./reducer";
import Chat from "./components/Chat";
import axios from "axios";



function App() {
    const [state, dispatch] = React.useReducer(reducer, {
        joined: false,
        roomId: null,
        userName: null,
        users: [],
        messages: []
    });

    const onLogin = async (obj) => {
        dispatch({
            type: "JOINED",
            payload: obj
        })
        socket.emit('ROOM:JOIN', obj);
        const {data} = await axios.get(`/rooms/${obj.roomId}`);
        setUsers(data.users)
    };

    const setUsers = (users) => {
        dispatch({
            type:'SET_USERS',
            payload: users
        })
    }

    React.useEffect(() => {
        socket.on('ROOM:SET_USERS', setUsers);
    }, [])



    window.socket = socket;

    return (
    <div className="wrapper">
        {!state.joined
            ? <JoinBlock onLogin={onLogin}/>
            : <Chat {...state} />
        }
    </div>
  );
}

export default App;
