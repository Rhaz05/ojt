express myExpressApp --view ejs

1. cd myExpressApp
2. npm install
3. npm install nodemon -D
4. npm install mysql2

**SB Admin**

```
https://startbootstrap.com/theme/sb-admin-2
```

**JQuery CDN**

```
<script src="https://code.jquery.com/jquery-4.0.0.min.js" integrity="sha256-OaVG6prZf4v69dPg6PhVattBXkcOWQB62pdZ3ORyrao=" crossorigin="anonymous"></script>
```

**ENV**

```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=your_database
DB_PORT=3306
```

**Cryptography**

```js
require("dotenv").config();

/**
 * Encryption Salt
 */
const crypto = require("crypto");

/**
 * Encryption Algorithm
 */
const algorithm = process.env.ENCRYPTION_ALGORITHM;
const initVector = Buffer.alloc(16, process.env.ENCRYPTION_IV);
const Securitykey = Buffer.alloc(32, process.env.ENCRYPTION_KEY);

exports.DecryptString = (hash) => {
  try {
    let decipher = crypto.createDecipheriv(algorithm, Securitykey, initVector);
    let decryptedData = decipher.update(hash, "hex", "utf8");
    decryptedData += decipher.final("utf-8");

    return decryptedData;
  } catch (error) {
    console.error("Invalid Encrypted Key:", error);
  }
};

exports.EncryptString = (password) => {
  try {
    let cipher = crypto.createCipheriv(algorithm, Securitykey, initVector);
    let encryptedData = cipher.update(password, "utf-8", "hex");
    encryptedData += cipher.final("hex");

    return encryptedData;
  } catch (error) {
    throw error;
  }
};

function Main() {
  const args = process.argv.slice(2);

  if (args.length < 2) {
    console.log(`
      Usage:
        node src/util/cryptography.util.js encrypt "text to encrypt"
        node src/util/cryptography.util.js decrypt "hash to decrypt"
        
      Example:
        node src/util/cryptography.util.js encrypt "myPassword123"
        node src/util/cryptography.util.js decrypt "a1b2c3d4e5f6..."
    `);
    return;
  }

  const operation = args[0];
  const input = args[1];

  if (operation === "encrypt") {
    try {
      const result = exports.EncryptString(input);
      console.log("Encrypted:", result);
    } catch (error) {
      console.error("Encryption failed:", error.message);
    }
  } else if (operation === "decrypt") {
    const result = exports.DecryptString(input);
    if (result !== null) {
      console.log("Decrypted:", result);
    } else {
      console.error("Decryption failed");
    }
  } else {
    console.error('Invalid operation. Use "encrypt" or "decrypt"');
  }
}

if (require.main === module) {
  Main();
}
```

**Database**

```js
//@ can be used for universal query SELECT, INSERT, UPDATE, DELETE
exports.Query = async (sql, params = [], prefixes) => {
  try {
    const [result] = await pool.query(sql, params);
    if (sql.trim().toUpperCase().startsWith("INSERT")) {
      return { ...result, insertId: result.insertId };
    }
    if (prefixes && sql.trim().toUpperCase().startsWith("SELECT")) {
      const data = DataModeling(result, prefixes);
      return data;
    }
    return result;
  } catch (error) {
    console.log(error);
    console.error("Error executing query:", error);
    throw error;
  }
};

//@use for Transac and Commit
exports.Transaction = async (queries) => {
  let connection;
  try {
    connection = await pool.getConnection();
    await connection.beginTransaction();

    for (const query of queries) {
      await connection.execute(query.sql, query.values);
    }

    await connection.commit();
    return true;
  } catch (error) {
    console.log("Transaction failed:", error);
    console.log(error);
    if (connection) {
      try {
        await connection.rollback();
      } catch (rollbackError) {
        console.log("Rollback failed after transaction error:", rollbackError);
      }
    }
    throw error;
  } finally {
    if (connection) {
      connection.release();
    }
  }
};
```

`JQuery Utility`

```js
const Query = (url, type, data = null) => {
  return new Promise((resolve, reject) => {
    let ajaxOptions = {
      url: url,
      method: type,
      dataType: "json",
      success: function (result) {
        resolve(result);
      },
      error: function (err) {
        reject(err);
      },
    };

    if (["PUT", "POST", "PATCH", "DELETE"].includes(type) && data) {
      ajaxOptions.data = JSON.stringify(data);
      ajaxOptions.contentType = "application/json";
    }

    $.ajax(ajaxOptions);
  });
};

const queryUtility = {
  async Load(url) {
    return await Query(url, "GET");
  },
  async Save(url, data) {
    return await Query(url, "POST", data);
  },
  async Update(url, data) {
    return await Query(url, "PUT", data);
  },
  async Delete(url, data) {
    return await Query(url, "DELETE", data);
  },
};
```

```html
<form id="userForm">
  <div>
    <label for="username">Username:</label>
    <input
      type="text"
      id="username"
      name="username"
      placeholder="Enter username"
      required
    />
  </div>
  <br />
  <div>
    <label for="email">Email:</label>
    <input
      type="email"
      id="email"
      name="email"
      placeholder="Enter email"
      required
    />
  </div>
  <br />

  <button type="button" id="btnSave">Save</button>
</form>
<div id="responseMessage" style="margin-top: 20px; font-weight: bold;"></div>
```

```js
function getFormData() {
  if (!$("#username").val() || !$("#email").val()) {
    $("#responseMessage").css("color", "red").text("Please fill all fields.");
    return;
  }

  return {
    username: $("#username").val(),
    email: $("#email").val(),
  };
}

$("#btnSave").on("click", async function () {
  const formData = getFormData();

  try {
    // Send data using queryUtility.Save
    const response = await queryUtility.Save("/api/users", formData);
    $("#responseMessage")
      .css("color", "green")
      .text("User saved successfully!");
    console.log("Success:", response);
  } catch (error) {
    $("#responseMessage").css("color", "red").text("Failed to save user.");
    console.error("Error:", error);
  }
});
```
