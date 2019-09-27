const Pool = require('pg').Pool
const pool = new Pool({
  user: 'curriculum_webapi',
  host: 'localhost',
  database: 'db_curriculum_webapi',
  password: 'contagem',
  port: 5432,
})

const getUsers = (request, response) => {
    pool.query('SELECT * FROM tb_personal_data ORDER BY id ASC', (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
}

const getUserById = (request, response) => {
    const id = parseInt(request.params.id)
  
    pool.query('SELECT name, email, phone, address FROM tb_personal_data WHERE id = $1', [id], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }

const createUser = (request, response) => {
    const { name, email } = request.body
  
    pool.query('INSERT INTO users (name, email) VALUES ($1, $2)', [name, email], (error, results) => {
      if (error) {
        throw error
      }
      response.status(201).send(`User added with ID: ${result.insertId}`)
    })
  }

module.exports = {
    getUsers,
    getUserById,
    createUser
}



