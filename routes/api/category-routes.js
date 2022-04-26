const router = require('express').Router();
const { Category, Product } = require('../../models');
const { deleteCategory } = require('../../lib/category');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  console.log(`${req.method}: ${req.baseUrl}`);
  try {
    const categoryData = await Category.findAll({
      include: [
        {model: Product}
      ]
    })
    res.status(200).json(categoryData);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  console.log(`${req.method}: ${req.baseUrl}`);
  try {
    const categoryData = await Category.findByPk(req.params.id, {
      include: [
        {model: Product}
      ]
    });
    res.status(200).json(categoryData);
  } catch (error) {
    res.status(500).json(error)
  }
});

router.post('/', async (req, res) => {
  // create a new category
  console.log(`${req.method}: ${req.baseUrl}`);
  try {
    const categoryData = await Category.create(req.body);
    res.status(200).json(categoryData);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  console.log(`${req.method}: ${req.baseUrl}`);
  try {
    const categoryData = await Category.update(req.body, {
      where: {
        id: req.params.id
      }
    })
    const [affectedRows, actualAffectedRows] = categoryData;
    res.status(200).json({"categories updated": affectedRows});
  } catch (error) {
    res.status(500).json(error);
  }
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  console.log(`${req.method}: ${req.baseUrl}`);
  try {
    const {tagsDeleted, productsDeleted, categoryData} = await deleteCategory(req.params.id)

    res.status(200).json({
      "Tags removed": tagsDeleted,
      "Products removed": productsDeleted,
      "categories removed": categoryData
  })
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
