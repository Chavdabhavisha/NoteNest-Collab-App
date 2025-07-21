import { useState } from 'react';
import { createNote } from '../api';
import { useNavigate } from 'react-router-dom';

function Home() {
    const [title, setTitle] = useState('');
    const navigate = useNavigate();

    const handleCreate = async () => {
        if (!title) return alert('Please enter a title');

        const res = await createNote({ title, content: '' });
        navigate(`/note/${res.data._id}`);
    };

    return (
        <div className="container mt-5">
            <h1 className="mb-4">Create a New Note</h1>
            <input
                type="text"
                className="form-control mb-3"
                placeholder="Enter note title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <button className="btn btn-primary" onClick={handleCreate}>Create Note</button>
        </div>
    );
}

export default Home;
