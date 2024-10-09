const mysql = require('mysql2');
const bcrypt = require('bcrypt');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '', //Change password MYSQ
    database: 'bhsoft'
})

class AuthController {



    //[/GET]
    getListAuth(req, res, next) {
        const query = "SELECT * FROM user ORDER BY name ASC LIMIT 0, 100";
        db.query(query, (err, data) => {
            if (err) return res.json({
                status: 409,
                message: err.message
            });
            return res.json({
                data: data
            })
        })
    }

    //POST[/sign-in]
    signIn(req, res, next) {
        const { username, password } = req.body;

        // Kiểm tra username có tồn tại hay không
        const query = "SELECT * FROM user WHERE name = ?";
        db.query(query, [username], (err, result) => {
            if (err) return res.status(400).json({ status: 400, message: err.message });

            if (result.length === 0) {
                return  res.status(404).json({ status: 404, message: "User not found" }); // Không tìm thấy username
            }

            const user = result[0];

            // So sánh mật khẩu đã mã hóa với mật khẩu người dùng nhập
            bcrypt.compare(password, user.password, (err, isMatch) => {
                if (err) return res.status(400).json({ status: 400, message: err.message });

                if (isMatch) {
                    return res.json({ status: 200, message: "Login Success", user: user });
                } else {
                    return  res.status(401).json({ status: 401, message: "Incorrect password" }); // Sai mật khẩu
                }
            });
        });
    }

    
    //POST[/sign-up]
    signUp(req, res, next) {
        const { username, name, password } = req.body;

        // Kiểm tra username đã tồn tại hay chưa
        const checkQuery = "SELECT * FROM user WHERE username = ?";
        db.query(checkQuery, [username], (err, result) => {
            if (err) return res.status(400).json({ status: 400, message: err.message });

            if (result.length > 0) {
                return res.status(409).json({ status: 409, message: "Username already exists" });
            } else {
                // Mã hóa mật khẩu trước khi lưu vào database
                bcrypt.hash(password, 10, (err, hashedPassword) => {
                    if (err) return res.status(400).json({ status: 400, message: err.message });

                    const insertQuery = "INSERT INTO user (username, name, password) VALUES (?)";
                    const values = [username, name, hashedPassword]; // Lưu mật khẩu đã mã hóa

                    db.query(insertQuery, [values], (err) => {
                        if (err) return res.status(400).json({ status: 400, message: err.message });
                        return res.json({ status: 201, message: "Registration Success" });
                    });
                });
            }
        });
    }
}

module.exports = AuthController;