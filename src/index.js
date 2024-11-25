import cors from "cors";
import express from "express";
import UsuariosController from "./controllers/UsuariosController.js";
import ClientesController from "./controllers/ClientesController.js";
import ProdutosController from "./controllers/ProdutosController.js";

const app = express();
app.use(express.json());
app.use(cors({ origin: "*" }));
 
const _usuariosController = new UsuariosController();
const _clientesController = new ClientesController();
const _produtosController = new ProdutosController();

app.get("/usuarios", _usuariosController.listar);
app.post("/usuarios", _usuariosController.adicionar);
app.put("/usuarios", _usuariosController.atualizar);
app.delete("/usuarios/:id", _usuariosController.excluir);

app.get("/clientes", _clientesController.listar);
app.post("/clientes", _clientesController.adicionar);
app.put("/clientes", _clientesController.atualizar);
app.delete("/clientes/:id", _clientesController.excluir);

app.get("/produtos", _produtosController.listar)
app.post("/produtos", _produtosController.adicionar)
app.put("/produtos", _produtosController.atualizar)
app.delete("/produtos/:id", _produtosController.excluir)

const port = 3000;
app.listen(port, () => {
  console.log(`API está rodando na porta ${port}`);
});
