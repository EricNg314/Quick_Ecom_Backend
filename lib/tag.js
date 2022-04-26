const { Tag, ProductTag} = require('../models');

async function deleteTag(tagId) {
  try {
    // Removing row with foreign key.
    await ProductTag.destroy({
      where: {
        tag_id: tagId
      }
    })

    const tagData = await Tag.destroy({
      where: {
        id: tagId
      }
    })
    return tagData;
  } catch (error) {
    console.log(error);
    console.error(error);
  }
};


module.exports = {
  deleteTag
}