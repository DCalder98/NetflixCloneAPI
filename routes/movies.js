const router = require('express').Router()
const Movie = require('../models/Movie')
const verify = require('../verifyToken')

// Add new movie
router.post('/', verify, async (req, res) => {
    if (req.user.isAdmin) {
        const newMovie = new Movie(req.body)
        try {
            const savedMovie = await newMovie.save()
            return res.status(201).json(savedMovie);
        } catch (err) {
            return res.status(400).json(err)
        }
    } else {
        res.status(403).json("Forbidden")
    }
})

// Update Movie

router.put('/:id', verify, async (req, res) => {
    if (req.user.isAdmin) {
        try {
            const movie = await Movie.findByIdAndUpdate(
                req.params.id,
                { $set: req.body },
                { new: true }
            )
            return res.status(200).json(movie);
        } catch (err) {
            return res.status(400).json(err)
        }
    } else {
        res.status(403).json("Forbidden")
    }
})

// Delete a movie
router.delete('/:id', verify, async (req, res) => {
    if (req.user.isAdmin) {
        try {
            const movie = await Movie.findByIdAndDelete(
                req.params.id
            )
            return res.status(200).json('Movie Deleted');
        } catch (err) {
            return res.status(400).json(err)
        }
    } else {
        res.status(403).json("Forbidden")
    }
})

// Get movie
router.get('/:id', verify, async (req, res) => {
        try {
            const movie = await Movie.findById(
                req.params.id
            )
            return res.status(200).json(movie);
        } catch (err) {
            return res.status(400).json(err)
        }
})

// Get Random movie
router.get('/random', verify, async (req, res) => {
    const type = req.query.type
    let movie;
    try {
        if(type === 'series'){
           return movie = await Movie.aggregate([
                { $match: {isSeries: true} },
                { $sample: {size: 1}},
            ])
        } else {
            movie = await Movie.aggregate([
                { $match: {isSeries: false}},
                { $sample: {size: 1}}
            ])
        }
        res.status(200).json(movie)
        return res.status(200).json(movie);
    } catch (err) {
        return res.status(400).json(err)
    }
})

// GET ALL MOVIES

router.get('/', verify, async (req, res) => {
    try {
        const movie = await Movie.find()
        return res.status(200).json(movie.reverse());
    } catch (err) {
        return res.status(400).json(err)
    }
})
module.exports = router;