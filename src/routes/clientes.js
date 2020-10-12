module.exports = (app) => {
    app.get("/clientes", app.controllers.clientesController.listarClientes)
    app.get("/clientes/:id", app.controllers.clientesController.consultarPorId)
    app.post("/clientes", app.controllers.clientesController.adicionar)
    app.put('/clientes/:id', app.controllers.clientesController.atualizar)
    app.delete('/clientes/:id', app.controllers.clientesController.excluir)
}