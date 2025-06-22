const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());

const categoryOptions = [
  { value: "Sidewalk Shed", label: "Sidewalk Shed", color: "#71cf48" },
  { value: "Scaffold", label: "Scaffold", color: "#ecde7c" },
  { value: "Shoring", label: "Shoring", color: "#9640BE" },
];

const jobsitePath = path.join(__dirname, "jobsites.json");
const inventoryPath = path.join(__dirname, "inventory.json");

function readJobsites() {
  try {
    const data = fs.readFileSync(jobsitePath, "utf-8");
    return JSON.parse(data);
  } catch (err) {
    console.error("Error reading jobsites.json:", err);
    return [];
  }
}
function writeJobsites(data) {
  fs.writeFileSync(jobsitePath, JSON.stringify(data, null, 2));
}

function readInventory() {
  try {
    const data = fs.readFileSync(inventoryPath, "utf-8");
    return JSON.parse(data);
  } catch (err) {
    console.error("Error reading inventory.json:", err);
    return {};
  }
}
function writeInventory(data) {
  fs.writeFileSync(inventoryPath, JSON.stringify(data, null, 2));
}

app.get("/api/jobsites", (req, res) => {
  const jobsites = readJobsites();
  res.json(jobsites);
});

app.post("/api/jobsites", (req, res) => {
  const { name, status, categories } = req.body;

  if (!name || !status) {
    return res.status(400).json({ error: "Name and status are required" });
  }

  const newJobsite = {
    id: Date.now(),
    name,
    status,
    categories: categories || [],
  };

  const jobsites = readJobsites();
  jobsites.push(newJobsite);
  writeJobsites(jobsites);

  res.status(201).json(newJobsite);
});

app.get("/api/inventory", (req, res) => {
  const { category } = req.query;
  if (!category) {
    return res.status(400).json({ error: "Category is required" });
  }

  const inventoryData = readInventory();
  const data = inventoryData[category];
  if (!data) {
    return res.status(404).json({ error: "Category not found" });
  }

  res.json(data);
});

app.put("/api/inventory", (req, res) => {
  const { category, rows } = req.body;
  if (!category || !Array.isArray(rows)) {
    return res
      .status(400)
      .json({ error: "Category and updated rows are required" });
  }

  const inventoryData = readInventory();
  inventoryData[category] = rows;
  writeInventory(inventoryData);

  res.json({ message: "Inventory updated successfully", rows });
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
