import express from "express";
import dotenv from "dotenv";
dotenv.config();
const app = express();
app.use(express.json());
app.get("/", (req, res) => {
    res.send("Testing the root's app");
});
const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
});
//# sourceMappingURL=app.js.map