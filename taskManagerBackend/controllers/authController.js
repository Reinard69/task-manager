const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')


const User = require('../models/User');
const { getUser } = require('../middlewares/authMiddleware');


// handle errors
const handleErrors = (err) => {
    console.log(err.message, err.code);
    let errors = { email: '', password: '' };
  
    // duplicate email error
    if (err.code === 11000) {
      errors.email = 'that email is already registered';
      return errors;
    }
  
    // validation errors
    if (err.message.includes('user validation failed')) {
      Object.values(err.errors).forEach(({ properties }) => {
        errors[properties.path] = properties.message;
      });
    }

    // incorrect password
    if ( err.message === 'incorrect password' ) {
        errors.password = 'password is incorrect'
    } 

    // incorrect email
    if ( err.message === 'incorrect email' ) {
        errors.email = 'email not registered'
    } 
  
    return errors;
}

const maxAge = 3 * 24 * 60 * 60 // token expires in 3 days its in seconds
const createToken = id => {
    return jwt.sign({ id }, 'task_manager_secret_@@_1245', {
        expiresIn: maxAge
    });
}

module.exports.signUp = async ( req, res ) => {
    const { email, password } = req.body

    try {
        const user = await User.create({
            email,
            password
        });
        const token = createToken(user._id);
        res.status(201).json({
            user,
            token
        });
    } catch (error) {
        const errors = handleErrors(error)
        res.status(400).send({ errors })
    }
}

module.exports.login = async ( req, res ) => {
    const { email, password } = req.body;

    try {
        const user = await User.login(email, password)
        const token = createToken(user._id);
        res.status(200).json({
            user,
            token
        })
    } catch (error) {
        const errors = handleErrors(error)
        res.status(400).json({ errors })
    }
}

module.exports.update = async ( req, res ) => {
    // const { email, password } = req.body;

    try {
        const user = await getUser(req)
        
        const query = req.body
        if (query.password !== undefined) {
            const salt = await bcrypt.genSalt();
            const newPassword = await bcrypt.hash(query.password, salt)
            query.password = newPassword
        }
        const updateUser = await User.findByIdAndUpdate(user._id, query)

        const newUser = await User.findById(user._id);
        res.status(200).json({
            user: newUser
        })
    } catch (error) {
        res.status(400).json({ error })
    }
}