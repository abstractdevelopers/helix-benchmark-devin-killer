import { z } from "zod";

const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  teamName: z.string().min(1),
});

describe("register schema", () => {
  it("accepts valid input", () => {
    const result = registerSchema.safeParse({
      email: "admin@example.com",
      password: "password123",
      teamName: "Acme",
    });
    expect(result.success).toBe(true);
  });

  it("rejects invalid email", () => {
    const result = registerSchema.safeParse({
      email: "not-an-email",
      password: "password123",
      teamName: "Acme",
    });
    expect(result.success).toBe(false);
  });
});
