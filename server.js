const express = require("express");
const path = require("path");
const fs = require("fs");
const QRCode = require("qrcode");
const app = express();
const PORT = 3000;

app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());

app.get("/data.json", (req, res) => {
  res.sendFile(path.join(__dirname, "data.json"));
});

app.get("/status", (req, res) => {
  res.sendStatus(200);
});

app.post("/submit", (req, res) => {
  const { device } = req.body;
  const timestamp = new Date().toISOString();
  const vulnerability = Math.floor(Math.random() * 100) + 1;

  try {
    const data = JSON.parse(fs.readFileSync("data.json", "utf-8"));
    const existingDeviceIndex = data.findIndex((entry) => entry.device === device);

    if (existingDeviceIndex !== -1) {
      data[existingDeviceIndex] = {
        ...data[existingDeviceIndex],
        timestamp,
        vulnerability,
        online: true,
      };
    } else {
      const newDevice = { device, timestamp, vulnerability, online: true };
      data.push(newDevice);
    }

    fs.writeFileSync("data.json", JSON.stringify(data, null, 2));
    res.json({ message: `${device} has been successfully added or updated.` });
  } catch (error) {
    console.error("Error updating data:", error);
    res.status(500).json({ message: "Error processing the request." });
  }
});

app.get("/generate-qr", (req, res) => {
  const inputUrl = `${req.protocol}://${req.get("host")}/input.html`;
  QRCode.toDataURL(inputUrl, (err, qrCodeUrl) => {
    if (err) {
      res.status(500).send("Error generating QR code.");
      return;
    }
    res.json({ qrCodeUrl });
  });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});