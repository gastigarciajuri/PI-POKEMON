const axios = require('axios');
const express = require('express');
const { Type } = require('../db');
const router = express.Router();

router.get('/', async (req, res) =>{
    try {
        let typesFapi = await axios.get('https://pokeapi.co/api/v2/type');
        let apiInfo = typesFapi.data;
        let types = apiInfo.results.map( e => e.name);
        types.forEach(type => {
            Type.findOrCreate({
                where: {
                    name: type,
                }
            });
        });
        const allTypes = await Type.findAll();
        return res.status(200).send(allTypes.sort());
    } catch (error) {
        console.log(error);
    };
});

module.exports = router;