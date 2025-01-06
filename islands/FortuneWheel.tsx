// islands/FortuneWheel.tsx
import { h } from "preact";
import { useEffect, useRef, useState } from "preact/hooks";

interface WheelComponentProps {
  segments?: string[];
  segColors?: string[];
  winningSegment?: string;
  onFinished?: (segment: string) => void;
  primaryColor?: string;
  contrastColor?: string;
  buttonText?: string;
  isOnlyOnce?: boolean;
  size?: number;
  upDuration?: number;
  downDuration?: number;
  fontFamily?: string;
  fontSize?: string;
}

const WheelComponent = ({
  segments = [
    "Coca Cola",
    "Fanta",
    "Sprite",
    "Ice Tea",
    "Orangina",
    "Red Bull",
    "7Up",
    "Dr Pepper"
  ],
  segColors = [
    "#EE4040",
    "#F0CF50",
    "#815CD1",
    "#3DA5E0",
    "#34A24F",
    "#F9AA1F",
    "#EC3F3F",
    "#FF9000"
  ],
  winningSegment,
  onFinished = (segment: string) => console.log("Finished!", segment),
  primaryColor = "black",
  contrastColor = "white",
  buttonText = "TOURNER",
  isOnlyOnce = true,
  size = 290,
  upDuration = 100,
  downDuration = 1000,
  fontFamily = "sans-serif",
  fontSize = "1em",
}: WheelComponentProps) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isFinished, setFinished] = useState(false);
  const [isStarted, setIsStarted] = useState(false);
  const [currentSegment, setCurrentSegment] = useState("");

  const timerHandle = useRef<number>(0);
  const angleCurrent = useRef(0);
  const angleDelta = useRef(0);
  const maxSpeed = Math.PI / segments.length;
  const upTime = segments.length * upDuration;
  const downTime = segments.length * downDuration;
  const dimension = (size + 20) * 2;
  const centerX = size + 20;
  const centerY = size + 20;

  useEffect(() => {
    // Wait for next tick to ensure canvas is mounted
    setTimeout(() => {
      if (canvasRef.current) {
        const ctx = canvasRef.current.getContext('2d');
        if (ctx) {
          console.log("Canvas context obtained, drawing initial wheel");
          drawWheel(ctx);
        }
      }
    }, 0);
  }, []);

  const spin = () => {
    if (isStarted || !canvasRef.current) return;
    setIsStarted(true);

    const ctx = canvasRef.current.getContext('2d');
    if (!ctx) return;

    const spinStart = new Date().getTime();
    
    timerHandle.current = window.setInterval(() => {
      const duration = new Date().getTime() - spinStart;
      let progress = 0;
      let finished = false;

      if (duration < upTime) {
        progress = duration / upTime;
        angleDelta.current = maxSpeed * Math.sin((progress * Math.PI) / 2);
      } else {
        progress = duration / downTime;
        angleDelta.current = maxSpeed * Math.sin((progress * Math.PI) / 2 + Math.PI / 2);

        if (progress >= 1) finished = true;
      }

      angleCurrent.current += angleDelta.current;
      while (angleCurrent.current >= Math.PI * 2) {
        angleCurrent.current -= Math.PI * 2;
      }

      if (finished) {
        setFinished(true);
        onFinished(currentSegment);
        clearInterval(timerHandle.current);
        timerHandle.current = 0;
        angleDelta.current = 0;
      }

      draw(ctx);
    }, 1000 / 60); // 60 FPS
  };

  const draw = (ctx: CanvasRenderingContext2D) => {
    ctx.clearRect(0, 0, dimension, dimension);
    drawWheel(ctx);
    drawNeedle(ctx);
  };

  const drawSegment = (ctx: CanvasRenderingContext2D, key: number, lastAngle: number, angle: number) => {
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.arc(centerX, centerY, size, lastAngle, angle, false);
    ctx.lineTo(centerX, centerY);
    ctx.closePath();
    ctx.fillStyle = segColors[key];
    ctx.fill();
    ctx.stroke();
    
    // Draw segment text
    ctx.save();
    ctx.translate(centerX, centerY);
    ctx.rotate((lastAngle + angle) / 2);
    ctx.textAlign = "right";
    ctx.fillStyle = contrastColor;
    ctx.font = `bold ${fontSize} ${fontFamily}`;
    ctx.fillText(segments[key].substring(0, 21), size - 10, 0);
    ctx.restore();
  };

  const drawWheel = (ctx: CanvasRenderingContext2D) => {
    let lastAngle = angleCurrent.current;

    ctx.lineWidth = 1;
    ctx.strokeStyle = primaryColor;
    ctx.textBaseline = "middle";
    ctx.textAlign = "center";
    ctx.font = `${fontSize} ${fontFamily}`;

    for (let i = 0; i < segments.length; i++) {
      const angle = (Math.PI * 2 * ((i + 1) / segments.length)) + angleCurrent.current;
      drawSegment(ctx, i, lastAngle, angle);
      lastAngle = angle;
    }

    // Draw center button
    ctx.beginPath();
    ctx.arc(centerX, centerY, 40, 0, Math.PI * 2, false);
    ctx.closePath();
    ctx.fillStyle = primaryColor;
    ctx.lineWidth = 5;
    ctx.strokeStyle = contrastColor;
    ctx.fill();
    ctx.font = `bold 1em ${fontFamily}`;
    ctx.fillStyle = contrastColor;
    ctx.textAlign = "center";
    ctx.fillText(buttonText, centerX, centerY + 3);
    ctx.stroke();

    // Draw outer circle
    ctx.beginPath();
    ctx.arc(centerX, centerY, size, 0, Math.PI * 2, false);
    ctx.closePath();
    ctx.lineWidth = 10;
    ctx.strokeStyle = primaryColor;
    ctx.stroke();
  };

  const drawNeedle = (ctx: CanvasRenderingContext2D) => {
    ctx.lineWidth = 1;
    ctx.strokeStyle = contrastColor;
    ctx.fillStyle = contrastColor;
    ctx.beginPath();
    ctx.moveTo(centerX + 20, centerY - 50);
    ctx.lineTo(centerX - 20, centerY - 50);
    ctx.lineTo(centerX, centerY - 70);
    ctx.closePath();
    ctx.fill();

    const change = angleCurrent.current + Math.PI / 2;
    let i = segments.length - Math.floor((change / (Math.PI * 2)) * segments.length) - 1;
    if (i < 0) i = i + segments.length;
    
    setCurrentSegment(segments[i]);
    
    if (isStarted) {
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillStyle = primaryColor;
      ctx.font = `bold 1.5em ${fontFamily}`;
      ctx.fillText(segments[i], centerX + 10, centerY + size + 50);
    }
  };

  return (
    <div class="relative w-full max-w-lg mx-auto">
      <canvas
        ref={canvasRef}
        width={dimension}
        height={dimension}
        onClick={spin}
        class={`cursor-pointer mx-auto ${isFinished && isOnlyOnce ? "pointer-events-none" : ""}`}
        style={{
          width: `${dimension}px`,
          height: `${dimension}px`,
        }}
      />
    </div>
  );
};

export default WheelComponent;
