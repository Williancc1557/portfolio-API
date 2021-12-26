import * as express from "express";
import * as cors from "cors";
import * as logger from "morgan";
import * as rateLimit from "express-rate-limit";
import { router } from "./routes/index";

/* --------------------------------------------------------------------------------
    CRIANDO O APP
*/

export const app = express();

/* --------------------------------------------------------------------------------
    CRIANDO E USANDO UM RATELIMIT PARA LIMITAR A QUANTIDADE DE REQUESTS POR IP
*/
const rateLimitServer = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message:
    "Muitas requisições foram solicitadas nesse IP, por favor, aguarde 15 minutos",
});
app.use(rateLimitServer);

/* --------------------------------------------------------------------------------------------
    PASSANDO AS OPÇÕES DO CORS E UTILIZANDO ELE NA APLICAÇÃO
*/

app.use((req, res, next) => {
  //Qual site tem permissão de realizar a conexão, no exemplo abaixo está o "*" indicando que qualquer site pode fazer a conexão
  res.header("Access-Control-Allow-Origin", "*");
  //Quais são os métodos que a conexão pode realizar na API
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  app.use(cors());
  next();
});

/* ---------------------------------------------------------------------------------------------
    CONFIGURANDO OS MIDDLEWARES
*/
app.use(express.json());

app.use(logger("dev"));

/* ---------------------------------------------------------------------------------------------
    INTEGRANDO O ENDPOINT NA APLICAÇÃO
*/

app.use("/", router);
