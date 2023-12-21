const express = require('express')
const {
    PuzzleModel
} = require('../models/puzzle.model')

const PuzzleRouter = express.Router()

PuzzleRouter.post('/add', async (req, res) => {
    try {
        if (req.body.ans.length == 0) res.status(401).send("All details not given");
        else {
            const puzzles = await PuzzleModel.find({})
            const already_present = puzzles.filter(ele => ele.title == req.body.title)
            if (already_present.length > 0) {
                res.status(409).send("Already Exist");
            } else {
                const newPuzzle = await PuzzleModel(req.body)
                const resp = await newPuzzle.save()
                res.status(200).json(newPuzzle)
            }
        }
    } catch (err) {
        console.log(err)
        res.status(500).send("Internal Server Error")
    }
})
PuzzleRouter.get('/allPuzzle', async (req, res) => {
    try {
        const Puzzles = await PuzzleModel.find({})
        if (Puzzles.length > 0) res.status(200).json({
            Puzzles
        })
        else res.status(409).send("No Puzzle Found")
    } catch (error) {
        console.log(error)
        res.status(500).send("Internal Server Error")
    }
})

module.exports = {
    PuzzleRouter
}