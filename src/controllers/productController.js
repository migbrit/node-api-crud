const ValidationContract = require('../validators/validator.js');
const ProductRepository = require('../repositories/productRepository.js');

exports.get = async(req, res, next) => {
  try {
    var data = await ProductRepository.get();
    res.status(200).send(data);
  } catch (e) {
    res.status(500).send({message: "Houve um erro no processamento da requisição.", data: e});
  }
};

exports.getBySlug = async(req, res, next) => {
  try {
    const data = await ProductRepository.getBySlug(req.params.slug);
    res.status(200).send({data});
  } catch (e) {
    res.status(500).send({message: "Houve um erro no processamento da requisição.", data: e});
  }
};

exports.getByTag = async(req, res, next) => {
  try {
    const data = await ProductRepository.getByTag(req.params.tag);
    res.status(200).send({data});
  } catch (e) {
    res.status(500).send({message: "Houve um erro no processamento da requisição.", data: e});
  }
};

exports.getById = async(req, res, next) => {
  try {
    const data = await ProductRepository.getById(req.params.id);
    res.status(200).send({data});
  } catch (e) {
    res.status(500).send({message: "Houve um erro no processamento da requisição.", data: e});
  }
};

exports.post = async(req, res, next) => {
    let contract = new ValidationContract();
    contract.hasMinLen(req.body.title, 3, 'O título deve conter pelo menos 3 caracteres');
    contract.hasMinLen(req.body.slug, 3, 'O slug deve conter pelo menos 3 caracteres');
    contract.hasMinLen(req.body.description, 3, 'A descrição deve conter pelo menos 3 caracteres');

    if(!contract.isValid()){
      res.status(400).send(contract.errors()).end();
      return;
    }

    try {
      await ProductRepository.create(req.body);
      res.status(201).send({
        message: "Produto cadastrado com sucesso!"
      });
    } catch (e) {
      res.status(400).send({
        message: "Falha ao cadastrar o produto",
        data: e
      });
    }
  };

exports.put = async(req, res, next) => {
    try {
      await ProductRepository.update(req.params.id, req.body);
      res.status(200).send({message: "Produto atualizado com sucesso!"});
    } catch (e) {
      res.status(400).send({message: "Falha ao atualizar o produto", data: e});
    }
  };

exports.delete = async(req, res, next) => {
    try {
      await ProductRepository.delete(req.params.id);
      res.status(200).send({message: "Produto removido com sucesso!"});
    } catch (e) {
      res.status(400).send({message: "Falha ao remover o produto", data: e});
    }
  };
