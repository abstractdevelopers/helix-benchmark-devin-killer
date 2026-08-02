module.exports = {
  NextResponse: {
    json: (body, init) => ({
      status: init?.status || 200,
      headers: init?.headers || {},
      json: async () => body,
    }),
    redirect: (url, init) => ({
      status: init?.status || 302,
      headers: { Location: url },
    }),
  },
  NextRequest: class NextRequest {
    constructor(url, init) {
      this.url = url;
      this.init = init;
    }
  },
};