import express from 'express'
import { createBook,deleteBook,listBook, updateBook } from './controller'

const router = express.Router()

router.post('/add',createBook)
router.get('/list',listBook)
router.patch('/update/:id',updateBook)
router.delete('/delete/:id',deleteBook)

export default router