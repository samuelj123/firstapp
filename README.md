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


Clone this repository download dependencies using 
``` bash
cd frontendtwr && npm install
cd ..
cd backendtwr %% npm install
cd ..
```
Then run the Docker-compose file

``` bash
sudo docker-compose up --build
```

## Stay in touch

- Author - [Samuel Joseph](https://linkedin.com/samuelj123)
- Contact - [Email](mailto:samuelj123@gmail.com)

## License

  This app is [MIT licensed](LICENSE).
