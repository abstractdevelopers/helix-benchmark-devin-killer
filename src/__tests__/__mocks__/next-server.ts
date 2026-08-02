const NextResponse = {
  json: (body, init) => {
    const headers = new Headers(init?.headers);
    headers.set("content-type", "application/json");
    return {
      status: init?.status ?? 200,
      headers,
      json: async () => body,
    };
  },
};

module.exports = { NextResponse };
