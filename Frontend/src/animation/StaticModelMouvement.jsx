import React, { useEffect, useRef, useState } from "react";
import Matter from "matter-js";

export default function StaticModelMouvement({ data }) {
  const sceneRef = useRef(null);
  const engineRef = useRef(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    const engine = Matter.Engine.create();
    const world = engine.world;
    engineRef.current = engine;

    const render = Matter.Render.create({
      element: sceneRef.current,
      engine: engine,
      options: {
        width: 400,
        height: 400,
        wireframes: false,
        background: "black",
      },
    });

    // Add invisible boundary walls to keep the animation inside the canvas
    const wallThickness = 50;
    const walls = [
      // bottom wall
      Matter.Bodies.rectangle(200, 400 + wallThickness / 2, 400, wallThickness, { isStatic: true }),
      // top wall
      Matter.Bodies.rectangle(200, -wallThickness / 2, 400, wallThickness, { isStatic: true }),
      // left wall
      Matter.Bodies.rectangle(-wallThickness / 2, 200, wallThickness, 400, { isStatic: true }),
      // right wall
      Matter.Bodies.rectangle(400 + wallThickness / 2, 200, wallThickness, 400, { isStatic: true }),
    ];
    Matter.World.add(world, walls);

    try {
      const runScript = new Function("Matter", "world", data);
      runScript(Matter, world);
    } catch (err) {
      console.error("Error executing animation script:", err);
      setError(true);
      return;
    }

    const runner = Matter.Runner.create();
    Matter.Runner.run(runner, engine);
    Matter.Render.run(render);

    return () => {
      Matter.Render.stop(render);
      Matter.World.clear(world);
      Matter.Engine.clear(engine);
      render.canvas.remove();
      render.textures = {};
    };
  }, [data]);

  if (error) return <span>Error executing animation script</span>;
  return <div ref={sceneRef} className="mx-auto rounded-lg" />;
}
