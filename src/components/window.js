import React, { useState, useCallback } from 'react';
import { Card, Typography } from '@mui/material';
import { styled } from '@mui/system';
import { loadFull } from 'tsparticles';
import Particles from 'react-tsparticles';

// Define a set of modern, smooth colors for the card backgrounds
const colors = [
  '#FFB6C1', // Light Pink
  '#B0E0E6', // Powder Blue
  '#D8BFD8', // Thistle
  '#E0FFFF', // Light Cyan
  '#F5DEB3', // Wheat
  '#FFF0F5', // Lavender Blush
  '#F0FFF0', // Honeydew
  '#D3D3D3', // Light Gray
];

const getRandomColor = () => colors[Math.floor(Math.random() * colors.length)];

const FlipCard = styled('div')`
  width: 100%;
  height: 100%;
  perspective: 1000px;
  position: relative; /* For particles positioning */
`;

const CardInner = styled('div')`
  width: 100%;
  height: 100%;
  transform-style: preserve-3d;
  transition: transform 0.6s;
  transform: ${(props) => (props.isOpen ? 'rotateY(180deg)' : 'rotateY(0deg)')};
`;

const CardFront = styled(Card)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.color};
  border-radius: 10px;
`;

const CardBack = styled(Card)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  background-color: ${(props) => props.color};
  display: flex;
  justify-content: center;
  align-items: center;
  transform: rotateY(180deg);
  border-radius: 10px;
`;

const Window = ({ number, message, isOpen, toggleWindow }) => {
  const [cardColor] = useState(getRandomColor());
  const [showParticles, setShowParticles] = useState(false);

  const getCardStyle = (number) => {
    const specialDays = [1, 6, 8, 15, 22];
    return specialDays.includes(number);
  };

  const numberColor = '#333';
  const isSpecial = getCardStyle(number);

  const particlesInit = useCallback(async (engine) => {
    await loadFull(engine); // Load additional plugins
  }, []);

  const particlesOptions = {
    fullScreen: { enable: false },
    particles: {
      number: {
        value: 150, // Increase the number of particles for more density
        density: {
          enable: true,
          value_area: 800,
        },
      },
      size: {
        value: 6, // Larger particles
        random: true, // Randomize particle size
        anim: {
          enable: true,
          speed: 5, // Speed of particle size animation
          size_min: 2, // Minimum size of particles
        },
      },
      opacity: {
        value: 1,
        random: true,
        anim: {
          enable: true,
          speed: 0.5,
          opacity_min: 0.2,
        },
      },
      shape: {
        type: 'circle', // You can change this to 'star' or 'polygon' for different shapes
      },
      color: {
        value: colors,
      },
      move: {
        enable: true,
        speed: 6, // Increased speed for faster movement
        direction: 'none', // Directionless movement
        random: true, // Random movement paths
        outModes: {
          default: 'out', // Particles will move out of the screen
        },
        attract: {
          enable: false,
        },
      },
    },
    emitters: {
      direction: 'none',
      life: {
        count: 1,
        duration: 0.5, // Particles last a little longer
      },
      rate: {
        delay: 0.1,
        quantity: 50, // Generate a good number of particles per time
      },
      position: {
        x: 50,
        y: 50,
      },
      size: {
        width: 100,
        height: 100,
      },
    },
    interactivity: {
      detectsOn: 'canvas',
      events: {
        onHover: {
          enable: true,
          mode: 'repulse', // Repulse effect on hover
        },
        onClick: {
          enable: true,
          mode: 'push', // Add particles on click
        },
      },
      modes: {
        repulse: {
          distance: 100, // Repulsion distance
          duration: 0.4,
        },
        push: {
          particles_nb: 10, // Number of particles added on click
        },
      },
    },
    retina_detect: true, // Ensures proper display on high-res screens
  };

  const handleClick = () => {
    setShowParticles(true);
    setTimeout(() => setShowParticles(false), 500); // Show particles for a short time
    toggleWindow();
  };

  return (
    <FlipCard onClick={handleClick}>
      {showParticles && (
        <Particles
          id="tsparticles"
          options={particlesOptions}
          init={particlesInit}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            pointerEvents: 'none',
            zIndex: 9999, // Ensure particles are rendered above card
          }}
        />
      )}

      <CardInner isOpen={isOpen}>
        <CardFront color={cardColor} isSpecial={isSpecial}>
          <div>
            {isSpecial ? (
              <Typography variant="h4" style={{ color: '#FFD700' }}>
                {number}
              </Typography>
            ) : (
              <Typography variant="h4" style={{ color: numberColor }}>
                {number}
              </Typography>
            )}
          </div>
        </CardFront>
        <CardBack color={cardColor}>
          <Typography variant="h6" style={{ color: '#000' }} align="center">
            {message}
          </Typography>
        </CardBack>
      </CardInner>
    </FlipCard>
  );
};

export default Window;
