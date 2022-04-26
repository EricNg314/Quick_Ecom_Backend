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


module.exports = {
  deleteProduct
}