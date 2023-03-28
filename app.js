import App from "./config/config.js";

const port = process.env.PORT || process.env.APP_PORT;

// Start server
App.http.listen(port, () => console.log(`API escuchando en puerto: ${port}`));