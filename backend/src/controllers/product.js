const { Product, Category  } = require("../db");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

module.exports = {

  getProductsByLetterIncludeInTheName: async (inputValue) => {
    return await Product.findAll({
      where: {
        name: {
          [Op.iLike]: '%' + inputValue + '%'
        }
      },
      include: [{ model: Category, as: "categories" }],
    });
  },
  addCategoryToProduct: async (idProducto, idCategoria) => {
    return await Product.findByPk(idProducto).then( async (oneProduct) => {
      return await Category.findByPk(idCategoria)
        .then((newcategory) => {
          oneProduct.addCategory(newcategory);
          return newcategory;
        });
     });
 },
  searchProductsByCategoryName(categoryName) {
    return Category.findAll({
      where: {
        name: {
          [Op.iLike]: categoryName
        }
      },
      include: [{ model: Product}]
    })
  },
}