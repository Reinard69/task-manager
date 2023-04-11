export type UserContextType = {
  cookies: { [x: string]: any };
  logout: () => void;
  login: ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => Promise<void>;
  signup: ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => Promise<void>;
};

export type LoginInputs = {
  email: string;
  password: string;
};

export const AuthModeTypes = {
  login: "login",
  register: "registration",
};

export type Task = {
  userId: string;
  _id: string;
  taskName: string;
  description: string;
  status: "completed" | "incomplete" | "in progress" | "all";
  dueDate: Date;
  priority: "high" | "low" | "medium";
};
