import APIClient from "./api-client";

const headers = {
  "X-API-KEY": process.env.API_KEY!, // Move API key to .env
  "Content-Type": "application/json",
};

export default new APIClient<string>("/get-pdf-url", headers);