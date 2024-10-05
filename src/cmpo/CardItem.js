import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import './CardItem.css';

const CardItem = ({ image, title, description, comingSoon }) => {
  return (
    <div className='bb1'>
    <Box className="card-container">
      <img src={image} alt={title} className="card-image" />
      <Typography variant="h6" className="card-title">
        {title}
      </Typography>
      <Typography className="card-description">
        {description}
      </Typography>
      {comingSoon && (
        <Button
          variant="contained"
          color="error"
          disabled
          className="coming-soon-button"
        >
          Coming Soon
        </Button>
      )}
    </Box>
    </div>
  );
};

export default CardItem;
