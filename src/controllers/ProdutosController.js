import ConexaoMySql from "../database/ConexaoMySql.js";

class ProdutosController {
  async adicionar(req, resp) {
    try {
      const novoProduto = req.body;

      if (!novoProduto.nome || !novoProduto.preco || !novoProduto.estoque) {
        resp.status(400).send("Os campos nome, preço e estoque são obrigatórios.");
        return;
      }

      const conexao = await new ConexaoMySql().getConexao();
      const comandoSql =
        "INSERT INTO produtos (nome, descricao, preco, estoque) VALUES (?, ?, ?, ?)";

      const [resultado] = await conexao.execute(comandoSql, [
        novoProduto.nome,
        novoProduto.descricao,
        novoProduto.preco,
        novoProduto.estoque,
      ]);

      resp.send(resultado);
    } catch (error) {
      resp.status(500).send(error);
    }
  }

  async listar(req, resp) {
    try {
      const conexao = await new ConexaoMySql().getConexao();
      const comandoSql = "SELECT * FROM produtos WHERE nome LIKE ?";

      const filtro = req.query.filtro || "";
      const [resultado] = await conexao.execute(comandoSql, [`%${filtro}%`]);
      resp.send(resultado);
    } catch (error) {
      resp.status(500).send(error);
    }
  }

  async atualizar(req, resp) {
    try {
      const produtoEditar = req.body;

      if (!produtoEditar.id || !produtoEditar.nome || !produtoEditar.preco) {
        resp.status(400).send("Os campos id, nome e preço são obrigatórios.");
        return;
      }

      const conexao = await new ConexaoMySql().getConexao();
      const comandoSql =
        "UPDATE produtos SET nome = ?, descricao = ?, preco = ?, estoque = ? WHERE id = ?";

      const [resultado] = await conexao.execute(comandoSql, [
        produtoEditar.nome,
        produtoEditar.descricao,
        produtoEditar.preco,
        produtoEditar.estoque,
        produtoEditar.id,
      ]);

      resp.send(resultado);
    } catch (error) {
      resp.status(500).send(error);
    }
  }

  async excluir(req, resp) {
    try {
      const conexao = await new ConexaoMySql().getConexao();
      const comandoSql = "DELETE FROM produtos WHERE id = ?";

      const [resultado] = await conexao.execute(comandoSql, [+req.params.id]);
      resp.send(resultado);
    } catch (error) {
      resp.status(500).send(error);
    }
  }
}

export default ProdutosController;
