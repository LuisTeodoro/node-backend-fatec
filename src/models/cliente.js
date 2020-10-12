module.exports = app => {
    let ClientesSchema = app.db.mongoose.Schema({
        nome: String,
        cpf: String,
        tel: String,
        email: String,
        endereco: String

    })

    app.db.mongoose.model("Clientes", ClientesSchema);
}