import express from 'express';

const app = express();
var server = app.listen(3002);
app.use(express.static('dist'));

// server.close();
export default app;