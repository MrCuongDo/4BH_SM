let express = require('express')
let router = express.Router()
const { Pool, Client } = require('pg')

router.get('/', function(req, res,next) {
    // res.send('day la trang san pham');
    res.render('sanPham', {
        title: 'Trang san pham'
    })
})

router.post('/themSanPham', async function(req, res) {
    let {maSanPham, tenSanPham, theme, price} = req.body;

    const client = new Client({
        user: 'postgres',
        host: 'localhost',
        database: 'shop4BHouse',
        password: 'sql@123',
        port: 5432,
    })
    client.connect()
    const query = {
        text: 'insert into legolist  ("maSanPham", "tenSanPham", theme, price) VALUES ($1, $2, $3, $4)',
        values: [maSanPham,tenSanPham,theme, parseInt(price)],
    }

    try {
        const kq = await client.query(query)
        res.send(kq).end()
    } catch (err) {
        res.send(err.stack).end()
    }
})

router.post('/dsSanPham', async function(req, res) {
    const client = new Client({
        user: 'postgres',
        host: 'localhost',
        database: 'shop4BHouse',
        password: 'sql@123',
        port: 5432,
    })
    client.connect()

    const query = {
        text: 'select * from legolist',
        values: [],
    }

    try {
        const kq = await client.query(query)
        let data = [];
        if(kq.rows) {
            kq.rows.forEach(function(item,index) {
                data.push({
                    stt : ++index,
                    id : item.id,
                    maSanPham : item.maSanPham,
                    tenSanPham : item.tenSanPham,
                    theme : item.theme,
                    price : item.price
                })
            })
        }
        res.json(data).end()
    } catch (err) {
        res.send(err.stack).end()
    }
})

router.post('/xoaSanPham', async function(req, res) {
    const client = new Client({
        user: 'postgres',
        host: 'localhost',
        database: 'shop4BHouse',
        password: 'sql@123',
        port: 5432,
    })
    client.connect()

    const query = {
        text: 'delete from legolist where id = $1',
        values: [req.body.id],
    }

    try {
        const kq = await client.query(query)
        res.json(kq).end()
    } catch (err) {
        res.send(err.stack).end()
    }
})

module.exports = router