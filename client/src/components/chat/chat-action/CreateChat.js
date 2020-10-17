import React, {useEffect, useState, useContext} from 'react';
import {useHttp} from '../../../hooks/http.hook';
import addIcon from '../../../assets/images/add.svg';
import {AuthContext} from '../../../context/AuthContext';

export const CreateChat = () => {
    const {request} = useHttp();
    const auth = useContext(AuthContext);
    const [users, setUsers] = useState([]);
    useEffect(() =>{
        async function fetchData() {
            let data = await request('/chat/get-all-users', 'POST');
            setUsers(data);
        }
        fetchData();
    }, [])

    const createHandler = (id) => {
        async function fetchData() {
            let data = await request('/chat/create-chat', 'PUT', {
                senderId: auth.userId,
                receiverId: id
            });
            console.log(data);
        }
        fetchData();
    }

    const usersList = users.map((user) =>{
        return(
            <li key={user._id} className='users-list__item' onClick={()=>(createHandler(user._id))}>
                {user.username}
                <img src={addIcon} alt="Add icon"/>
            </li>
        )
    })

    return(
        <div className='create-chat-screen'>
        <h2 className='create-chat-screen__title'>
            Create a new chat
        </h2>
        <ul className="users-list">
            {usersList}
        </ul>
    </div>
    )
}