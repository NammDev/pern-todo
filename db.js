const Pool = require('pg').Pool
require('dotenv').config()

const devConfig = {
  user: 'postgres',
  password: 'namkhanh',
  host: 'localhost',
  port: 5432,
  database: 'perntodo',
}

const productConfig = {
  connectionString:
    'postgresql://postgres:o7x7xcmGQM0VPqDFmLXn@containers-us-west-35.railway.app:8002/railway',
}

const pool = new Pool(process.env.NODE_ENV === 'production' ? productConfig : devConfig)

module.exports = pool
