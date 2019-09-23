# Setup
- Copy this source code to folder <b>config</b> and filename is <b>config.json</b> or copy file <b>config.example.json</b>

		{
			"development": {
		    	"username": "root",
		    	"password": null,
		    	"database": "nodejs",
		    	"host": "127.0.0.1",
		    	"dialect": "mysql" 
	    	},
	    	"test": {
			    "username": "root",
			    "password": null,
			    "database": "nodejs",
			    "host": "127.0.0.1",
			    "dialect": "mysql"
	    	},
		    "production": {
			    "username": "root",
			    "password": null,
			    "database": "nodejs",
			    "host": "127.0.0.1",
			    "dialect": "mysql"
			}
		}

- Copy this file <b>.env.example</b> and then rename to <b>.env</b> place in your root project

# ORM With Sequelize
<a href="//docs.sequelizejs.com/manual/installation/getting-started.html">ORM With Sequelize</a>
# About Promise
<a href="//developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise">About Promise</a>
# HTML To PUG Generator
<a href="//pughtml.com">HTML To PUG Generator</a>
# Screenshoot
![Alt text](public/assets/images/screenshoot.png?raw=true "Screenshoot" )

# Run With Nodemon
	nodemon ./server.js 127.0.0.1 3000
# Running Migrate
	npx sequelize-cli db:migrate
# Running Seeder
	npx sequelize-cli db:seed:all
# Generate Migration
	npx sequelize-cli model:generate --name Table --attributes field1:string,field2:string