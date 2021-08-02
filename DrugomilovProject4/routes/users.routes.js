const { Router } = require('express')
const { check, validationResult } = require('express-validator')
const { User } = require('../models/User')

const router = Router()

router.get('/', async (req, res) => {
    try {
        const users = await User.findAll();
        res.json(users);
    } catch (e) {
        res.status(500).json({ message: 'Что-то пошло не так' })
    }
})

router.delete('/del', [
    check('userIds', 'Выберите пользователей для удаления').exists()
], async (req, res) => {
    try {
        const { ids } = req.body;
        await User.destroy({
            where: {
                id: ids,
            }
        })
       // res.json(await User.findAll());
        res.status(200).json({message:"пользователь удален"})
    } catch (e) {
        res.status(500).json({ message: 'Что-то пошло не так' })
    }
})

module.exports = router