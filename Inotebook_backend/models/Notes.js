import mongoose from 'mongoose';

const notesSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
      
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        
    },
    date: {
        type: Date,
        default: Date.now
    }
});

const Notes = mongoose.model('notes', notesSchema);
export default Notes;