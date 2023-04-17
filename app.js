const express = require("express");
const axios = require("axios");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.all("/:path(*)", async (req, res) => {
  // Reemplaza esta URL con la dirección del endpoint al que deseas reenviar la petición
  const targetBaseUrl = "https://api.enzona.net/payment/v1.0.0";

  const targetUrl = `${targetBaseUrl}/${req.params.path}`;
  // Desactivamos la verificación SSL
  const httpsAgent = new (require("https").Agent)({
    rejectUnauthorized: false,
  });

  try {
    headers = {};
    if (req.headers.authorization != null) {
      console.log(req.headers.authorization);
      headers = {
        authorization: req.headers.authorization,
      };
    }
    const response = await axios({
      method: req.method,
      url: targetUrl,
      headers: headers,
      data: req.body,
      httpsAgent,
    });

    res.status(response.status).send(response.data);
  } catch (error) {
    if (error.response) {
      res.status(error.response.status).send(error.response.data);
    } else {
      res.status(500).send("Error interno del servidor");
    }
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
