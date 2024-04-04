export type UserType = {
  id: string;
  email: string;
  isEmailVerified: boolean;
  fullName: string | null;
  googleId: string | null;
  role: "user" | "admin" | "superadmin";
  avatar: string | null;
};

export type RoleEnum = "user" | "admin" | "superadmin";
