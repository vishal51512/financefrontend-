import axios from "axios";

const BASE_URL = "https://personal-finance-analyzer-20ce.onrender.com";

const api = axios.create({
  baseURL: BASE_URL,
});

/**
 * Fetch analytics data from the backend.
 * Returns: { total_spent, category_breakdown, monthly_trend, prediction, anomalies }
 */
export async function fetchAnalytics() {
  const { data } = await api.get("/analytics");
  return data;
}

/**
 * Upload a CSV file of transactions.
 * @param {File} file - The CSV file to upload
 */
export async function uploadTransactions(file) {
  const formData = new FormData();
  formData.append("file", file);

  const { data } = await api.post("/upload-transactions", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return data;
}
