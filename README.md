# The New TWR App (v2 - Under Development)

## Description
This is an app for TWR Project Management. 
The backend is made using [Nest](https://github.com/nestjs/nest) framework, typeorm and other open-source technologies
The frontend is mainly angular, with d3js and other open-source libraries
There's just one database setup in Postgres.


## Setting up a Development Environment

### Prerequisites
 * Docker (It sets everything up for you.)
 * nodejs

I've obviously not perfectly configured it to run solely on Docker; (I'm no mad genius yet)
So, for now, you have to have nodejs and npm installed. 


Clone this repository download dependencies, cd into the directory and run
```
sudo docker-compose up --build
```

## Stay in touch

- Author - [Samuel Joseph](https://linkedin.com/samuelj123)
- Contact - [Email](mailto:samuelj123@gmail.com)

## License

  This app is [MIT licensed](LICENSE).





# FrontEnd for TWR App

## Setting up a Development Environment

```bash
$ npm install

$ ng serve
```
and run it on localhost:4200


## Running it on a server

```bash 
$ npm install

$ ng build

$ ng serve --prod
```

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
