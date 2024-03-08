import express from "express";
import cors from "cors";
import db from "../models/index.js";
import authRoutes from "../routes/auth.routes.js";
import userRoutes from "../routes/user.routes.js";

const app = express();
const PORT = process.env.POST || 8080;

const Role = db.role;

db.sequelize.sync({ force: true }).then(() => {
  console.log("Drop and resync DB");
  initial();
});

function initial() {
  Role.create({
    id: 1,
    name: "user",
  });

  Role.create({
    id: 2,
    name: "moderator",
  });

  Role.create({
    id: 3,
    name: "admin",
  });
}

const corsOptions = {
  origin: "http://localhost:8001",
};

app.use(cors(corsOptions));

//parse requests of content-type: application/json
app.use(express.json());

//parse requests of content-type: application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

//routes
app.get("/", (req, res) => {
  res.json({ message: "Welcome from server!!" });
});

authRoutes(app);
userRoutes(app);

app.listen(PORT, () => {
  console.log(`Server started @${PORT}`);
});
