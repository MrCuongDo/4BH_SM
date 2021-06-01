let db = require('./database')


module.exports.getDsSanPham = async function() {
    let text = `select
        year,
        num_parts AS soLuong,
        set_num AS maSanPham,
        sets.name AS tenSanPham ,
        themes.name AS theme
    from sets
    left join themes
    on sets.theme_id = themes.id
    where year = $1
    order by year desc, set_num desc
    limit 10
    `;
    let params = [2021];

    try {
        const kq = await db.query(text,params)
        return kq;
    } catch (err) {
        throw new Error(err);
    }
}