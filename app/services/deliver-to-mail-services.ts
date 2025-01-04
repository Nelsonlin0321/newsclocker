import APIClient from "./api-client";

export default new APIClient<{
  status: string;
  detail: string;
  mailId?: string;
}>("/deliver-mail");
