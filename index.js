import express from "express";
import cors from "cors"; // Importer le middleware CORS
import fetch from "node-fetch";
import { config } from "dotenv";

config(); // Charger les variables d'environnement depuis un fichier .env

const app = express();
const port = 5000;

// Activer CORS pour toutes les origines (ou spécifiez votre frontend si vous préférez)
app.use(cors()); // Utilise CORS

// Route API pour récupérer les données Instagram
app.get("/api/instagram", async (req, res) => {
  const accessToken = process.env.INSTAGRAM_KEY;

  if (!accessToken) {
    return res.status(400).json({ error: "Missing Instagram Access Token" });
  }

  try {
    const response = await fetch(
      `https://graph.instagram.com/me/media?fields=id,caption,media_type,media_url,permalink&access_token=${accessToken}`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch data from Instagram");
    }

    const data = await response.json();
    const recentPost = data.data[0];

    res.status(200).json(recentPost);
  } catch (error) {
    console.error("Error fetching Instagram data:", error);
    res.status(500).json({ error: error.message });
  }
});

// Démarrer le serveur
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

//////////////////////////
// import fetch from "node-fetch";

// async function getLastInstagramPost() {
//   const accessToken = "ACCES_TOKEN"; // Remplacez par votre token d'accès
//   const url = `https://graph.instagram.com/me/media?fields=id,media_type,media_url,caption,timestamp&access_token=${accessToken}`;

//   try {
//     const response = await fetch(url);
//     if (!response.ok) {
//       throw new Error("Failed to fetch data from Instagram");
//     }

//     const data = await response.json();
//     // Trier les publications par timestamp, de la plus récente à la plus ancienne
//     const sortedPosts = data.data.sort(
//       (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
//     );

//     // Récupérer le dernier post (le plus récent)
//     const lastPost = sortedPosts[0];
//     console.log("Dernier post:", lastPost);

//     return lastPost;
//   } catch (error) {
//     console.error("Error fetching Instagram data:", error);
//     return null;
//   }
// }

// getLastInstagramPost();
