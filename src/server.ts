import { app } from "./app"; // chama o app

const porta = process.env.PORT || 5000; // seta a porta

/* ------------------------------------------------------------------------
    Iniciando o Servidor
*/

const server = app.listen(porta, () =>
  console.log(`---------------- App ouvindo na porta ${porta} ----------------`)
);

/*  ----------------------------------------------------------------------------
    EVENTO QUE EXECUTA SEMPRE QUE O SERVIDOR DESLIGAR
*/

process.on("SIGINT", () => {
  server.close();
  console.log(`---------------- App finalizado ----------------`);
});
