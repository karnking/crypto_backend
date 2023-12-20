const mongoose = require('mongoose')

const PuzzleSchema = mongoose.Schema({
    title: String,
    desc: String,
    hints: [],
    options: {},
    ans: [],
})

const PuzzleModel = mongoose.model("Puzzle", PuzzleSchema)

module.exports = {PuzzleModel}