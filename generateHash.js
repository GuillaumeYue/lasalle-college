const bcrypt = require('bcryptjs');

const password = '123456';  // 你要生成哈希的密码

// 生成哈希
bcrypt.hash(password, 10, (err, hash) => {
    if (err) {
        console.error(err);
    } else {
        console.log(`Generated hash: ${hash}`);
    }
});
