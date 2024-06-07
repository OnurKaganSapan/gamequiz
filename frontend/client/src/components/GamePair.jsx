import React from 'react';
import { Button, Card, CardContent, Typography, Box } from '@mui/material';

const GamePair = ({ games, onGuess, showSales, disabled }) => {
  if (games.length !== 2) {
    return null;
  }

  return (
    <Box className="container" sx={{ mt: 4 }}>
      <Typography variant="h4" component="h3" align="center">Which game sold more?</Typography>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mt: 2, flexWrap: 'wrap', gap: 2 }}>
        {showSales && (
          <Typography variant="h6" component="p" sx={{ mr: 2 }}>
            {games[0].total_sales}M
          </Typography>
        )}
        <Card sx={{ width: { xs: '100%', md: 300 }, textAlign: 'center', mx: 2 }}>
          <CardContent>
            <Box
              component="img"
              src={games[0].imageUrl}
              alt={games[0].title}
              sx={{
                width: '100%',
                height: 'auto',
                maxHeight: '300px',
                objectFit: 'contain',
                mb: 2,
                borderRadius: 1
              }}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={() => onGuess(games[0], games[1])}
              disabled={disabled}
              fullWidth
            >
              {games[0].title}
            </Button>
          </CardContent>
        </Card>
        <Typography variant="h4" component="span" sx={{ mx: 2 }}>vs</Typography>
        <Card sx={{ width: { xs: '100%', md: 300 }, textAlign: 'center', mx: 2 }}>
          <CardContent>
            <Box
              component="img"
              src={games[1].imageUrl}
              alt={games[1].title}
              sx={{
                width: '100%',
                height: 'auto',
                maxHeight: '300px',
                objectFit: 'contain',
                mb: 2,
                borderRadius: 1
              }}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={() => onGuess(games[1], games[0])}
              disabled={disabled}
              fullWidth
            >
              {games[1].title}
            </Button>
          </CardContent>
        </Card>
        {showSales && (
          <Typography variant="h6" component="p" sx={{ ml: 2 }}>
            {games[1].total_sales}M
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default GamePair;
