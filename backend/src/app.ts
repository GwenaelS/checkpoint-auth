import express from "express";
import dotenv from "dotenv";
// Import des routes
import { route } from "./router.ts";

dotenv.config();

const app = express();

// Express attends du json en retour de requète
app.use(express.json());

// Express utilise les route de...
app.use(route)

app.get("/", (req, res) => {
    res.send("Testing the root's app");
});

app.listen(process.env.PORT, () =>{
    console.log(`listening on port ${process.env.PORT}`)
});