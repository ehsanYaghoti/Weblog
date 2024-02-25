<h1 align="center">
  
  ![favicon-32x32](https://github.com/ehsanYaghoti/Weblog/assets/89301662/f91a98dd-9d87-4f22-984a-b451367df957) Weblog
</h1>
<p align="center">
MongoDB, Expressjs, React, Nodejs
</p>

> Weblog is a fullstack implementation in MongoDB, Expressjs, React , Nodejs.

Weblog is the website  using Javascript/Node for fullstack web development.

## clone or download
```terminal
$ git clone https://github.com/ehsanYaghoti/Weblog
```

## project structure
```terminal
server/
   package.json
   .env
client/
   package.json
...
```

# Usage (run fullstack app on your machine)

## Prerequisites
- [MongoDB](https://gist.github.com/nrollr/9f523ae17ecdbb50311980503409aeb3)
- [Node](https://nodejs.org/en/download/) ^16.0.0
- [npm](https://nodejs.org/en/download/package-manager/)

notice, you need client and server runs concurrently in different terminal session, in order to make them talk to each other

## Client-side usage(PORT: 3000)
```terminal
$ cd client          // go to client folder
$ yarn # or npm i    // npm install packages
$ npm  start // this will run the files in docs
```

## Server-side usage(PORT: 5000)

### Prepare your database

run the script at the first level:

(You need to add a JWT_SECRET in .env to connect to MongoDB)

```terminal
// in the root level
$ cd server
$ mongod
```

### Start

open another terminal and run the script:

```terminal
$ cd server   // go to server folder
$ npm i       // npm install packages
$ npm start dev // run it locally(if there is timeout conection to mongodb error save a js file in server folder)
```
# Dependencies and devDependencies
Server-side | Client-side
--- | ---
app-module-path: ^2.2.0 | @fortawesome/react-fontawesome: ^0.2.0
auto-bind: ^4.0.0|material-tailwind/react: ^2.1.4"
bcryptjs: ^2.4.3 | @tinymce/tinymce-react: ^4.3.0
connect-flash: ^0.1.1 | axios: ^0.27.2
connect-mongo ^5.0.0 | babel-plugin-macros: ^3.1.0
cookie-parser: ^1.4.6 | react: ^18.2.0
cors: ^2.8.5 | react-dom: ^18.2.0
express: ^4.18.2 | react-router-dom: ^5.2.0
mongoose: ^7.5.2 | react-scripts: ^5.0.1
mongoose-paginate-v2: ^1.7.4 | react-select: ^5.4.0
multer: ^1.4.5-lts.1 | sass: ^1.54.4
passport: ^0.6.0 | tailwindcss : ^3.4.0
nodemon: ^2.0.0 |



# Screenshots of this project

User visit Home page
![Screenshot (21)](https://github.com/ehsanYaghoti/Weblog/assets/89301662/02e4a6e1-98b4-4ce1-8fa2-53203860edd2)

![Screenshot (44)](https://github.com/ehsanYaghoti/Weblog/assets/89301662/9441a289-c0d6-4460-8713-08c2984caa79)

![Screenshot (45)](https://github.com/ehsanYaghoti/Weblog/assets/89301662/cadc5979-3ed9-4b1b-a154-4165b70ff7c8)

![Screenshot (46)](https://github.com/ehsanYaghoti/Weblog/assets/89301662/13afb285-f4bd-46d7-ba1b-0d6db3c8f34b)

![Screenshot (63)](https://github.com/ehsanYaghoti/Weblog/assets/89301662/4565a510-d318-4b92-ab54-bd9bd7e72ad8)

User visit article or podcast single page
![Screenshot (47)](https://github.com/ehsanYaghoti/Weblog/assets/89301662/f626968c-55c1-4e82-beb7-185ab5a1ff78)

![Screenshot (48)](https://github.com/ehsanYaghoti/Weblog/assets/89301662/982bb67e-6b72-41e7-94e9-b5661e9f0e54)

![Screenshot (49)](https://github.com/ehsanYaghoti/Weblog/assets/89301662/0b9cb713-e4db-4791-ae6b-7df3c7e6a670)

![Screenshot (50)](https://github.com/ehsanYaghoti/Weblog/assets/89301662/c9fbcac0-ae8d-488c-b912-7d9f411d1d08)

User dashboard page
![Screenshot (51)](https://github.com/ehsanYaghoti/Weblog/assets/89301662/416d0ee7-fc8d-4700-b8dd-31aaa360f805)

![Screenshot (52)](https://github.com/ehsanYaghoti/Weblog/assets/89301662/a3d5cf09-c752-431c-b540-6357babb40c1)

User panel page
![Screenshot (53)](https://github.com/ehsanYaghoti/Weblog/assets/89301662/b621c437-5455-4718-958f-57c51f6f2a8a)

User panel create post page
![Screenshot (54)](https://github.com/ehsanYaghoti/Weblog/assets/89301662/d541b5ee-59bc-4c52-96f4-ff3e205f53d4)

Admin panel page
![Screenshot (55)](https://github.com/ehsanYaghoti/Weblog/assets/89301662/eb0c2d8d-2fe1-41c7-a841-75ad0754b17e)

![Screenshot (56)](https://github.com/ehsanYaghoti/Weblog/assets/89301662/8d17d82f-cf09-45f8-929e-cda30c709b5d)

![Screenshot (57)](https://github.com/ehsanYaghoti/Weblog/assets/89301662/32861547-75b7-4aae-a5db-891aa84718f9)

![Screenshot (58)](https://github.com/ehsanYaghoti/Weblog/assets/89301662/2329d4a0-5555-4905-a385-e677f6de683a)

![Screenshot (60)](https://github.com/ehsanYaghoti/Weblog/assets/89301662/a94d26cf-fa71-4385-ad99-fccae57443f2)

![Screenshot (64)](https://github.com/ehsanYaghoti/Weblog/assets/89301662/0ca9c25d-c9fc-4e85-8061-005cddd22e1d)

![Screenshot (65)](https://github.com/ehsanYaghoti/Weblog/assets/89301662/e1f90ac4-7c97-498e-bcb5-6ee8b2d8caa8)

User can sign in or sign up
![Screenshot (75)](https://github.com/ehsanYaghoti/Weblog/assets/89301662/f2b0fa7a-9bb5-4cf6-b291-6ddc5796f88a)

![Screenshot (76)](https://github.com/ehsanYaghoti/Weblog/assets/89301662/aaae5269-aa56-48fa-8141-808d0e3102e8)

Tags page
![Screenshot (77)](https://github.com/ehsanYaghoti/Weblog/assets/89301662/a5c310d9-479c-4963-93fe-fbe941ff24dd)


## BUGs or comments

[Create new Issues](https://github.com/ehsanYaghoti/Weblog/issues) (preferred)

Email Me: ehsan.yaghoti@yahoo.com
