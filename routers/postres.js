const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');



const postres = require("../dbpostres/postres.json")
const {postreSchema} = require("../SchemasValidations/schema")
router.use(express.json())


router.get('/', (req, res) => {
    res.json(postres);
});
router.get('/:id', (req, res) => {
    const id = req.params.id
    const postre = postres.find(p => p.id === id);
  
    if (!postre) {
        res.status(404).json({ mensaje: 'Postre no encontrado' });
    } 
    res.status(200).json(postre);
    
});

router.post('/', (req, res) => {
    const validacion = postreSchema.safeParse(req.body);
  
    if (!validacion.success) {
      return res.status(400).json({
        error: 'Datos inválidos',
        detalles: validacion.error.format(),
      });
    }
  
    const postreValido = {
      id: uuidv4(), // ID único
      ...validacion.data,
    };

    postres.push(postreValido)
  
    // Aquí podrías guardar el postre en la base de datos, etc.
    res.status(201).json({
      mensaje: 'Postre creado correctamente',
      data: postreValido,
    });
});

router.put('/:id', (req, res) => {
    const validacion = postreSchema.safeParse(req.body);
  
    if (!validacion.success) {
      return res.status(400).json({
        error: 'Datos inválidos',
        detalles: validacion.error.format(),
      });
    }

    const id = req.params.id
    const postre = postres.findIndex(p => String(p.id) === String(id));
    if (!postre) {
      res.status(404).json({ mensaje: 'Postre no encontrado' });
    } 

    console.log(postre);
    
    const postreActualizado = {
      id, // mantener el mismo ID
      ...validacion.data
    };

    postres[postre] = {
      ...postres[postre],
      ...postreActualizado
    }
    

    // Aquí podrías guardar el postre en la base de datos, etc.
    res.status(201).json({
      mensaje: 'Postre actualizado correctamente',
      data: postreActualizado,
    });
});

module.exports = router