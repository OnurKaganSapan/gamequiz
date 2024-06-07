import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import gameRoutes from './routes/gameRoutes.js';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Bağlantısı
const dbUrl = 'mongodb+srv://onurkagan999:qwerdf1234@cluster0.pfrndcu.mongodb.net/gamequiz?retryWrites=true&w=majority';

mongoose.connect(dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

// Bağlantı başarılı olursa, "MongoDB connected" mesajını konsola yazdırır.
mongoose.connection.on('connected', () => {
    console.log('MongoDB connected');
    mongoose.connection.db.listCollections().toArray((err, names) => {
        if (err) {
            console.error('Error listing collections:', err);
        } else {
            console.log('Collections:', names);
        }
    });
});

// Bağlantı başarısız olursa, hata mesajını konsola yazdırır.
mongoose.connection.on('error', err => console.log(err));

// Test rotası
app.get('/api/test', async (req, res) => {
    try {
        const games = await mongoose.connection.db.collection('games').find().limit(10).toArray();
        res.json(games);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Rotalar
app.use('/api/games', gameRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
