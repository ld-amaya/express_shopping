const express = require('express');
const ExpressError = require('./ExpressError');
const router = new express.Router();
let DATA = require('./fakeDB');

// Get /items 
router.get('/', (req, res, next) => {
    try {
        return res.json({ items: DATA });    
    } catch (e) {
        return next(e);
    }
})
// POST Items
router.post('/', (req, res, next) => {
    try {
        newItem = {
            name: req.body.name,
            price: req.body.price
        }
        DATA.push(newItem)
        return res.json({added: newItem});    
    } catch (e) {
        return next(e)
    }
})

//Get item/:name
router.get('/:name', (req, res, next) => {
    try {
        const name = req.params.name
        found = DATA.find(n => n.name === name);
        if (!found) throw new ExpressError(`${name} not on the list, try another name!`, 404)
        return res.json(found)
    } catch (e) {
        return next(e)
    }
})

//Patch item/:name
router.patch('/:name', (req, res, next) => {
    try {
        const name = req.params.name
        found = DATA.find(n => n.name === name);
        if (!found) throw new ExpressError(`${name} not on the list, try another name!`, 404)
        found.name = req.body.name;
        found.price = req.body.price;
        return res.json({updated: found})
    } catch (e) {
        return next(e)
    }
})

// DELETE item/:name 
router.delete('/:name', (req, res, next) => {
    try {
        const name = req.params.name
        found = DATA.find(n => n.name === name);
        if (!found) throw new ExpressError(`${name} not on the list, try another name!`, 404)
        DATA.splice(found, 1)
        return res.json({message: 'deleted'})
    } catch (e) {
        return next(e)
    }
})

module.exports = router;