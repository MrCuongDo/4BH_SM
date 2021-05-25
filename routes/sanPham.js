let express = require('express')
let router = express.Router()

router.get('/', function(req, res,next) {
    // res.send('day la trang san pham');
    res.render('sanPham', {
        title: 'Trang san pham'
    })
})

module.exports = router