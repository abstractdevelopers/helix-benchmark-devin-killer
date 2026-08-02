jest.mock("next/server", () => ({
  NextResponse: {
    json: (body) => ({
      status: 200,
      json: async () => body,
    }),
  },
}));

import { GET as health } from "@/app/api/health/route";

describe("/api/health", () => {
  it("returns ok", async () => {
    const response = await health();
    const json = await response.json();
    expect(response.status).toBe(200);
    expect(json).toEqual({ status: "ok" });
  });
});