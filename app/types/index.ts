export type Status = "error" | "success";

export type ActionResponse = {
  status: Status;
  message: string;
};
