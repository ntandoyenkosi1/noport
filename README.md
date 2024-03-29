# NoPort
NoPort is a CLI tool that utilizes the MVC architecture. It allows a user to only define models and then the user can run a command to generate controllers and views. It utilizes Mongoose, Express and MVC.
## Installation
Install depencies using the following command
```shell
npm install
```
Add some mongoose models in the `models` folder.

Create all the required MVC files using this command
```shell
$ npm run setup
```
Run the project locally using
```shell
npm start
```
## Usage
**In Development**
Visit: http://localhost:3001/ and utilize the app.

NoPort is still in progress. :)

Status:

- ~~Generating controllers from models~~
- ~~Generating HTTP routes~~
- ~~Added support for handlebars~~
- ~~Generating views for Server Side Rendering~~
- ~~Generate corresponding JS files for views~~
- ~~Consolidate JS and Handlebars files as a unit~~
- ~~Adding basic Express authentication~~
- Resolving any issues
- Adding tests
- Converting the app to a CLI tool
- Publishing as a Node package

Tech stack:
- NodeJS
- ExpressJS
- Mongoose
- HandlebarsJS
- Chai