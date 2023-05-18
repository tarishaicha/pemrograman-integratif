import express from "express";
import cors from "cors";
import fetch from 'node-fetch';
import router from "./controller.js";

const app = express();
const port = 3000;

app.use(express.json());

app.use("/", router);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

  app.get('/api/search', async (req, res) => {
    const { q } = req.query;
    const apiUrl = `https://magneto.api.halodoc.com/api/v1/buy-medicine/products/search/${q}`;
    const apiResponse = await fetch(apiUrl);
    const jsonData = await apiResponse.json();
  
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.json(jsonData);
  });
  
  app.get('/api/detail', async (req, res) => {
    const { q } = req.query;
    const apiUrl = `https://magneto.api.halodoc.com/api/v1/buy-medicine/products/detail/${q}`;
    const apiResponse = await fetch(apiUrl);
    const jsonData = await apiResponse.json();
  
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.json(jsonData);
  });