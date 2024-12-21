export type message = {
  id: string;
  content: string;
  role: "user" | "assistant";
};

export type prompt = {
  content: string;
  role: "user";
};
