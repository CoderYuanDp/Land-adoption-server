const mysql = require('mysql2')
const connectionPool = mysql.createPool({
  host: 'localhost',
  port: 3306,
  user: 'root', //root
  password: 'password',
  database: 'ynong_db',
  connectionLimit: 100
})

const loginSQL = (username, password) => {
  const statement = `SELECT manager_id, manager_name, manager_nickname FROM back_user WHERE manager_name = ? AND manager_password = ?`
  return connectionPool.promise().execute(statement, [username, password])
}

const addFarmSQL = (farm_id, farm_name, farm_desc, farm_lan_lng, farm_area, farm_address, farm_images, model) => {
  const statement = `INSERT INTO farm_info (farm_id, farm_name, farm_desc, farm_lan_lng, farm_area, farm_address, farm_images, model)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?);`
  return connectionPool.promise().execute(statement, [farm_id, farm_name, farm_desc, farm_lan_lng, farm_area, farm_address, farm_images, model])
}

const getFarmSQL = (farm_name) => {
  const statement = `SELECT * FROM farm_info WHERE farm_name LIKE ?;`
  return connectionPool.promise().execute(statement, [`%${farm_name}%`])
}

const editFarmSQL = (farm_id, farm_name, farm_desc, farm_lan_lng, farm_area, farm_address, farm_images, model) => {
  const statement = `UPDATE farm_info SET farm_name = ?, farm_desc = ?, farm_lan_lng = ?, farm_area = ?, farm_address = ?, farm_images = ?, model = ? WHERE farm_id = ?;`
  return connectionPool.promise().execute(statement, [farm_name, farm_desc, farm_lan_lng, farm_area, farm_address, farm_images, model, farm_id])
}

const delFarmSQL = (farm_id) => {
  const statement = `DELETE FROM farm_info WHERE farm_id = ?;`
  return connectionPool.promise().execute(statement, [farm_id])
}

const addLunboSQL = (farm_id, farm_name, url) => {
  const statement = `INSERT INTO micro_lunbo (farm_id, farm_name, url) VALUES (?, ?, ?);`
  return connectionPool.promise().execute(statement, [farm_id, farm_name, url])
}
 
const delLunboSQL = (farm_id) => {
  const statement = `DELETE FROM micro_lunbo WHERE farm_id = ?;`
  return connectionPool.promise().execute(statement, [farm_id])
}

const getALLLunboSQL = () => {
  const statement = `SELECT * FROM micro_lunbo;`
  return connectionPool.promise().execute(statement)
}

const addHotfarm = (farm_id, farm_name) => {
  const statement = `INSERT INTO hotfarm (farm_id, farm_name) VALUES (?, ?);`
  return connectionPool.promise().execute(statement, [farm_id, farm_name])
}

const getAllHotSQL = () => {
  const statement = `SELECT * FROM hotfarm, farm_info where hotfarm.farm_id = farm_info.farm_id;`
  return connectionPool.promise().execute(statement)
}

const delHotfarmSQL = (farm_id) => {
  const statement = `DELETE FROM hotfarm WHERE farm_id = ?;`
  return connectionPool.promise().execute(statement, [farm_id])
}

const getUserSQL = (user_nickname) => {
  const statement = `SELECT * FROM user WHERE user_nickname LIKE ?;`
  return connectionPool.promise().execute(statement, [`%${user_nickname}%`])
}

const getLandSQL = (land_id) => {
  const statement = `SELECT * FROM land_info, farm_info WHERE land_info.farm_id = ? AND land_info.farm_id = farm_info.farm_id;`
  return connectionPool.promise().execute(statement, [land_id])
}
const getAllLandSQL = () => {
  const statement = `SELECT * FROM land_info, farm_info WHERE land_info.farm_id = farm_info.farm_id;`
  return connectionPool.promise().execute(statement)
}

const addLandSQL = (id, land_name, land_plants, land_area, farm_id, land_price) => {
  const statement = `INSERT INTO land_info (land_id, land_name, land_plants, land_area, farm_id, land_price, is_adopted) VALUES (?, ?, ?, ?, ?, ?, ?);`
  return connectionPool.promise().execute(statement, [id, land_name, land_plants, land_area, farm_id, land_price, 0])
}

const setLandSQL = (id) => {
  const statement = `UPDATE land_info SET is_adopted = 1 WHERE land_id = ?;`
  return connectionPool.promise().execute(statement, [id])
}

const delLandSQL = (id) => {
  const statement = `DELETE FROM land_info WHERE land_id = ?;`
  return connectionPool.promise().execute(statement, [id])
}

const addOrderSQL = (order_id, order_timestamp, order_price, order_type, order_desc, user_id, land_id, farm_id, plant) => {
  const statement = `INSERT INTO order_table (order_id, order_timestamp, order_price, order_type, order_desc, user_id, land_id, farm_id, plants) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);`
  return connectionPool.promise().execute(statement, [order_id, order_timestamp, order_price, order_type, order_desc, user_id, land_id, farm_id, plant])
}

// 全部订单
const getOrderSQL = () => {
  const statement = `SELECT order_table.order_id, order_table.order_price, order_table.order_timestamp, order_table.order_type,order_table.order_desc, order_table.farm_id, farm_info.farm_name, farm_info.farm_address, farm_info.farm_images, land_info.land_name, land_info.land_area, user.user_id, user.user_nickname, order_table.status_sproute, order_table.status_germinate, order_table.status_grow, order_table.status_mature 
  FROM order_table, land_info, farm_info, user WHERE order_table.land_id = land_info.land_id AND land_info.farm_id = farm_info.farm_id AND order_table.user_id = user.user_id;`
  return connectionPool.promise().execute(statement)
}

