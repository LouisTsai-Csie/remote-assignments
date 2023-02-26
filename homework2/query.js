const mysql  = require('mysql-await');
require('dotenv').config();

const connection = mysql.createConnection({
    "host": process.env.DATABASE_HOST,
    "user": "LouisTsai",
    "password": process.env.DATABASE_PASSWORD,
    "database": "assignment"
});

async function userSignUp(name, email, password, date){
    let duplicateUser = await connection.awaitQuery(`SELECT email FROM user WHERE email=?`, [email]);
    if(duplicateUser.length!==0)
        return "DUPLICATE_USER_ERROR";
    
    await connection.query(`INSERT INTO user (name, email, password) VALUES (?, ?, ?)`, [name, email, password]);
    let newUser = await connection.awaitQuery(`SELECT * FROM user WHERE email=?`, [email]);
    let data = {
        data: {
            user: {
                id: newUser[0].id,
                name: newUser[0].name,
                email: newUser[0].email,
            },
            date: date,
        }
    }
    return data;
}

async function getUser(id, date) {
    let userData = await connection.awaitQuery(`SELECT * FROM user WHERE id=?`, [id]);
    if(userData.length===0)
        return "USER_NOT_EXISTING";
    let result = {
        data: {
            user: {
                id: userData[0].id,
                name: userData[0].name,
                email: userData[0].email,
            },
            date: date
        }
    }
    return result;
}

module.exports = {
    userSignUp,
    getUser,
}