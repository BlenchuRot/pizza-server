const uuid = require('uuid');
const bcrypt = require('bcrypt');

module.exports = (api) => {
    api.post('/register', async (req, res) => {
        const {dbManager, jwt, config} = req.$;
        const { email, password } = req.body;
        // TODO: modificar la contrasena del body usando bcrypt
        // TODO: utilizar req.$.dbManager para grabar el usuario
        // req.$.dbManager.create('users', body)

        const encryptedPassword = await bcrypt.hash(req.body.password, 10);
        const user = {
            ...req.body,
            password: encryptedPassword
        }
        const userCreated = await dbManager.create('users', user);
        res.status(201).json(userCreated);
    });
}
    
