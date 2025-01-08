import { h } from "preact";
import { useEffect, useRef, useState } from "preact/hooks";

interface Segment {
  name: string;
  color: string;
  size: number;
  icon: string;
}

const WheelComponent = ({
  segments = [
    {
      name: "Cookie",
      color: "#EE4040",
      size: 2,
      icon: "../static/icones/cookie-solid-svgrepo-com.svg",
    },
    {
      name: "Cacahuète",
      color: "#815CD1",
      size: 10,
      icon: "../static/icones/peanut-4-svgrepo-com.svg",
    },
    {
      name: "Cocktail",
      color: "#3DA5E0",
      size: 1,
      icon: "../static/icones/drink-cocktail-svgrepo-com.svg",
    },
    {
      name: "Frites",
      color: "#34A24F",
      size: 3,
      icon: "../static/icones/french-fries-svgrepo-com.svg",
    },
    {
      name: "Canette",
      color: "#F9AA1F",
      size: 2,
      icon: "../static/icones/can-juice-1-svgrepo-com.svg",
    },
  ],
  onFinished = (segment: string) => console.log("Finished!", segment),
  buttonText = "SPIN",
  size = 290,
  upDuration = 100, // Speed up duration in milliseconds
  downDuration = 1000, // Slow down duration in milliseconds
  fontFamily = "sans-serif",
  fontSize = "1em",
  primaryColor = "black",
  contrastColor = "white",
}) => {
  // In preact every time a component is rendered its internal variable are redeclared so value are closePath
  // a useState variable triggers rerender each time it is set and the state is different
  // In the case of our Canva we don't want to use useState to avoid flickering with unecessary rerender by using setter in the canva reference
  // and we can not use a standard variable because
  // Therefore we use useRef that creates a stable ref persistent across render, and which do not trigger render upon changes
  // UseRef also assure that that the ref will be populated with the DOM element before the component has rendered, therefore when useEffect and canva.current.ctx is called the DOM is there
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  // In the case of isSpinning that indicates if the wheel is still spinning we want to trigger a rerender this is why we use a stateful hook
  const [isSpinning, setIsSpinning] = useState(false);
  const [currentSegment, setCurrentSegment] = useState("");
  const [previousSegment, setPreviousSegment] = useState("");
  const [isFinished, setIsFinished] = useState(false);

  const animationFrameId = useRef<number | null>(null);
  const angleCurrent = useRef(0); // current rotation angle of the wheel
  const angleDelta = useRef(0); // amount of angle to add on each spin step

  const totalSize = segments.reduce((sum, segment) => sum + segment.size, 0);
  const maxSpeed = Math.PI / totalSize; // Max spin speed based on total size

  // Calculate times based on number of segments and durations passed as props
  const upTime = totalSize * upDuration;
  const downTime = totalSize * downDuration;

  // Total dimension of the canvas = circle diameter + padding
  const dimension = (size + 20) * 2;
  const centerX = size + 20; // Center X of the circle in the canvas
  const centerY = size + 20; // Center Y of the circle in the canvas
  // useEffect takes 2 arguments
  // 1. An argument less callback that apply the effect
  // 2. The return value of the callback is a cleanup function run before the component unmount or before rerunning the effect
  // 3. The dependencies array if we want to apply effect only if the dependecies change we can specify them in the second argument if not effect is applied at each rerender

  // We make sure to get the ctx to acess canvas API
  useEffect(() => {
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext("2d");
      if (ctx) {
        drawWheel(ctx); // Draw initial wheel
      }
    }
  }, []);

  const spin = () => {
    if (isSpinning || !canvasRef.current) return; // Prevent multiple spins

    // Setting IsSpinning to true prevent the user from respinning with th eabove condition
    setIsSpinning(true);
    setIsFinished(false);
    setPreviousSegment(currentSegment);

    // Safeguard if the Canva API isn't avaible to prevent runtime error
    const ctx = canvasRef.current.getContext("2d");
    if (!ctx) return;

    const spinStart = new Date().getTime(); // Start time for tracking spin duration

    const animateSpin = () => {
      const duration = new Date().getTime() - spinStart;
      let progress = 0;
      let finished = false;

      if (duration < upTime) {
        progress = duration / upTime;
        angleDelta.current = maxSpeed * Math.sin((progress * Math.PI) / 2);
      } else {
        progress = duration / downTime;
        angleDelta.current = maxSpeed *
          Math.sin((progress * Math.PI) / 2 + Math.PI / 2);

        if (progress >= 1) finished = true;
      }

      angleCurrent.current += angleDelta.current; // increment angle for rotation
      while (angleCurrent.current >= Math.PI * 2) {
        angleCurrent.current -= Math.PI * 2; // keep angle in range of 2PI
      }

      draw(ctx);

      if (finished) {
        setIsSpinning(false);
        setIsFinished(true);
        onFinished(currentSegment); // Callback with the winner segment
        animationFrameId.current = null;
        return;
      }

      animationFrameId.current = requestAnimationFrame(animateSpin);
    };

    animateSpin();
  };

  const draw = (ctx: CanvasRenderingContext2D) => {
    ctx.clearRect(0, 0, dimension, dimension); // Clear canvas before drawing
    drawWheel(ctx); // Redraw the wheel with updated angle
    drawNeedle(ctx); // Redraw the needle
  };

  const drawSegment = (
    ctx: CanvasRenderingContext2D,
    segment: Segment,
    lastAngle: number,
    angle: number,
  ) => {
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.arc(centerX, centerY, size, lastAngle, angle, false);
    ctx.lineTo(centerX, centerY);
    ctx.closePath();
    ctx.fillStyle = segment.color;
    ctx.fill();
    ctx.stroke();

    // Draw segment text and icon
    ctx.save();
    ctx.translate(centerX, centerY);
    ctx.rotate((lastAngle + angle) / 2);
    ctx.textAlign = "right";

    const textYOffset = -10;
    ctx.fillStyle = contrastColor;
    ctx.font = `bold ${fontSize} ${fontFamily}`;
    ctx.fillText(segment.name.substring(0, 21), size - 15, textYOffset);

    const iconSize = 20;
    const img = new Image();
    img.src = segment.icon;
    console.log("Image src:", segment.icon); // Log image source

    img.onload = () => {
      console.log("Image loaded:", segment.icon); // Log when image loads
      ctx.save();
      ctx.translate(size - 15, textYOffset + 5);
      ctx.rotate(-(lastAngle + angle) / 2);
      ctx.drawImage(img, -iconSize / 2, -iconSize / 2, iconSize, iconSize);
      ctx.restore();
    };

    img.onerror = () => {
      console.error("Error loading image:", segment.icon);
    };

    // Check if the image is already loaded first to avoid race conditions
    if (img.complete && img.naturalWidth !== 0) {
      console.log("Image was already loaded:", segment.icon);
      ctx.save();
      ctx.translate(size - 15, textYOffset + 5);
      ctx.rotate(-(lastAngle + angle) / 2);
      ctx.drawImage(img, -iconSize / 2, -iconSize / 2, iconSize, iconSize);
      ctx.restore();
    } else if (!img.complete) {
      console.log(
        "Image is not loaded yet, setting event listener: ",
        segment.icon,
      );
    }
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
      const angle = Math.PI *
          2 *
          (segments.slice(0, i + 1).reduce((sum, seg) => sum + seg.size, 0) /
            totalSize) +
        angleCurrent.current;
      drawSegment(ctx, segments[i], lastAngle, angle);
      lastAngle = angle;
    }

    // Draw the center button
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

    // calculate current selected segment
    const change = angleCurrent.current + Math.PI / 2;
    let i = segments.length - Math.floor((change / (Math.PI * 2)) * totalSize) -
      1;
    if (i < 0) i = i + segments.length;

    // Find the segment based on the cumulative size and the calculated index
    let cumulativeSize = 0;
    let currentSegmentIndex = 0;
    for (let j = 0; j < segments.length; j++) {
      cumulativeSize += segments[j].size;
      if (i < cumulativeSize) {
        currentSegmentIndex = j;
        break;
      }
    }

    setCurrentSegment(segments[currentSegmentIndex].name);

    // Draw the segment name on top after spin
    if (isSpinning) {
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillStyle = primaryColor;
      ctx.font = `bold 1.5em ${fontFamily}`;
      ctx.fillText(
        segments[currentSegmentIndex].name,
        centerX + 10,
        centerY + size + 50,
      );
    }
  };

  return (
    <div class="relative w-full max-w-lg mx-auto">
      <canvas
        ref={canvasRef}
        width={dimension}
        height={dimension}
        onClick={spin}
        class="cursor-pointer mx-auto"
        style={{
          width: `${dimension}px`,
          height: `${dimension}px`,
        }}
      />
      {isFinished && (
        <p class="mt-4 text-center text-lg text-gray-700">
          Félicitations, tu as reçu le droit de réclamer: {currentSegment}
        </p>
      )}
    </div>
  );
};
export default WheelComponent;