// 农场id
const getOrderSQL1 = (farm_id) => {
  const statement = `SELECT order_table.order_id, order_table.order_price, order_table.order_timestamp, order_table.order_type,order_table.order_desc, order_table.farm_id, farm_info.farm_name, farm_info.farm_address, farm_info.farm_images, land_info.land_name, land_info.land_area, user.user_id, user.user_nickname, order_table.status_sproute, order_table.status_germinate, order_table.status_grow, order_table.status_mature 
  FROM order_table, land_info, farm_info, user WHERE order_table.farm_id = ? AND order_table.land_id = land_info.land_id AND land_info.farm_id = farm_info.farm_id AND order_table.user_id = user.user_id;`
  return connectionPool.promise().execute(statement, [farm_id])
}

// 用户id
const getOrderSQL2 = (user_id) => {
  const statement = `SELECT order_table.order_id, order_table.order_price, order_table.order_timestamp, order_table.order_type,order_table.order_desc, order_table.farm_id, farm_info.farm_name, farm_info.farm_address, farm_info.farm_images, land_info.land_name, land_info.land_area, user.user_id, user.user_nickname, order_table.status_sproute, order_table.status_germinate, order_table.status_grow, order_table.status_mature 
  FROM order_table, land_info, farm_info, user WHERE order_table.user_id = ? AND order_table.land_id = land_info.land_id AND land_info.farm_id = farm_info.farm_id AND order_table.user_id = user.user_id;`
  return connectionPool.promise().execute(statement, [user_id])
}

// 俩id
const getOrderSQL3 = (farm_id, user_id) => {
  const statement = `SELECT order_table.order_id, order_table.order_price, order_table.order_timestamp, order_table.order_type,order_table.order_desc, order_table.farm_id, farm_info.farm_name, farm_info.farm_address, farm_info.farm_images, land_info.land_name, land_info.land_area, user.user_id, user.user_nickname, order_table.status_sproute, order_table.status_germinate, order_table.status_grow, order_table.status_mature 
  FROM order_table, land_info, farm_info, user WHERE order_table.farm_id = ? AND order_table.user_id = ? AND order_table.land_id = land_info.land_id AND land_info.farm_id = farm_info.farm_id AND order_table.user_id = user.user_id;`
  return connectionPool.promise().execute(statement, [farm_id, user_id])
}

const checkLoginSQL = (phone) => {
  const statement = `SELECT * FROM user WHERE user_phone = ?;`
  return connectionPool.promise().execute(statement, [phone])
}

const miniLoginSQL = (user_nickname, user_phone, user_avator) => {
  const statement = `INSERT INTO user (user_nickname, user_phone, user_avator) VALUES (?, ?, ?);`
  return connectionPool.promise().execute(statement, [user_nickname, user_phone, user_avator])
}

const allPriceSQL = () => {
  const statement = `SELECT SUM(order_price) FROM order_table;`
  return connectionPool.promise().execute(statement)
}

const userCountSQL = () => {
  const statement = `SELECT COUNT(*) FROM user;`
  return connectionPool.promise().execute(statement)
}

const orderCountSQL = () => {
  const statement = `SELECT COUNT(*) FROM order_table;`
  return connectionPool.promise().execute(statement)
}

const priceAnaysisSQL = () => {
  const statement = `SELECT order_timestamp, order_price FROM order_table;`
  return connectionPool.promise().execute(statement)
}

const editOrderStatusSQL = (order_id, status_sproute, status_germinate, status_grow, status_mature) => {
  const statement = `UPDATE order_table SET status_sproute = ?, status_germinate = ?, status_grow = ?, status_mature = ? WHERE order_id = ?;`
  return connectionPool.promise().execute(statement, [status_sproute, status_germinate, status_grow, status_mature, order_id])
}

const getOrderDetailSQL = (orderId) => {
  const statement = `SELECT * FROM order_table WHERE order_id = ?;`
  return connectionPool.promise().execute(statement, [orderId])
}

const editAddressSQL = (userId, address) => {
  const statement = `UPDATE user SET user_address =? WHERE user_id =?;`
  return connectionPool.promise().execute(statement, [address, userId])
}

const editLandInfoAdoptSQL = (landId) => {
  const statement = `UPDATE land_info SET is_adopted = 1 WHERE land_id = ?;`
  return connectionPool.promise().execute(statement, [landId])
}

module.exports = {
  loginSQL,
  addFarmSQL,
  editFarmSQL,
  getFarmSQL,
  delFarmSQL,
  addLunboSQL,
  delLunboSQL,
  getALLLunboSQL,
  addHotfarm,
  getAllHotSQL,
  delHotfarmSQL,
  getUserSQL,
  getLandSQL,
  getAllLandSQL,
  addLandSQL,
  setLandSQL,
  delLandSQL,
  addOrderSQL,
  getOrderSQL,
  getOrderSQL1,
  getOrderSQL2,
  getOrderSQL3,
  checkLoginSQL,
  checkLoginSQL,
  miniLoginSQL,
  allPriceSQL,
  userCountSQL,
  orderCountSQL,
  priceAnaysisSQL,
  editOrderStatusSQL,
  getOrderDetailSQL,
  editAddressSQL,
  editLandInfoAdoptSQL
}