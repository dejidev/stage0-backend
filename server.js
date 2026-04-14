const express = require("express");
const cors = require("cors");
const fetch = require("node-fetch");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

app.get("/", (req, res) => {
    res.send("Welcome to the Gender Classification API! Use /api/classify?name=yourname to get started.");
});

// app.get("/api/classify", async (req, res) => {
//     try {
//         const { name } = req.query;

//         // 400: missing or empty
//         if (!name) {
//             return res.status(400).json({
//                 status: "error",
//                 message: "Name query parameter is required",
//             });
//         }

//         // 422: not string
//         if (typeof name !== "string") {
//             return res.status(422).json({
//                 status: "error",
//                 message: "Name must be a string",
//             });
//         }

//         // Call Genderize API
//         const response = await fetch(
//             `https://api.genderize.io?name=${encodeURIComponent(name)}`
//         );

//         if (!response.ok) {
//             return res.status(502).json({
//                 status: "error",
//                 message: "Upstream API error",
//             });
//         }

//         const data = await response.json();

//         const { gender, probability, count } = data;

//         // Edge case
//         if (!gender || count === 0) {
//             return res.status(422).json({
//                 status: "error",
//                 message: "No prediction available for the provided name",
//             });
//         }

//         const sample_size = count;

//         const is_confident =
//             probability >= 0.7 && sample_size >= 100;

//         const result = {
//             name: name.toLowerCase(),
//             gender,
//             probability,
//             sample_size,
//             is_confident,
//             processed_at: new Date().toISOString(),
//         };

//         return res.status(200).json({
//             status: "success",
//             data: result,
//         });
//     } catch (err) {
//         return res.status(500).json({
//             status: "error",
//             message: "Internal server error",
//         });
//     }
// });

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});