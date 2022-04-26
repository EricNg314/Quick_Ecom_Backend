const { Op } = require('sequelize');
const { Product, ProductTag} = require('../models');

async function deleteProduct(productId) {
  try {
    // Removing row with foreign key.
    await ProductTag.destroy({
      where: {
        product_id: productId
      }
    })

    const productData = await Product.destroy({
      where: {
        id: productId
      }
    })
    return productData;
  } catch (error) {
    console.log(error);
    console.error(error);
  }
};

async function deleteProductByCategory(categoryId) {
  try {
    // Retrieve all products based on category id.
    const productsWithCatId = await Product.findAll({
      attributes: ['id'],
      where: {
        category_id: categoryId
      }
    })
    const productsToDestroy = productsWithCatId.map((row) => row.id )
    console.log('productsToDestroy: ', productsToDestroy)

    // Removing row with foreign key with product id.
    let tagsDeleted
    if(productsToDestroy.length > 0){
      tagsDeleted = await ProductTag.destroy({
        where: {
          product_id: {
            [Op.or]: productsToDestroy
          }
        }
      })
    }
    // Remove products by category id.
    const productsDeleted = await Product.destroy({
      where: {
        category_id: categoryId
      }
    })
    return {tagsDeleted, productsDeleted};
  } catch (error) {
    console.log(error);
    console.error(error);
  }
};

module.exports = {
  deleteProduct,
  deleteProductByCategory
}