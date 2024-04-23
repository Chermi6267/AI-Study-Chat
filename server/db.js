const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
});

connection.connect(function (err) {
  if (err) {
    if (err.message) {
      return console.error("ERROR: " + err.message);
    }
    return console.log(`DB ${process.env.DB_NAME} is not running`);
  } else {
    console.log(
      `The connection to ${process.env.DB_NAME} was successfully established by ${process.env.DB_USER}`
    );
  }
});

connection.query(
  `CREATE TABLE IF NOT EXISTS users(
        id INT PRIMARY KEY AUTO_INCREMENT,
        username VARCHAR(255) NOT NULL UNIQUE,
        email VARCHAR(255) NOT NULL,
        password VARCHAR(999) NOT NULL
    )`
);

connection.query(
  `CREATE TABLE IF NOT EXISTS tokens(
        id INT PRIMARY KEY AUTO_INCREMENT,
        user_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        refresh_token VARCHAR(999) NOT NULL
    )`
);

connection.query(
  `CREATE TABLE IF NOT EXISTS chats(
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
  )`
);

connection.query(
  `CREATE TABLE IF NOT EXISTS messages(
    id INT PRIMARY KEY AUTO_INCREMENT,
    chat_id INT NOT NULL REFERENCES chats(id) ON DELETE CASCADE,
    user_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    text_for_user MEDIUMTEXT  NOT NULL,
    text_for_ai MEDIUMTEXT  NOT NULL,
    img_path TEXT NOT NULL,
    type ENUM('assistant', 'user'),
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
  )`
);

module.exports = { connection };
