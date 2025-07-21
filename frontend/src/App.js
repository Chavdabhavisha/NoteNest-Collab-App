import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import NoteEditor from './pages/NoteEditor';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/note/:id" element={<NoteEditor />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
    