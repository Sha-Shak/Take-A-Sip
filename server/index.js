const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const router = require('./router');
const app = express();
const PORT = 6785;
const fastify = require("fastify")({ logger: true });

const corsOptions = {
  origin: ["http://localhost:4200", "https://take-a-sip.vercel.app/"],
  credentials: true,
  exposedHeaders: "Authorization",
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(router);


(async function bootstrap () {
  try {
    await mongoose.connect(
      "mongodb+srv://projectcode:1234@cluster0.st3u7xe.mongodb.net/?retryWrites=true&w=majority"
    );
    app.listen(PORT, () => console.log(`Server is listening on port ${PORT}.`));
    fastify.log.info(`server listening on ${fastify.server.address().port}`);
  } catch (error) {
    console.log(error);
    fastify.log.error(error);
  }
})();