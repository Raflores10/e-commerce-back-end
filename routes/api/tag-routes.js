const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
    Tag.findAll().then(data=>{
        res.json(data)
    }).catch(err=>{
        console.log(err);
        res.status(500).json({
            msg:"error",
           err:err
        })
    })
});
// find all tags
// be sure to include its associated Product data

router.get('/:id', (req, res) => {
    Tag.findByPk(req.params.id,{
        include:[{
            model:Product,
            include:[Tag]
        }]
    }).then(data=>{
        if(data){
          return  res.json(data);
        } else {
            res.status(404).json({
                msg:"error"
            })
        }
    }).catch(err=>{
        console.log(err);
        res.status(500).json({
            msg:"error",
            err:err
        })
    })
}),
 
// find a single tag by its `id`
// be sure to include its associated Product data

router.post('/', (req, res) => {
    Tag.create({
        tag_name: req.body.tag_name
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
// create a new tag

router.put('/:id', (req, res) => {
    Tag.update({
        tag_name: req.body.tag_name
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
// update a tag's name by its `id` value

router.delete('/:id', (req, res) => {
    Tag.destroy({
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
// delete on tag by its `id` value

module.exports = router;
