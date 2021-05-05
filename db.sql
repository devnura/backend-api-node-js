create database node-api;

DROP TABLE users;

DROP TABLE products;

CREATE TABLE IF NOT EXISTS users
  (id SERIAL PRIMARY KEY, 
  username VARCHAR(32) UNIQUE NOT NULL, 
  name VARCHAR(32),  
  password VARCHAR(256) NOT NULL,
  role varchar(1) not null default 2,
  created_at timestamp with time zone default current_timestamp not null,
  updated_at timestamp with time zone default current_timestamp not null
  );
  
 
CREATE TABLE IF NOT EXISTS products
    (id SERIAL PRIMARY KEY,
    product_name VARCHAR(100) UNIQUE NOT NULL,
    purchase_price INTEGER NOT NULL,
    selling_price INTEGER NOT NULL,
    stock integer NOT NULL,
    created_at timestamp with time zone default current_timestamp not null,
    updated_at timestamp with time zone default current_timestamp not null
    );
    
insert into users (username, name, password, role) values('jhon_wicjk', 'Jhon Wicjk Setiadi', '$2b$10$9ReJEFkFS2bUxyToISClYuLgq9zS8u1P5l/WZCC165nWgrUAaDNnW', '1');
   