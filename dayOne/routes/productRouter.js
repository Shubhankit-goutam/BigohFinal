const productController = require("../controllers/productController.js");
const reviewController = require("../controllers/reviewController");
const userController = require("../controllers/UserController");

const router = require("express").Router();
router.post("/addProduct", productController.addProduct);
router.get("/allProducts", productController.getAllProducts);
router.get("/published", productController.getPublishedProduct);
router.get("/allReviews", reviewController.getAllReviews);
router.post("/addReview/:id", reviewController.addReview);
router.get("/getProductReviews/:id", productController.getProductReviews);

// userController routes

router.post("/addUser", userController.addUser);
router.get("/getAlluser", userController.getAllUsers);

router.post("/addPost", userController.addPost);
router.get("/getAllpost/:id", userController.getAllPost);

router.get("/getBelongPost", userController.getBelongPost);

router.get("/getOnetoMany", userController.getOnetoMany);

// many to many
router.post("/addtag", userController.addTag);
router.post("/addPosttag", userController.addPostTag);
router.get("/getManytoMany", userController.getManytoMany);

module.exports = router;
