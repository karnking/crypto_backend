const express = require('express')

const NewsRouter = express.Router()

NewsRouter.get('/', async (req, res) => {
    try {
        let {
            topic,
            count
        } = req.body
        if (!topic) topic = "cryptocurrency"
        const news = await fetch(`http://api.mediastack.com/v1/news?access_key=c30216ad085bd8098471ca4d3d6ddb74&keywords=${topic}&languages=en&limit=${count}`)
            .then((res1) => {
                return res1.json()
            })
            .then((newsRes)=>{
                console.log(newsRes)
                res.status(200).send(newsRes)
            })
            .catch(() => {
                res.status(308).send('Error Fetching')
            })
    } catch (err) {
        console.log(err)
        res.status(500).send('Internal Server Error')
    }
})

module.exports = {
    NewsRouter
}