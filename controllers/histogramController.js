import axios from "axios";

export const salesHistogram = async (req, res) => {
  const { csvId } = req.params;

  if (!csvId) {
    return res.status(400).json({ message: "csvId is required" });
  }

  try {
    const response = await axios.get(
      `https://dae0-41-111-224-162.ngrok-free.app/histogram_sales?_id=${csvId}`,
      {
        timeout: 10000, // timeout 10 second
      }
    );

    return res.status(200).json({
      message: "Sales histogram fetched successfully",
      data: response.data,
    });
  } catch (error) {
    if (error.response) {
      return res.status(error.response.status).json({
        message: "Error fetching sales histogram",
        error: error.response.data || "Unknown error from external service",
      });
    } else if (error.request) {
      return res.status(504).json({
        message: "No response from external service",
        error: "Timeout or connectivity issue",
      });
    } else {
      return res.status(500).json({
        message: "Server error while fetching histogram",
        error: error.message,
      });
    }
  }
};
