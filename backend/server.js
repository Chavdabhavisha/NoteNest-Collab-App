import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import noteRoutes from './routes/noteRoutes.js';

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: '*' } });

connectDB();

app.use(cors());
app.use(express.json());
app.use('/notes', noteRoutes);

// Active users tracking (Bonus)
const users = {};

io.on('connection', (socket) => {
    console.log('A user connected');

socket.on('join_note', ({ noteId, userName }) => {
    socket.join(noteId);
    socket.noteId = noteId;
    socket.userName = userName;

    if (!users[noteId]) {
        users[noteId] = [];
    }

    users[noteId].push({ socketId: socket.id, userName });

    io.to(noteId).emit('active_users', users[noteId]);

    // Notify other users about new join
    socket.to(noteId).emit('user_joined', `${userName} joined the note`);
});


    socket.on('note_update', (data) => {
        const noteId = socket.noteId;
        socket.to(noteId).emit('note_update', data);
    });

    // 🔴 Add this block for disconnect event:
   socket.on('disconnect', () => {
    const noteId = socket.noteId;

    if (noteId && users[noteId]) {
        users[noteId] = users[noteId].filter(u => u.socketId !== socket.id);

        io.to(noteId).emit('active_users', users[noteId]);

        socket.to(noteId).emit('user_left', `${socket.userName || 'A user'} left the note`);
    }
});

});


const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
