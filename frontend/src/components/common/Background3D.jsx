import { useEffect, useRef, useState } from 'react';
import './Background3D.css';

const Background3D = () => {
  const canvasRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.ref ? canvasRef.ref : canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const particles = [];
    const particleCount = 100;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', resize);
    resize();

    class Particle {
      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 0.5;
        this.speedX = (Math.random() - 0.5) * 0.5;
        this.speedY = (Math.random() - 0.5) * 0.5;
        this.opacity = Math.random() * 0.5 + 0.2;
        this.color = Math.random() > 0.5 ? '#06b6d4' : '#7c3aed'; // Cyan or Purple
      }

      update(mx, my) {
        this.x += this.speedX + mx * 0.1;
        this.y += this.speedY + my * 0.1;

        if (this.x < 0) this.x = canvas.width;
        if (this.x > canvas.width) this.x = 0;
        if (this.y < 0) this.y = canvas.height;
        if (this.y > canvas.height) this.y = 0;
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.globalAlpha = this.opacity;
        ctx.shadowBlur = 10;
        ctx.shadowColor = this.color;
        ctx.fill();
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    let mx = 0, my = 0;
    const handleMouseMove = (e) => {
      mx = (e.clientX / window.innerWidth) * 2 - 1;
      my = (e.clientY / window.innerHeight) * 2 - 1;
      setMousePos({ x: mx, y: my });
    };

    window.addEventListener('mousemove', handleMouseMove);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.update(mx, my);
        p.draw();
      });
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="futuristic-bg">
      {/* Background Canvas for Particles */}
      <canvas ref={canvasRef} className="bg-canvas" />

      {/* Atmospheric Mesh Gradients */}
      <div className="bg-light-source bg-light-purple" />
      <div className="bg-light-source bg-light-cyan" />
      <div className="bg-light-source bg-light-blue" />

      {/* Floating 3D Geometric Shapes (Glassmorphism) */}
      <div className="geometric-elements">
        <div 
          className="geo-shape geo-cube animate-float-1" 
          style={{ transform: `translate(${mousePos.x * 40}px, ${mousePos.y * 40}px) rotateX(${mousePos.y * 20}deg) rotateY(${mousePos.x * 20}deg)` }}
        >
          <div className="cube-face" />
          <div className="cube-face" />
          <div className="cube-face" />
          <div className="cube-face" />
        </div>

        <div 
          className="geo-shape geo-orb animate-float-2" 
          style={{ transform: `translate(${mousePos.x * -60}px, ${mousePos.y * -30}px) scale(${1 + Math.abs(mousePos.x) * 0.1})` }}
        />

        <div 
          className="geo-shape geo-pyramid animate-float-3" 
          style={{ transform: `translate(${mousePos.x * 20}px, ${mousePos.y * -50}px) rotate(${mousePos.x * 45}deg)` }}
        >
          <div className="tri" />
        </div>
      </div>

      {/* Cinematic Overlays */}
      <div className="bg-grid-overlay" />
      <div className="bg-vignette" />
      <div className="bg-scanline" />
    </div>
  );
};

export default Background3D;
