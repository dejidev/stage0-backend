export default async function handler(req, res) {
  try {
    // CORS
    res.setHeader("Access-Control-Allow-Origin", "*");

    const { name } = req.query;

    // 400: missing name
    if (!name || name.trim() === "") {
      return res.status(400).json({
        status: "error",
        message: "Name query parameter is required",
      });
    }

    // 422: invalid type
    if (typeof name !== "string") {
      return res.status(422).json({
        status: "error",
        message: "Name is not a string",
      });
    }

    // Call Genderize API
    const response = await fetch(
      `https://api.genderize.io?name=${encodeURIComponent(name)}`
    );

    if (!response.ok) {
      return res.status(502).json({
        status: "error",
        message: "Upstream API error",
      });
    }

    const data = await response.json();

    const { gender, probability, count } = data;

    // Edge case
    if (!gender || count === 0) {
      return res.status(422).json({
        status: "error",
        message: "No prediction available for the provided name",
      });
    }

    const sample_size = count;

    const is_confident =
      probability >= 0.7 && sample_size >= 100;

    return res.status(200).json({
      status: "success",
      data: {
        name: name.toLowerCase(),
        gender,
        probability,
        sample_size,
        is_confident,
        processed_at: new Date().toISOString(),
      },
    });
  } catch (err) {
    return res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
}
