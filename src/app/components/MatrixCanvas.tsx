import React, { useEffect, useRef } from 'react';

const MatrixCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    let matrixInterval: number;
    
    // Set canvas dimensions to window size
    const resizeCanvas = () => {
      if (!canvas) return;
      
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      
      // Restart animation if already running
      if (window.matrixInterval) {
        clearInterval(window.matrixInterval);
        setupMatrixAnimation();
      }
    };
    
    // Initialize the matrix animation
    const setupMatrixAnimation = () => {
      if (!canvas || !ctx) return;
      
      const fontSize = 14;
      const columns = Math.floor(canvas.width / fontSize);
      
      // Arrays for column properties
      const drops: number[] = [];
      const characters: string[][] = [];
      const speeds: number[] = [];
      const opacities: number[] = [];
      const green: number[] = [];
      
      // Character sets
      const allChars = "01abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789$><=;:~`[]{}()!@#%^&*_-+|\\/?.,\"'";
      
      // Initialize columns
      for (let i = 0; i < columns; i++) {
        drops[i] = Math.random() * -100;
        characters[i] = [];
        speeds[i] = 0.5 + Math.random() * 1.5;
        opacities[i] = 0.7 + Math.random() * 0.3;
        green[i] = 50 + Math.floor(Math.random() * 160);
        
        // Create characters for each column
        for (let j = 0; j < 50; j++) {
          characters[i][j] = allChars.charAt(Math.floor(Math.random() * allChars.length));
        }
      }
      
      // Animation loop
      matrixInterval = window.setInterval(() => {
        // Create trail effect with semi-transparent black overlay
        ctx.fillStyle = "rgba(0, 0, 0, 0.04)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Draw columns
        for (let i = 0; i < columns; i++) {
          // Randomly skip columns for performance and visual variety
          if (Math.random() > 0.7) continue;
          
          // Current Y position
          const posY = drops[i] * fontSize;
          
          // Draw characters in this column
          for (let j = 0; j < 20; j++) {
            const y = posY - j * fontSize;
            
            // Only draw visible characters
            if (y > -fontSize && y < canvas.height) {
              // Head character is brighter
              const charOpacity = j === 0 ? 1 : opacities[i] * (1 - j / 20);
              const g = j === 0 ? 255 : green[i];
              
              ctx.fillStyle = `rgba(0, ${g}, 0, ${charOpacity})`;
              
              // Randomly change characters
              if (Math.random() < 0.02) {
                characters[i][j] = allChars.charAt(Math.floor(Math.random() * allChars.length));
              }
              
              // Draw character
              ctx.font = `${fontSize}px monospace`;
              
              // Add glow effect to some characters
              if (j === 0 || Math.random() < 0.01) {
                ctx.shadowColor = "rgba(0, 255, 0, 0.8)";
                ctx.shadowBlur = 10;
              } else {
                ctx.shadowBlur = 0;
              }
              
              ctx.fillText(characters[i][j], i * fontSize, y);
              ctx.shadowBlur = 0;
            }
          }
          
          // Move drops down
          drops[i] += speeds[i];
          
          // Reset drops that reach bottom
          if (posY > canvas.height && Math.random() > 0.99) {
            drops[i] = Math.random() * -100;
            speeds[i] = 0.5 + Math.random() * 1.5;
          }
        }
      }, 100);
      
      // Store the interval ID in window so we can reference it later
      window.matrixInterval = matrixInterval;
    };
    
    // Set up event listeners and start
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    setupMatrixAnimation();
    
    // Cleanup function
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (matrixInterval) {
        clearInterval(matrixInterval);
      }
      if (window.matrixInterval) {
        clearInterval(window.matrixInterval);
        window.matrixInterval = null;
      }
    };
  }, []);
  
  return <canvas ref={canvasRef} id="matrix-canvas" aria-hidden="true"></canvas>;
};

export default MatrixCanvas;