import React, {
  useEffect,
  useRef,
  useState,
  forwardRef,
  useImperativeHandle,
} from "react";
import {
  Engine,
  Render,
  Runner,
  Bodies,
  Composite,
  Events,
  Vector,
  Body,
} from "matter-js";
import { useToast } from "@/components/basic/Toast";

const startPins = 3;
const pinLines = 12;
const pinSize = 12.82;
const pinGap = 39;
const ballSize = 7;
const ballElasticity = 0.01;
const ballFriction = 0.0002;
const multipliers = [5, 4, 3, 2, 1, 0.8, 0.4, 0.8, 1, 2, 3, 4, 5];
const bucketColors = [
  "#FFAA05",
  "#FFAA05",
  "#FFD5AE",
  "#F5CEFF",
  "#ADE6CC",
  "#D2E3FC",
  "#E4F4E1",
  "#D2E3FC",
  "#ADE6CC",
  "#F5CEFF",
  "#FFD5AE",
  "#FFAA05",
  "#FFAA05",
];

interface GameProps {
  worldWidth: number;
}

export interface PlinkoMatterRef {
  setPreDefinedPaths: (paths: number[][]) => void;
}

const PlinkoMatter = forwardRef<PlinkoMatterRef, GameProps>(
  ({ worldWidth }, ref) => {
    const { addToast } = useToast();
    const renderRef = useRef<Render | null>(null);
    const gameContainerRef = useRef<HTMLDivElement>(null);
    const engineRef = useRef(Engine.create());
    const [predefinedPaths, setBallPath] = useState<number[][]>([]);
    const [isPlaying, setPlaying] = useState(false);
    const [finishedBalls, setFinishedBalls] = useState(0);
    const ballsRef = useRef<Body[]>([]);
    const currentBallIndexRef = useRef(0);

    useImperativeHandle(ref, () => ({
      setPreDefinedPaths: (paths: number[][]) => {
        setBallPath(paths);
        setPlaying(true);
        currentBallIndexRef.current = 0;
        addToast("Game started", "info");
      },
    }));

    useEffect(() => {
      const container = gameContainerRef.current;
      if (!container) return;

      const engine = engineRef.current;

      // Clear existing canvas if it exists
      container.innerHTML = "";

      renderRef.current = Render.create({
        element: container,
        engine: engine,
        options: {
          width: worldWidth,
          height: 600,
          wireframes: false,
          background: "transparent",
        },
      });

      const render = renderRef.current;

      const createWorld = () => {
        const pins: Body[] = [];
        const forceTrackers: Vector[] = [];
        const multiplierPositions: { body: Body; value: number }[] = [];

        // Create pins
        for (let l = 0; l < pinLines; l++) {
          const linePins = startPins + l;
          const lineWidth = linePins * pinGap;
          for (let i = 0; i < linePins; i++) {
            const pinX = worldWidth / 2 - lineWidth / 2 + i * pinGap;
            const pinY = 100 + l * pinGap;
            const pin = Bodies.circle(pinX, pinY, pinSize, {
              isStatic: true,
              render: { fillStyle: "#87CEEB" },
            });
            pins.push(pin);

            // Create buckets for the last row
            if (l === pinLines - 1 && i < linePins - 1) {
              createBucket(pinX, pinY, i, multiplierPositions);
            }
          }
        }

        // Create balls but don't add them to the world yet
        ballsRef.current = predefinedPaths.map((path) => {
          const dropBallPosition =
            path[0] === 1 ? worldWidth / 2.095 + 17 : worldWidth / 2.095 - 20;
          return Bodies.circle(dropBallPosition, 50, ballSize, {
            restitution: ballElasticity,
            friction: ballFriction,
            density: 0.4,
            render: { fillStyle: "#77DD77" },
          });
        });

        predefinedPaths.forEach(() => {
          forceTrackers.push(Vector.create(0, 0));
        });

        Composite.add(engine.world, [...pins]);
        return { pins, forceTrackers, multiplierPositions };
      };

      const createBucket = (
        pinX: number,
        pinY: number,
        index: number,
        multiplierPositions: { body: Body; value: number }[]
      ) => {
        const bucketX = pinX + pinGap / 2;
        const bucketY = pinY + pinGap;
        const bucketWidth = pinGap;
        const bucketHeight = 30;

        const leftSide = Bodies.rectangle(
          bucketX - bucketWidth / 2,
          bucketY + bucketHeight / 2,
          5,
          bucketHeight,
          { isStatic: true }
        );
        const rightSide = Bodies.rectangle(
          bucketX + bucketWidth / 2,
          bucketY + bucketHeight / 2,
          5,
          bucketHeight,
          { isStatic: true }
        );
        const bottomArea = Bodies.rectangle(
          bucketX,
          bucketY + bucketHeight / 2,
          bucketWidth - 10,
          bucketHeight,
          {
            isStatic: true,
            isSensor: true,
            render: { fillStyle: bucketColors[index % bucketColors.length] },
          }
        );

        multiplierPositions.push({
          body: bottomArea,
          value: multipliers[index],
        });
        Composite.add(engine.world, [leftSide, rightSide, bottomArea]);
      };

      const handleCollisions = () => {
        Events.on(engine, "collisionStart", (event) => {
          event.pairs.forEach((pair) => {
            const ball = ballsRef.current.find(
              (b) => b === pair.bodyA || b === pair.bodyB
            );
            const other = ball === pair.bodyA ? pair.bodyB : pair.bodyA;

            if (ball && !other.isSensor) {
              other.render.fillStyle = "#6CA4Bf";
              setTimeout(() => {
                other.render.fillStyle = "#87CEEB";
              }, 100);
            }

            if (ball && other.isSensor) {
              Body.scale(other, 1.2, 1.2);
              setTimeout(() => {
                Body.scale(other, 1 / 1.2, 1 / 1.2);
              }, 625);
              setFinishedBalls((prev) => prev + 1);
            }
          });
        });
      };

      const applyPredefinedPathForces = () => {
        Events.on(engine, "beforeUpdate", () => {
          ballsRef.current.forEach((ball, i) => {
            const path = predefinedPaths[i];
            const currentRow = Math.floor((ball.position.y - 100) / pinGap);
            if (path && path.length && currentRow < path.length - 1) {
              const force = calculateForce(
                ball,
                currentRow,
                path[currentRow + 1] === 0 ? -1 : 1
              );
              Body.applyForce(ball, ball.position, force);
            }
          });
        });
      };

      const calculateForce = (
        ball: Body,
        currentRow: number,
        direction: number
      ): Vector => {
        const distanceFromLastRow =
          ball.position.y - (100 + currentRow * pinGap);
        const normalizedDistance = Math.min(
          distanceFromLastRow / (pinGap / 2),
          1
        );
        const baseForceMagnitude = 0.006;
        const forceMagnitude =
          baseForceMagnitude * (1 - normalizedDistance ** 2);
        const angle = (Math.PI / 2) * normalizedDistance - 0.4;
        const forceX = Math.cos(angle - 6) * direction * forceMagnitude * 2.3;
        const forceY = Math.sin(angle + 1) * forceMagnitude * 1.2;
        return Vector.create(forceX, forceY);
      };

      const renderMultipliers = () => {
        Events.on(render, "afterRender", () => {
          const context = render.context as CanvasRenderingContext2D;
          context.font = "14px Arial";
          context.textAlign = "center";
          context.textBaseline = "middle";
          context.fillStyle = "black";

          multiplierPositions.forEach((pos) => {
            const bodyPosition = pos.body.position;
            context.fillText(
              pos.value.toString(),
              bodyPosition.x,
              bodyPosition.y
            );
          });
        });
      };

      const dropNextBall = () => {
        if (currentBallIndexRef.current < ballsRef.current.length) {
          const ball = ballsRef.current[currentBallIndexRef.current];
          Composite.add(engine.world, ball);
          currentBallIndexRef.current++;

          // Schedule the next ball drop
          if (currentBallIndexRef.current < ballsRef.current.length) {
            setTimeout(dropNextBall, 2000); // 2 second delay between balls
          }
        }
      };

      const { forceTrackers, multiplierPositions } = createWorld();

      handleCollisions();
      applyPredefinedPathForces();
      renderMultipliers();

      const runner = Runner.create();
      engine.timing.timeScale = 2;
      Runner.run(runner, engine);
      Render.run(render);

      // Start dropping balls when the game starts
      if (isPlaying) {
        dropNextBall();
      }

      return () => {
        Render.stop(render);
        Runner.stop(runner);
        Engine.clear(engine);
        renderRef.current = null;
      };
    }, [isPlaying, worldWidth, setFinishedBalls, predefinedPaths]);

    return <div ref={gameContainerRef} />;
  }
);

PlinkoMatter.displayName = "PlinkoMatter";

export default PlinkoMatter;
