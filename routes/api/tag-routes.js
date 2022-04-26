const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');
const { deleteTag } = require('../../lib/tag');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  console.log(`${req.method}: ${req.baseUrl}`);
  try {
    const tagData = await Tag.findAll({
      include: [
        {model: Product}
      ]
    })
    res.status(200).json(tagData);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  console.log(`${req.method}: ${req.baseUrl}`);
  try {
    const tagData = await Tag.findByPk(req.params.id, {
      include: [
        {model: Product}
      ]
    })
    res.status(200).json(tagData);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post('/', async (req, res) => {
  // create a new tag
  console.log(`${req.method}: ${req.baseUrl}`);
  try {
    const tagData = await Tag.create(req.body);
    res.status(200).json(tagData);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  console.log(`${req.method}: ${req.baseUrl}`);
  try {
    const tagData = await Tag.update(req.body, {
      where: {
        id: req.params.id
      }
    })
    const [affectedRows, actualAffectedRows] = tagData;
    res.status(200).json({"tags updated": affectedRows})
  } catch (error) {
    res.status(500).json(error);
  }
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  console.log(`${req.method}: ${req.baseUrl}`);
  try {
    const tagData = await deleteTag(req.params.id);

    res.status(200).json({"tags removed": tagData})
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
