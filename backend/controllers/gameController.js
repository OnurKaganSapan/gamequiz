import Game from '../models/game.js';
import axios from 'axios';

// RAWG API Anahtarı ve Endpoint
const RAWG_API_KEY = '389c86627f874688a7561224fa6988db';
const RAWG_ENDPOINT = 'https://api.rawg.io/api/games';
const DEFAULT_IMAGE_URL = 'https://via.placeholder.com/200x300?text=No+Image'; // Varsayılan resim URL'si

// Oyun adlarını temizleme fonksiyonu
const cleanGameName = (name) => {
    return name.replace(/[^\w\s]/gi, '').replace(/\s+/g, ' ').trim();
};

// RAWG API üzerinden resim URL'si çekme fonksiyonu
const getRawgImageUrl = async (gameName) => {
    try {
        const response = await axios.get(RAWG_ENDPOINT, {
            params: {
                key: RAWG_API_KEY,
                search: gameName,
                page_size: 1
            }
        });
        const results = response.data.results;
        if (results.length > 0 && results[0].background_image) {
            return results[0].background_image;
        }
        return DEFAULT_IMAGE_URL;
    } catch (error) {
        console.error('Error fetching image from RAWG:', error);
        return DEFAULT_IMAGE_URL;
    }
};

export const getGamesPair = async (req, res) => {
    try {
        // 1 milyon satıştan fazla olan oyunları al
        const topGames = await Game.aggregate([
            { $match: { total_sales: { $gt: 1 } } },
            { $sample: { size: 2 } } // Rastgele iki oyun seç
        ]);

        // Her iki oyun için resim URL'si çek
        for (const game of topGames) {
            const cleanedName = cleanGameName(game.title);
            game.imageUrl = await getRawgImageUrl(cleanedName);
        }

        console.log('Games pair fetched:', topGames);
        res.json(topGames);
    } catch (error) {
        console.error('Error fetching games pair:', error);
        res.status(500).json({ message: error.message });
    }
};
