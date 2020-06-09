const uuid = require('uuid');
const bcrypt = require('bcrypt');

module.exports = (api) => {
    api.post('/register', async (req, res) => {
        // TODO: modificar la contrasena del body usando bcrypt
        // TODO: utilizar req.$.dbManager para grabar el usuario
        // req.$.dbManager.create('users', body)

        const password = await bcrypt.hash(req.body.password, 10);
        const user = {
            ...req.body,
            id: uuid.v4(),
            password
        }
        req.$.dbManager.create('users', user);
        res.status(201).json(user);
    });
}
    
