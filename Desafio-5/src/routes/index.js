import { Router } from "express"

const router = Router()
const products = []

router.get("/", (req, res) => {
    res.render('productForm.ejs')
}) 

router.post('/productos', (req, res) => {
    const { name, price, thumbnail} = req.body
    products.push({ name, price, thumbnail })
    res.redirect('/')
})

router.get('/productos', (req, res) => {
        
    res.render('productos.ejs', {products})
})

export default router