const fs = require("fs");
const path = require("path");
const express = require("express");
const app = express();
const PORT = process.env.PORT || 80;
app.use(express.static(path.join(__dirname, "assets")));
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "assets", "new.html"));
});

app.post("/saveData", express.json(), (req, res) => {
  const time = req.body;
  fs.writeFile("assets/data.json", JSON.stringify(time), (err) => {
    if (err) throw err;
    res.send("Data saved to data.json");
  });
});
app.post("/removedata", express.json(), (req, res) => {
  const timetable = req.body;
  fs.writeFile("assets/data.json", JSON.stringify(timetable), (err) => {
    if (err) throw err;
    res.send("Data saved to data.json");
  });
});
app.post("/adddata", express.json(), (req, res) => {
  const facstored = req.body;
  fs.writeFile("assets/faculty.json", JSON.stringify(facstored), (err) => {
    if (err) throw err;
    res.send("Data saved to faculty.json");
  });
});
app.listen(PORT, () => {
  console.log(`the server is running on http://127.0.0.1:${PORT}`);
});
