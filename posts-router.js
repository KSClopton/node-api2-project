const express = require('express');
const router = express.Router();
const DataBase = require('./data/db.js');

router.get("/"), (req, res) => {
  DataBase.find(req.query)
  .then(db => {
      res.status(200)
  })
  .catch(error => {
      res.status(500).json({errorMessage: "The posts information could not be retrieved."})
  })
}

router.get("/:id"), (req, res) => {
    const { id } = req.params
    
    if(!DataBase.findById(id)){
        res.status(404).json({errorMessage: "The post with the specified ID does not exist."})
    }else{
        DataBase.findById(id)
        .then(found => {
            console.log("Everything is good")
        })
        .catch(error => {
            res.status(500).json({errorMessage: "The post information could not be retrieved."})
        })
    }
}

router.get("/:id/comments"), (req, res) => {
    const {id} = req.params
        
    if(!DataBase.findCommentById(id)){
        res.status(404).json({errorMessage: "The post with the specified ID does not exist."})
    }else{
        DataBase.findCommentById(id)
        .then(found => {
            console.log("Everything is good")
        })
        .catch(error => {
            res.status(500).json({errorMessage: "The comments information could not be retrieved."})
        })
    }
    
}

router.post("/"), (req, res) => {
    const newInfo = req.body
    if(!newInfo.title || !newInfo.contents){
        res.status(400).json({errorMessage: "Please provide title and contents for the post."})
    }else {
        DataBase.insert(newInfo)
        .then(info => {
            res.status(201).json(newInfo)
        })
        .catch(error => {
            res.status(500).json({errorMessage: "There was an error while saving the post to the database"})
        })
    }
}

router.post("/:id/comments"), (req, res) => {
    const newInfo = req.body
    const {id} = req.params

    if(!newInfo.text){
        res.status(400).json({errorMessage: "Please provide text for the comment."})
    }else if(!DataBase.findById(id)){
        res.status(404).json({errorMessage: "The post with the specified ID does not exist"})
    }else{
        DataBase.insert(newInfo)
        .then(comment => {
            res.status(201).json(newInfo)
        })
        .catch(error => {
            res.status(500).json({errorMessage: "There was an error while saving the comment to the database."})
        })
    }
}

router.delete("/:id"), (req, res) => {
    const {id} = req.params
    if(!DataBase.findById(id)){
        res.status(404).json({errorMessage: "The post with the specified ID does not exist."})
    }else{
        DataBase.remove(id)
        .then(db => {
            console.log("Everything is good")
        })
    .catch(error => {
        res.status(500).json({errorMessage: "Could not delete item"})
    })
    }
}

router.put("/:id"), (req, res) => {
    const {id} = req.params
    const changes = req.body

    if(!changes.title || !changes.contents){
        res.status(400).json({errorMessage: "Please provide title and contents for the post."})
    }else if(!DataBase.findById(id)){
        res.status(404).json({errorMessage: "The post with the specified ID does not exist."})
    }else{
        DataBase.update(id)
        .then(message => {
            res.status(200).json(DataBase.findById(id))
        })
        .catch(error => {
            res.status(500).json({errorMessage: "The post information could not be modified."})
        })
    }
    
}

module.exports = router; 