import { useEffect, useRef } from 'react';

interface AudioVisualizerProps {
  audioData: number[];
}

export const AudioVisualizer = ({ audioData }: AudioVisualizerProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    const barWidth = width / audioData.length;

    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = '#D9B8C4';

    audioData.forEach((value, index) => {
      const barHeight = value * height;
      const x = index * barWidth;
      const y = height - barHeight;
      
      ctx.fillRect(x, y, barWidth - 1, barHeight);
    });
  }, [audioData]);

  return (
    <canvas 
      ref={canvasRef} 
      width={300} 
      height={100} 
      className="rounded-xl bg-quaternary/20 backdrop-blur-sm"
    />
  );
};