const express = require('express')
const {
    PuzzleModel
} = require('../models/puzzle.model')

const PuzzleRouter = express.Router()

PuzzleRouter.post('/buy', async (req, res) => {
    try {
        const {
            title,
            desc,
            hints,
            options,
            ans
        } = req.body

        const newPuzzle = await PuzzleModel(req.body)
        newPuzzle.save()
        res.status(200).json(newPuzzle)
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