import React, { useState, useEffect } from 'react';
import axios from 'axios';
import GamePair from '../components/GamePair';
import { Container, Typography, Box, Paper } from '@mui/material';

const Home = () => {
  const [gamesPair, setGamesPair] = useState([]);
  const [score, setScore] = useState(0);
  const [showSales, setShowSales] = useState(false);
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    fetchGamesPair();
  }, []);

  const fetchGamesPair = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/games/pair');
      setGamesPair(response.data);
      setShowSales(false); // Yeni oyun çifti geldiğinde satış sayılarını gizle
      setDisabled(false); // Butonları aktif hale getir
    } catch (error) {
      console.error('Error fetching games pair:', error);
    }
  };

  const handleGuess = (guessedGame, otherGame) => {
    if (guessedGame.total_sales > otherGame.total_sales) {
      setScore(score + 1);
    } else {
      setScore(0); // Yanlış tahmin, skoru sıfırla
    }
    setShowSales(true); // Satış sayılarını göster
    setDisabled(true); // Butonları pasif hale getir
    setTimeout(fetchGamesPair, 1000); // 3 saniye sonra yeni oyun çifti getir
  };

  return (
    <Container sx={{ mt: 2 }} className="container">
      <Paper elevation={3} sx={{ p: 2, mb: 4, textAlign: 'center', backgroundColor: '#00796b', color: 'white' }}>
        <Typography variant="h3" component="h1">
          Score: {score}
        </Typography>
      </Paper>
      <GamePair games={gamesPair} onGuess={handleGuess} showSales={showSales} disabled={disabled} />
    </Container>
  );
};

export default Home;
