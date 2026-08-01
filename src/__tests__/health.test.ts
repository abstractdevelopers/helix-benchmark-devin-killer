import { GET as health } from "@/app/api/health/route";

jest.mock("@/lib/prisma", () => ({
  prisma: {},
}));

describe("/api/health", () => {
  it("returns ok", async () => {
    const response = await health();
    const json = await response.json();
    expect(response.status).toBe(200);
    expect(json).toEqual({ status: "ok" });
  });
});
