MTGA Stats

## About
MTGA Stats keeps track of statistics related to decks and games for MTGA Arena. 

I started this project as a way to learn Golang as you can see here.
https://github.com/richardspirit/mtga_stats

As I went along, I realized that I needed to implement a GUI to make it more useful. 
To solve the problem of a gui, I first learned javascript then ReactJS which resulted in this project. 

Since both of these are learning projects there will likely be inconsistency usages and implementation.
I am open to any suggestions to improve the code or organization. 

## Getting Started

This is not a finished release so all pieces will have to be manually installed and setup. 

First, you will need to install the following software:

MariaDB/MySQL 10.6.4

Golang version 1.17.4

Go Dependencies: 

github.com/go-sql-driver/mysql 

v1.6.0 github.com/gorilla/mux v1.8.0

React version 17.0.2 - React dependencies in package.json need to be cleaned up but most of them will be needed. 

After installing all necessary software you will need to set up the database using the sql script.
https://github.com/richardspirit/mtga_stats_beta/blob/main/server/database_ddl.sql


## Run the development server:

In one terminal run:

Go to server directory and run:

go run main.go anal.go

In a second terminal run:

Go to mtga_stats directory and run:

yarn dev

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

