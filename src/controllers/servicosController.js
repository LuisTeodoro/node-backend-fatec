module.exports = function(app) {
    let servicosModel = app.db.mongoose.model("Servicos")

    return {
        listarservicos: function(req, res) {
            let search = req.body.search
            servicosModel.find({
                cliente: new RegExp(search)
            })
            .then((servicos) => {
                res.json(servicos)
            })
            .catch((err) => res.status(500).send(err))
        },
        adicionar: (req, res) => {
            try {
                let servico = new servicosModel(req.body)
                servico.save((err) => {
                    if(err)
                        res.status(500).send(`Erro ao inserir: ${err}`)
                    else
                        res.send(servico);
                });
            } catch (error) {
                res.send("Eror ao adicionar Serviço: " + error);
            }
        },
        consultarPorId: async (req, res) => {
            try {
                let id = req.params.id
                let servico = await servicosModel.findById(id)
                if(servico)
                    res.json(servico)
                else
                    res.status(404).end();
            } catch (error) {
                res.status(404).send();
            }
        },
        atualizar: async (req, res) => {
            let id = req.params.id
            let servico = req.body
 
            servicosModel.findByIdAndUpdate(id, { $set: servico } , (err) => {
                if(err)
                    res.status(500).send(`Erro ao atualizar Serviço: ${err}`)
                else
                    res.send(servico)
            })
        },
        excluir: (req, res) => {
            let id = req.params.id
            servicosModel.findByIdAndRemove(id, (err) => {
                if(err)
                    res.status(500).send(`Erro ao excluir Serviço: ${err}`)
                else
                    res.status(200).send({})
            })
        }
    }
}