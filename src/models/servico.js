const cliente = require("./cliente");

module.exports = app => {
    let ServicosSchema = app.db.mongoose.Schema({
        descricao: String,
        valor: String,
        data: String,
        cliente: String
    })

    app.db.mongoose.model("Servicos", ServicosSchema);
}