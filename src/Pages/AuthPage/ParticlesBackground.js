import React from 'react';
import { Particles } from '@tsparticles/react';
import { loadSlim } from '@tsparticles/slim'; // smaller bundle

const ParticlesBackground = () => {
  const particlesInit = async (engine) => {
    await loadSlim(engine); // you can use loadFull if you want more features
  };

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      options={{
        fullScreen: { enable: true, zIndex: -1 },
        background: { color: '#0f172a' }, // deep blue background
        particles: {
          number: { value: 80, density: { enable: true, area: 800 } },
          color: { value: '#38bdf8' }, // bright cyan
          shape: { type: 'circle' },
          opacity: {
            value: 0.5,
            random: true,
            anim: { enable: true, speed: 0.5, opacity_min: 0.1, sync: false },
          },
          size: {
            value: 3,
            random: { enable: true, minimumValue: 1 },
          },
          links: {
            enable: true,
            distance: 150,
            color: '#60a5fa',
            opacity: 0.4,
            width: 1,
          },
          move: {
            enable: true,
            speed: 1.2,
            direction: 'none',
            outModes: { default: 'bounce' },
            random: false,
            straight: false,
          },
        },
        interactivity: {
          events: {
            onHover: { enable: true, mode: 'grab' },
            onClick: { enable: true, mode: 'push' },
            resize: true,
          },
          modes: {
            grab: {
              distance: 200,
              links: { opacity: 0.5 },
            },
            push: { quantity: 4 },
            repulse: { distance: 100, duration: 0.4 },
          },
        },
        detectRetina: true,
      }}
    />
  );
};

export default ParticlesBackground;
