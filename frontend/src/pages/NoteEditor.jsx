import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { getNote, updateNote } from '../api';
import { io } from 'socket.io-client';
import TextareaAutosize from 'react-textarea-autosize';

const socket = io(process.env.REACT_APP_BACKEND_URL);

const NoteEditor = () => {
    const { id } = useParams();
    const [content, setContent] = useState('');
    const [users, setUsers] = useState([]);
    const contentRef = useRef(''); // For latest content in auto-save

    useEffect(() => {
        const userName = prompt('Enter your name') || 'Anonymous';

        // Join note room with username
        socket.emit('join_note', { noteId: id, userName });

        // Listen for note updates from others
        socket.on('note_update', (data) => {
            setContent(data);
            contentRef.current = data;
        });

        // Listen for active users list
        socket.on('active_users', (userList) => {
            setUsers(userList);
        });

        // Optional notifications
        socket.on('user_joined', (msg) => console.log(msg));
        socket.on('user_left', (msg) => console.log(msg));

        // Load initial note content
        getNote(id).then(res => {
            setContent(res.data.content || '');
            contentRef.current = res.data.content || '';
        });

        // Auto-save every 5 sec using contentRef to avoid stale closure
        const interval = setInterval(() => {
            updateNote(id, { content: contentRef.current })
                .then(() => console.log('Auto-saved at', new Date().toLocaleTimeString()))
                .catch(err => console.error('Auto-save error:', err));
        }, 5000);

        return () => {
            clearInterval(interval);
            socket.disconnect();
        };

    }, [id]);

    const handleChange = (e) => {
        setContent(e.target.value);
        contentRef.current = e.target.value;
        socket.emit('note_update', e.target.value);
    };

    const handleSave = () => {
        updateNote(id, { content })
            .then(() => alert('Note saved!'))
            .catch(err => alert('Save failed'));
    };



    return (
        <div className="container mt-4">
            <h2>Collaborative Note</h2>

            <TextareaAutosize
                className="form-control"
                minRows={10}
                value={content}
                onChange={handleChange}
            />

            <button className="btn btn-success mt-3" onClick={handleSave}>
                Save Now
            </button>

            <h4 className="mt-4">Collaborators Active: {users.length}</h4>
            <ul>
                {users.map(u => (
                    <li key={u.socketId}>{u.userName}</li>
                ))}
            </ul>
        </div>
    );
};


export default NoteEditor;
