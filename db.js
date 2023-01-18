const Pool = require('pg').Pool
require('dotenv').config()

const devConfig = {
  user: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
  host: process.env.PG_HOST,
  port: process.env.PG_PORT,
  database: process.env.PG_DATABASE,
}

const productConfig = {
  connectionString:
    'postgresql://postgres:o7x7xcmGQM0VPqDFmLXn@containers-us-west-35.railway.app:8002/railway',
}

const pool = new Pool(process.env.NODE_ENV === 'production' ? productConfig : devConfig)

module.exports = pool
