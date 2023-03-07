const router = require('express').Router();
const { Product, Category, Tag, ProductTag } = require('../../models');

// The `/api/products` endpoint

// get all products
router.get('/', (req, res) => {
  Product.findAll().then(data => {
    res.json(data)
  }).catch(err=>{
    console.log(err);
    res.status(500).json({
      msg:"An error has occurred",
      err: err
    })
  })
});

// get one product
router.get('/:id', (req, res) => {
  Product.findByPk(req.params.id, {
    include: [Category, Tag]
  }).then(data => {
    if (data) {
      return res.json(data)
    } else {
      res.status(404).send("record does not exist")
    }
  })
});

// create new product
router.post('/', (req, res) => {
  Product.create({
    product_name: req.body.product_name
  }).then(data=>{
    res.status(201).json(data)
  }).catch(err=>{
    console.log(err);
    res.status(500).json({
      msg: "An error has occured",
      err: err
    })
  })
});

// update product
router.put('/:id', (req, res) => {
  Product.update({
    product_name: req.body.product_name
  },{
    where:{
      id:req.params.id
    }
  }).then(data=>{
    if(data[0]){
      return res.json(data)
    } else {
      return res.status(404).json({msg:"record does not exist"})
    }
  }).catch(err=>{
    console.log(err);
    res.status(500).json({
      msg:"An error has occurred",
      err: err
    })
  })
});

router.delete('/:id', (req, res) => {
  Category.destroy({
    where: {
      id: req.params.id
    }
  }).then(data => {
    if (data) {
      return res.json(data)
    } else {
      return res.status(404).json({ msg: "record does not exist" })
    }
  }).catch(err => {
    console.log(err);
    res.status(500).json({
      msg: "an error has occurred",
      err: err
    })
  })
});

module.exports = router;
