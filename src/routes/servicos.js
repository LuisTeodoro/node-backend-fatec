module.exports = (app) => {
    app.get("/servicos", app.controllers.servicosController.listarservicos)
    app.get("/servicos/:id", app.controllers.servicosController.consultarPorId)
    app.post("/servicos", app.controllers.servicosController.adicionar)
    app.put("/servicos/:id", app.controllers.servicosController.atualizar)
    app.delete("/servicos/:id", app.controllers.servicosController.excluir)
}