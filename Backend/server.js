import express from "express";
import cors from "cors";

const app = express();
app.use(express.json());
const corsOptions = {
  origin: "*", // allow all any origin or specify
  methods: ["GET" , "POST"],
  credentials: true, // if you need to send cookies/auth headers
};

app.use(cors(corsOptions));


app.post("/api/test", (req, res) => {
    const {propmt} = req.body
    if(propmt?.includes("two balls")){
    const jsCode = `
       const circleA = Matter.Bodies.circle(150, 100, 20, {
        restitution: 0.8,
        render: { fillStyle: "#60a5fa" },
      });

      const circleB = Matter.Bodies.circle(250, 100, 30, {
        restitution: 0.9,
        render: { fillStyle: "#f472b6" },
      });

      const ground = Matter.Bodies.rectangle(200, 390, 400, 20, {
        isStatic: true,
        render: { fillStyle: "#6b7280" },
      });

      Matter.World.add(world, [circleA, circleB, ground]);
    `;

    res.json({ message: jsCode});
    }
    else{
        res.json({message : " sorry we can't load this animation !"})
    }
  
});

app.listen(3000, () => {
  console.log("Backend running on http://localhost:3000");
}); 
