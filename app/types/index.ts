type Status = "error" | "success";

export type ServerAction = {
  status: Status;
  message: string;
};
