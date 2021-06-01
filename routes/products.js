let express = require('express')
let router = express.Router()
let model = require('../model/products.model')


router.get('/', function(req, res,next) {
    // res.send('day la trang san pham');
    res.render('products', {
        title: 'Trang san pham',
        pageProductsActive : true
    })
})

// router.post('/themSanPham', async function(req, res) {
//     let {maSanPham, tenSanPham, theme, price} = req.body;

//     const client = new Client({
//         user: 'postgres',
//         host: 'localhost',
//         database: 'shop4BHouse',
//         password: 'sql@123',
//         port: 5432,
//     })
//     client.connect()
//     const query = {
//         text: 'insert into legolist  ("maSanPham", "tenSanPham", theme, price) VALUES ($1, $2, $3, $4)',
//         values: [maSanPham,tenSanPham,theme, parseFloat(price)],
//     }

//     try {
//         const kq = await client.query(query)
//         res.send(kq).end()
//     } catch (err) {
//         res.send(err.stack).end()
//     }
// })

router.post('/dsSanPham', async function(req, res) {

    try {
        const kq = await model.getDsSanPham();
        let data = [];
        if(kq.rows) {
            kq.rows.forEach(function(item,index) {
                data.push({
                    stt : ++index,
                    id : item.masanpham,
                    maSanPham : item.masanpham,
                    tenSanPham : item.tensanpham,
                    soLuong : item.soluong,
                    theme : item.theme,
                    year : item.year,
                    price : item.price ? item.price : 0
                })
            })
        }
        res.json(data).end()
    } catch (err) {
        res.send(err.stack).end()
    }
})

// router.post('/xoaSanPham', async function(req, res) {
//     const client = new Client({
//         user: 'postgres',
//         host: 'localhost',
//         database: 'shop4BHouse',
//         password: 'sql@123',
//         port: 5432,
//     })
//     client.connect()

//     const query = {
//         text: 'delete from legolist where id = $1',
//         values: [req.body.id],
//     }

//     try {
//         const kq = await client.query(query)
//         res.json(kq).end()
//     } catch (err) {
//         res.send(err.stack).end()
//     }
// })

// router.post('/editSanPham', async function(req, res) {
//     // res.send(req.body)
//     let {maSanPham, tenSanPham, theme, price} = req.body;
//     const client = new Client({
//         user: 'postgres',
//         host: 'localhost',
//         database: 'shop4BHouse',
//         password: 'sql@123',
//         port: 5432,
//     })
//     client.connect()

//     const query = {
//         text: 'update legolist set "maSanPham" = $2, "tenSanPham" = $3, theme = $4, price=$5  where id = $1',
//         values: [req.body.id, maSanPham, tenSanPham, theme, price],
//     }

//     try {
//         const kq = await client.query(query)
//         res.json(kq).end()
//     } catch (err) {
//         res.send(err.stack).end()
//     }
// })

module.exports = router