import express from "express";
import fetch from "node-fetch";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static("public"));

app.get("/search", async (req, res) => {
  const query = req.query.q;
  if (!query) return res.status(400).send("No query provided");

  try {
    const response = await fetch(
      `https://www.google.com/search?q=${encodeURIComponent(query)}`,
      { headers: { "User-Agent": "Mozilla/5.0" } }
    );
    let html = await response.text();
    html = html.replace(/<script.*?<\/script>/gs, "");
    res.send(html);
  } catch (err) {
    res.status(500).send("Error fetching Google");
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
