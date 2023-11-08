import express from "express";
import axios from "axios";

const app = express();
const port = 3000;
const API_URL = "https://secrets-api.appbrewery.com";

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

const yourBearerToken = "10b83674-9d95-4c02-9dd1-21d23f684ed1";
const configToken = {
  headers: { Authorization: `Bearer ${yourBearerToken}` },
};

app.get("/", (req, res) => {
  res.render("index.ejs", { content: "Waiting for some action" });
});

app.post("/get-secret", async (req, res) => {
  const searchId = req.body.id;
  try {
    const result = await axios.get(
      `${API_URL}/secrets/${searchId}`,
      configToken
    );
    res.render("index.ejs", { content: JSON.stringify(result.data) });
  } catch (error) {
    res.render("index.ejs", { content: JSON.stringify(error.response.data) });
  }
});

app.post("/post-secret", async (req, res) => {
  try {
    const response = await axios.post(
      `${API_URL}/secrets`,
      {
        secret: req.body.secret,
        score: req.body.score,
      },
      configToken
    );
    res.render("index.ejs", { content: JSON.stringify(response.data) });
  } catch (err) {
    res.render("index.ejs", { content: JSON.stringify(err.response.data) });
  }
});

app.post("/put-secret", async (req, res) => {
  const searchId = req.body.id;
  try {
    const response = await axios.put(
      `${API_URL}/secrets/${searchId}`,
      {
        secret: req.body.secret,
        score: req.body.score,
      },
      configToken
    );
    res.render("index.js", { content: JSON.stringify(response.data) });
  } catch (err) {
    res.render("index.ejs", { content: JSON.stringify(err.response.data) });
  }
});

app.post("/patch-secret", async (req, res) => {
  const searchId = req.body.id;
  try {
    const response = await axios.patch(
      `${API_URL}/secrets/${searchId}`,
      {
        secret: req.body.secret,
        score: req.body.score,
      },
      configToken
    );
    res.render("index.js", { content: JSON.stringify(response.data) });
  } catch (err) {
    res.render("index.ejs", { content: JSON.stringify(err.response.data) });
  }
});

app.post("/delete-secret", async (req, res) => {
  const searchId = req.body.id;
  try {
    const response = await axios.delete(
      `${API_URL}/secrets/${searchId}`,
      configToken
    );
    res.render("index.ejs", { content: JSON.stringify(response.data) });
  } catch (error) {
    res.render("index.ejs", { content: JSON.stringify(error.response.data) });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
