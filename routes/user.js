const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campo');
const { esRolValido, emailExiste, usuarioExist } = require('../helpers/db-validators');
const { 
    userGet,
    userPut,
    userPost,
    userDelete,
    userPatch
} = require('../controllers/user-contoller');




const router = Router();

router.get('/', userGet);

router.put('/:id', [
    check('id', 'No es un id valido').isMongoId().custom( usuarioExist ),
    check('rol').custom( esRolValido ),
    validarCampos,
], userPut);

router.post('/', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('correo', 'El correo no es válido').isEmail().custom( emailExiste ),
    check('password', 'El paswword debe de tener mas de 6 caracteres').isLength( {min:6} ),
    // check('rol', 'No es un rol valido').isIn(['ADMIN_ROL','USER_ROL']),
    check('rol').custom( esRolValido ),
    validarCampos,
], userPost);

router.patch('/', userPatch);

router.delete('/:id', [
    check('id', 'No es un id valido').isMongoId().custom( usuarioExist ),
    validarCampos,
], userDelete);

module.exports = router;