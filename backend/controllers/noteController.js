import Note from '../models/Note.js';

// Create new note with empty content initially
export const createNote = async (req, res) => {
    try {
        const note = new Note({ content: '' });
        await note.save();
        res.status(201).json(note);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to create note' });
    }
};

// Get note by ID
export const getNoteById = async (req, res) => {
    try {
        const note = await Note.findById(req.params.id);

        if (!note) {
            return res.status(404).json({ message: 'Note not found' });
        }

        res.json(note);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to fetch note' });
    }
};

// Update note content (Auto-save / Save button)
export const updateNote = async (req, res) => {
    try {
        const { content } = req.body;

        if (content === undefined) {
            return res.status(400).json({ message: 'Content is required' });
        }

        const note = await Note.findByIdAndUpdate(
            req.params.id,
            { content, updatedAt: new Date() },
            { new: true }
        );

        if (!note) {
            return res.status(404).json({ message: 'Note not found' });
        }

        res.json(note);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};
