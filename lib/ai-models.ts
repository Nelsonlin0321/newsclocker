import "server-only";
import { createOpenAI } from "@ai-sdk/openai";
import { createAzure } from "@ai-sdk/azure";
import { createVertex } from "@ai-sdk/google-vertex";
import { decodeFromBase64 } from "./utils";

const apiKey = process.env.DEEPSEEK_API_KEY!;
const azure_open_ai_key = process.env.AZURE_OPENAI_API_KEY!;

export const deepSeek = createOpenAI({
  baseURL: "https://api.deepseek.com/v1",
  apiKey: apiKey,
  compatibility: "compatible",
});

const VERTEX_AI_PRIVATE_KEY_ENCODED = process.env
  .VERTEX_AI_PRIVATE_KEY_ENCODED as string;

const vertexCredentials = {
  type: "service_account",
  project_id: "my-gcp-lab-377907",
  private_key_id: process.env.VERTEX_AI_PRIVATE_KEY_ID,
  private_key: decodeFromBase64(VERTEX_AI_PRIVATE_KEY_ENCODED),
  client_email: "vertex-ai@my-gcp-lab-377907.iam.gserviceaccount.com",
  client_id: "109456758002281388735",
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_x509_cert_url:
    "https://www.googleapis.com/robot/v1/metadata/x509/vertex-ai%40viu-celebrity.iam.gserviceaccount.com",
  universe_domain: "googleapis.com",
};

export const vertex = createVertex({
  project: "my-gcp-lab-377907",
  location: "us-central1",
  googleAuthOptions: {
    credentials: vertexCredentials,
    scopes: ["https://www.googleapis.com/auth/cloud-platform"],
  },
});

// export const model = vertex("gemini-1.5-pro");

export const azureOpenAI = createAzure({
  resourceName: "leetquiz",
  apiKey: azure_open_ai_key,
});
