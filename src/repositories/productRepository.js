const mongoose = require('mongoose');
const Product = mongoose.model('Product');

exports.get = async() => {
    const res = await Product.find({active: true}, 'title price slug');
    return res;
}

exports.getBySlug = async(slug) => {
    const res = await Product.findOne({active: true, slug: slug}, 'title description slug price tags');
    return res;
}

exports.getByTag = async(tag) => {
    const res = await Product.find({active: true, tags: tag}, 'title description slug price tags');
    return res;
}

exports.getById = async(id) => {
    const res = await Product.findById(id); 
    return res;
}

exports.create = async(body) => {
    var product = new Product(body);
    await product.save();
}

exports.update = async(id, body) => {
    await Product.findByIdAndUpdate(id, {
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