import mongoose from 'mongoose';

const gameSchema = new mongoose.Schema({
    Rank: { type: Number, required: true },
    Name: { type: String, required: true },
    Platform: { type: String, required: true },
    Year: { type: Number, required: false },
    Genre: { type: String, required: true },
    Publisher: { type: String, required: false },
    NA_Sales: { type: Number, required: true },
    EU_Sales: { type: Number, required: true },
    JP_Sales: { type: Number, required: true },
    Other_Sales: { type: Number, required: true },
    Global_Sales: { type: Number, required: true }
});

const Game = mongoose.model('Game', gameSchema);

export default Game; // Varsayılan ihracat
