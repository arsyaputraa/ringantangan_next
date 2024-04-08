import { z } from "zod";

export const addAdminSchema = z.object({
  email: z.string().email({ message: "Email not valid" }),
});
