# db-engine
Engine for postgreSQL and MySQL databases

### Current status (DEV)

This package is currently in development

### Roadmap
* Add postgresql support (DEV)
* Add mysql support (DEV)

### Instalation

- install with npm
```bash
npm install jelly-db-engine
```

- install with yarn
```bash
yarn add jelly-db-engine
```

### Documentation

- connection type
* postgresql
* mysql

- connect to database

```javascript
const con = {
    type: 'mysql',
    host: '127.0.0.1',
    user: 'user',
    pass: '',
    port: 3306,
    database: 'mydatabase',
};

new DBEngine().connect(
            con.type,
            con.host,
            con.user,
            con.pass,
            con.port,
            con.database).then((e: any) => {
                console.log('connecting...', e);
            });
```
