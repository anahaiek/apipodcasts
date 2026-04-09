import * as http from "http";
import "dotenv/config";
import {
  getListEpisodes,
  getFilterEpisodes
} from "./controllers/podcasts-controller.js";

const server = http.createServer(
  async (req: http.IncomingMessage, res: http.ServerResponse) => {

    const [baseUrl, queryString] = req.url?.split("?") ?? ["", ""];

    try {

      // rota principal
      if (req.method === "GET" && baseUrl === "/") {
        await getListEpisodes(req, res);
        return;
      }

      // listar todos episódios
      if (req.method === "GET" && baseUrl === "/api/list") {
        await getListEpisodes(req, res);
        return;
      }

      // listar ou filtrar episódios
      if (req.method === "GET" && req.url?.startsWith("/api/episode")) {
        await getFilterEpisodes(req, res);
        return;
      }

      // rota não encontrada
      res.writeHead(404, { "Content-Type": "text/plain" });
      res.end("Rota não encontrada");

    } catch (error) {

      console.error(error);

      res.writeHead(500, { "Content-Type": "text/plain" });
      res.end("Erro interno no servidor");

    }

  }
);

const port = process.env.PORT || 3636;

server.listen(port, () => {
  console.log(`Servidor iniciado na porta ${port}`);
});