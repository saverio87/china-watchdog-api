const express = require("express");
const PORT = process.env.PORT || 8000;
const app = express();

// Initialize Middleware

app.use(express.json({ extended: false }));
app.use("/news", require("./routes/api/news"));

app.get("/", (req, res) => {
  res.json("Welcome to my China Watchdog API");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
