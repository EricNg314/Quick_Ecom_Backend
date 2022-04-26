const { Category} = require('../models');
const { deleteProductByCategory } = require('../lib/product');

async function deleteCategory(categoryId) {
  try {
    // Removing row with foreign key.
    const {tagsDeleted, productsDeleted} = await deleteProductByCategory(categoryId)
    const categoryData = await Category.destroy({
      where: {
        id: categoryId
      }
    })
    return {tagsDeleted, productsDeleted, categoryData};
  } catch (error) {
    console.log(error);
    console.error(error);
  }
};

module.exports = {
  deleteCategory
}