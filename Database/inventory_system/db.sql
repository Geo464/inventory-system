-- Write your own SQL object definition here, and it'll be included in your package.
CREATE DATABASE Inventory_System;
GO

USE Inventory_System;
GO


-- Tabla de roles
CREATE TABLE Roles (
    role_id INT IDENTITY(1,1) PRIMARY KEY,
    role_name VARCHAR(50) NOT NULL
);


-- Tabla de usuarios
CREATE TABLE Users (
    user_id INT IDENTITY(1,1) PRIMARY KEY,
    user_username VARCHAR(50) NOT NULL,
    user_email VARCHAR(255) UNIQUE NOT NULL,
    user_password VARCHAR(255) NOT NULL,
    role_id INT,
    user_created_date DATE,

    FOREIGN KEY (role_id) REFERENCES Roles(role_id)
);


-- Tipos de productos
CREATE TABLE Type_Products (
    type_id INT IDENTITY(1,1) PRIMARY KEY,
    type_name VARCHAR(50) NOT NULL
);


-- Productos
CREATE TABLE Products (
    product_id INT IDENTITY(1,1) PRIMARY KEY,
    product_name VARCHAR(50) NOT NULL,
    product_stock INT NOT NULL DEFAULT 0,
    product_price DECIMAL(10,2) NOT NULL,
    type_id INT,

    FOREIGN KEY (type_id) REFERENCES Type_Products(type_id)
);


-- Tipos de clientes
CREATE TABLE Customers_Type (
    type_id INT IDENTITY(1,1) PRIMARY KEY,
    type_name VARCHAR(50) NOT NULL
);


-- Clientes
CREATE TABLE Customers (
    customer_id INT IDENTITY(1,1) PRIMARY KEY,
    customer_name VARCHAR(50) NOT NULL,
    type_id INT,
    customer_created_date DATE,

    FOREIGN KEY (type_id) REFERENCES Customers_Type(type_id)
);


-- Ordenes
CREATE TABLE Orders (
    order_id INT IDENTITY(1,1) PRIMARY KEY,
    customer_id INT,
    user_id INT,
    order_date DATE,
    total DECIMAL(10,2),

    FOREIGN KEY (customer_id) REFERENCES Customers(customer_id),
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
);


-- Detalles de orden
CREATE TABLE Order_Details (
    detail_id INT IDENTITY(1,1) PRIMARY KEY,
    order_id INT,
    product_id INT,
    quantity INT NOT NULL,
    price_at_purchase DECIMAL(10,2) NOT NULL,

    FOREIGN KEY (order_id) REFERENCES Orders(order_id),
    FOREIGN KEY (product_id) REFERENCES Products(product_id)
);


-- Movimientos de inventario
CREATE TABLE Inventory_Movements (
    movement_id INT IDENTITY(1,1) PRIMARY KEY,
    product_id INT NOT NULL,
    user_id INT NOT NULL,
    movement_type VARCHAR(20) NOT NULL,
    quantity INT NOT NULL,
    movement_date DATE NOT NULL,
    description VARCHAR(255),

    FOREIGN KEY (product_id) REFERENCES Products(product_id),
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
);
GO