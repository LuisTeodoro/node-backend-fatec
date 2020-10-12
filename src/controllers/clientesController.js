module.exports = function(app) {
    let clientesModel = app.db.mongoose.model("Clientes")

    return {
        listarClientes: function(req, res) {
            let search = req.body.search
            clientesModel.find({
                nome: new RegExp(search)
            })
            .then((clientes) => {
                res.json(clientes)
            })
            .catch((err) => res.status(500).send(err))
        },
        adicionar: (req, res) => {
            try {
                let cliente = new clientesModel(req.body)
                cliente.save((err) => {
                    if(err)
                        res.status(500).send(`Erro ao inserir: ${err}`)
                    else
                        res.send(cliente);
                });
            } catch (error) {
                res.send("Erro ao adicionar cliente: " + error);
            }
        },
        consultarPorId: async (req, res) => {
            try {
                let id = req.params.id
                let cliente = await clientesModel.findById(id)
                if(cliente)
                    res.json(cliente)
                else
                    res.status(404).end();
            } catch (error) {
                res.status(404).send();
            }
        },
        atualizar: async (req, res) => {
            let id = req.params.id
            let cliente = req.body
 
            clientesModel.findByIdAndUpdate(id, { $set: cliente } , (err) => {
                if(err)
                    res.status(500).send(`Erro ao atualizar cliente: ${err}`)
                else
                    res.send(cliente)
            })
        },
        excluir: (req, res) => {
            let id = req.params.id
            clientesModel.findByIdAndRemove(id, (err) => {
                if(err)
                    res.status(500).send(`Erro ao excluir cliente: ${err}`)
                else
                    res.status(200).send({})
            })
        }
    }
}