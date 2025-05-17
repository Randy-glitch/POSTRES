const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const users = require('../db/users.json');


exports.register = async (req,  res) => {


    const {user, password} = req.body

    const userExists = await users.findIndex(u => u.user === user)

    if (userExists !== -1) {
        return res.status(404).json({mensaje: userExists})
    }
    
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = {
        user,
        password: hashedPassword
    }

    users.push(newUser)
    
    res.status(201).json({mensaje: "REGISTER CORRECT!"})
    
}

exports.login = async (req,  res) => {


    const {user, password} = req.body

    const userExists = await users.find(u => u.user === user)

    if (!userExists) {
        res.status(404).json({mensaje: "ususario NO exits!"})
    }
    
    const comparePass = await bcrypt.compare(password, userExists.password)
    console.log(password);
    if (!comparePass) {
        return res.status(404).json({mesaje: "password incorrect !"})
    }
    const token = await jwt.sign({ user: userExists.user }, process.env.JWT_SECRET, {
    expiresIn: '1h',
    });

    res.cookie('authToken', token, {
      httpOnly: true,      // No accesible desde JavaScript (protección contra XSS)
      secure: false,// process.env.NODE_ENV === 'development', // Solo en HTTPS en producción
      maxAge: 3600000,    // 1 hora en milisegundos
    });

    res.status(200).json({mensaje: "LOGIN CORRECT!", token})
    

}