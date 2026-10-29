const mysql = require("mysql");
const express = require("express");
const bodyparser = require("body-parser");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const app = express();
let databaseReady = false;

app.use(cors());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(__dirname));

const PORT = 3001;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));

// ✅ MySQL connection
const mysqlConnection = mysql.createConnection({
  host: process.env.DB_HOST || "127.0.0.1",
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME || "bonsa",
  multipleStatements: true
});

// ✅ Connect
mysqlConnection.connect(err => {
  if (err) {
    databaseReady = false;
    console.error("❌ MySQL Error: check DB_HOST, DB_USER, DB_PASSWORD, and DB_NAME");
  } else {
    databaseReady = true;
    console.log("✅ MySQL Connected");
  }
});

const requireDatabase = (req, res, next) => {
  if (!databaseReady) {
    return res.status(503).json({
      error: "Database unavailable. Configure the MySQL environment variables and restart the server."
    });
  }

  next();
};

// ✅ TABLE CREATION ROUTE
app.get("/install", requireDatabase, (req, res) => {
  const products = `
    CREATE TABLE IF NOT EXISTS products (
      product_id INT PRIMARY KEY AUTO_INCREMENT,
      product_url VARCHAR(255) NOT NULL,
      product_name VARCHAR(255) NOT NULL
    );
  `;

  const productsDescription = `
    CREATE TABLE IF NOT EXISTS productsDescription (
      description_id INT AUTO_INCREMENT PRIMARY KEY,
      product_id INT NOT NULL,
      product_brief_description TEXT NOT NULL,
      product_description TEXT NOT NULL,
      product_img VARCHAR(255) NOT NULL,
      product_link VARCHAR(255) NOT NULL,
      FOREIGN KEY (product_id) REFERENCES products(product_id)
    );
  `;

  const productsPrice = `
    CREATE TABLE IF NOT EXISTS productsPrice (
      price_id INT AUTO_INCREMENT PRIMARY KEY,
      product_id INT NOT NULL,
      starting_price VARCHAR(255) NOT NULL,
      price_range VARCHAR(255) NOT NULL,
      FOREIGN KEY (product_id) REFERENCES products(product_id)
    );
  `;

  mysqlConnection.query(products, err => {
    if (err) return res.send(err);
    mysqlConnection.query(productsDescription, err => {
      if (err) return res.send(err);
      mysqlConnection.query(productsPrice, err => {
        if (err) return res.send(err);
        res.send("✅ All tables created successfully!");
      });
    });
  });
});


app.get("/seed-iphone", requireDatabase, (req, res) => {
  const productQuery = `
    INSERT INTO products (product_url, product_name)
    VALUES ('iphone', 'iPhone SE')
  `;

  mysqlConnection.query(productQuery, (err, result) => {
    if (err) return res.send(err);

    const product_id = result.insertId;

    const descQuery = `
      INSERT INTO productsDescription
      (product_id, product_brief_description, product_description, product_img, product_link)
      VALUES (?, ?, ?, ?, ?)
    `;

    mysqlConnection.query(
      descQuery,
      [
        product_id,
        "Lots to love. Less to spend.",
        "The best for the brightest.",
        "/images/iphone/iphone-se.png",
        "/iphone/se"
      ],
      err => {
        if (err) return res.send(err);

        const priceQuery = `
          INSERT INTO productsPrice
          (product_id, starting_price, price_range)
          VALUES (?, ?, ?)
        `;

        mysqlConnection.query(
          priceQuery,
          [product_id, "$399", "From $9.54/mo. or $229 with trade-in"],
          err => {
            if (err) return res.send(err);
            res.send("✅ iPhone SE inserted successfully!");
          }
        );
      }
    );
  });
});



app.get("/iphone", requireDatabase, (req, res) => {
  const query = `
    SELECT 
      products.product_name,
      productsDescription.product_brief_description,
      productsDescription.product_img,
      productsDescription.product_link,
      productsPrice.starting_price,
      productsPrice.price_range
    FROM products
    JOIN productsDescription 
      ON products.product_id = productsDescription.product_id
    JOIN productsPrice 
      ON products.product_id = productsPrice.product_id
  `;

  mysqlConnection.query(query, (err, results) => {
    if (err) {
      console.log("❌ FETCH ERROR:", err);
      return res.status(500).json({ error: "Unable to fetch iPhone products." });
    }

    res.json({ products: results });
  });
});

app.post("/addiphone", requireDatabase, (req, res) => {
  const {
    iphoneId,
    imgPath,
    iphoneLink,
    iphoneTitle,
    briefDescription,
    startprice,
    priceRange,
    fullDescription
  } = req.body;

  const insertProduct = `
    INSERT INTO products (product_url, product_name)
    VALUES (?, ?)
  `;

  mysqlConnection.query(insertProduct, [iphoneId, iphoneTitle], (err, result) => {
    if (err) {
      console.error("Insert product failed:", err);
      return res.status(500).json({ error: "Unable to insert product." });
    }

    const product_id = result.insertId;

    const insertDesc = `
      INSERT INTO productsDescription
      (product_id, product_brief_description, product_description, product_img, product_link)
      VALUES (?, ?, ?, ?, ?)
    `;

    mysqlConnection.query(
      insertDesc,
      [product_id, briefDescription, fullDescription, imgPath, iphoneLink],
      (err) => {
        if (err) {
          console.error("Insert description failed:", err);
          return res.status(500).json({ error: "Unable to insert product details." });
        }

        const insertPrice = `
          INSERT INTO productsPrice
          (product_id, starting_price, price_range)
          VALUES (?, ?, ?)
        `;

        mysqlConnection.query(
          insertPrice,
          [product_id, startprice, priceRange],
          (err) => {
            if (err) {
              console.error("Insert price failed:", err);
              return res.status(500).json({ error: "Unable to insert product price." });
            }

            res.json({ success: true, message: "✅ iPhone successfully inserted into all tables!" });
          }
        );
      }
    );
  });
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});





