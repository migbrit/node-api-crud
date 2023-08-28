const OrderRepository = require('../repositories/orderRepository');
const guid = require('guid');

exports.get = async(req, res, next) => {
    try {
      var data = await OrderRepository.get();
      res.status(200).send(data);
    } catch (e) {
      res.status(500).send({message: "Houve um erro no processamento da requisição.", data: e});
    }
  };


exports.post = async(req, res, next) => {
    try {
      await OrderRepository.create({
        customer: req.body.customer,
        number: guid.raw().substring(0,6),
        items: req.body.items
      });
      res.status(201).send({
        message: "Pedido cadastrado com sucesso!"
      });
    } catch (e) {
      res.status(500).send({
        message: "Falha ao cadastrar o pedido",
        data: e
      });
    }
  };
