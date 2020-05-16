const { createProxyMiddleware } = require("http-proxy-middleware");
module.exports = function (app) {
  app.use(
    "/rss",
    createProxyMiddleware({
      target: "http://fetchrss.com/",
      changeOrigin: true,
    })
  );
};
