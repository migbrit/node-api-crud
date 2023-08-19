const mongoose = require('mongoose');
const Product = mongoose.model('Product');

exports.get = () => {
    return Product.find({active: true}, 'title price slug');
}

exports.getBySlug = (slug) => {
    return Product.findOne({active: true, slug: slug}, 'title description slug price tags');
}

exports.getByTag = (tag) => {
    return Product.findOne({active: true, tags: tag}, 'title description slug price tags');
}

exports.getById = (id) => {
    return Product.findById(id);
}

exports.create = (body) => {
    var product = new Product(body);
    return product.save();
}

exports.update = (id, body) => {
    return Product.findByIdAndUpdate(id, {
        $set: {
          title: body.title,
          description: body.description,
          price: body.price
        }
    });
}

exports.delete = (id) => {
    return Product.findOneAndRemove(id);
}