const ValidationContract = require('../validators/validator');
const CustomerRepository = require('../repositories/customerRepository');
const AuthService = require('../services/auth-service');
const md5 = require('md5');

  exports.post = async(req, res, next) => {
    let contract = new ValidationContract();
    contract.hasMinLen(req.body.name, 3, 'O nome deve conter pelo menos 3 caracteres.');
    contract.isEmail(req.body.email,'O email informado está inválido.');
    contract.hasMinLen(req.body.password, 6, 'A senha deve conter pelo menos 6 caracteres.');

    if(!contract.isValid()){
      res.status(400).send(contract.errors()).end();
      return;
    }

    try {
      await CustomerRepository.create({
        name: req.body.name,
        email: req.body.email,
        password: md5(req.body.password + global.SALT_KEY)
      });
      res.status(201).send({
        message: "Cliente cadastrado com sucesso!"
      });
    } catch (e) {
      res.status(500).send({
        message: "Falha ao cadastrar o cliente",
        data: e
      });
    }
  };


  exports.authenticate = async(req, res, next) => {
    try{
      const customer = await CustomerRepository.authenticate({
        email: req.body.email,
        password: md5(req.body.password + global.SALT_KEY)
      });

      const customerBasicInfo = {
        email: customer.email,
        name: customer.name
      };

      if (!customer) {
        res.status(404).send({
          message: "Autenticação falhou"
        });
        return;
      }

      
      const token = await AuthService.generateToken(customerBasicInfo);

      res.status(201).send({
        token: token,
        data: customerBasicInfo
      });
    }
    catch(e){
      res.status(400).send({
        message: e
      });
    }
  }
