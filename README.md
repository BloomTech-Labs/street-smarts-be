# API Documentation

#### 1️⃣ Backend delpoyed at [streesmarts-labs24](https://streetsmarts-labs24.herokuapp.com/) <br>

## 1️⃣ Getting started

To get the server running locally:

- Clone this repo
- **npm install** to install all required dependencies
- **npm run server** to start the local server
- **npm test** to start server using testing environment

### Express / knex

Express is an easy to http server framework that the team was familiar with.
We used Postgres to deploy our backend database on Heroku. Heroku has great support for Postgres.

## 2️⃣ Endpoints

#### Car Routes

| Method | Endpoint        | Access Control | Description                             |
| ------ | --------------- | -------------- | --------------------------------------- |
| GET    | `/api/cars`     | all cars       | Returns an array of cars, limited to 20 |
| GET    | `/api/cars/:id` | Car by id      | Returns a car with a specific ID        |
| GET    | `/api/year`     | Car by year    | Returns a year                          |
| GET    | `/api/model`    | Car by model   | Returns a car by model                  |
| GET    | `/api/make`     | Car by make    | Returns the make of the cars            |

#### Query Parameters

The GET `/api/cars` endpoint supports the following query parameters:

| Parameter | Description                                    |
| --------- | ---------------------------------------------- |
| `?make=`  | Filters the list of cars by provided brand     |
| `?model=` | Filters the list of cars by the provided model |
| `?year=`  | Filters the list of cars by the provided year  |

# Data Model

See `epa_vehicles_schema.txt`.

## 2️⃣ Actions

`search()` -> Returns all cars

`searchById(id)` -> Returns a single car by ID

`getModel()` -> Returns all car models

`getMake()` -> Returns all car makes

`getYear()` -> Returns all years

## 3️⃣ Environment Variables

In order for the app to function correctly, the user must set up their own environment variables.

create a .env file that includes the following:

- `DATABASE_URL`: The url to connect to the heroku database. Can change. If the server stops connecting to the database, try updating the `DATABASE_URL`.
  - Append `?ssl=true` to the end of the url
- Set `NODE_TLS_REJECT_UNAUTHORIZED` equal to `0`. This will allow your computer to connect over SSL.

## Contributing

When contributing to this repository, please first discuss the change you wish to make via issue, email, or any other method with the owners of this repository before making a change.

Please note we have a [code of conduct](./code_of_conduct.md). Please follow it in all your interactions with the project.

### Issue/Bug Request

**If you are having an issue with the existing project code, please submit a bug report under the following guidelines:**

- Check first to see if your issue has already been reported.
- Check to see if the issue has recently been fixed by attempting to reproduce the issue using the latest master branch in the repository.
- Create a live example of the problem.
- Submit a detailed bug report including your environment & browser, steps to reproduce the issue, actual and expected outcomes, where you believe the issue is originating from, and any potential solutions you have considered.

### Feature Requests

We would love to hear from you about new features which would improve this app and further the aims of our project. Please provide as much detail and information as possible to show us why you think your new feature should be implemented.

### Pull Requests

If you have developed a patch, bug fix, or new feature that would improve this app, please submit a pull request. It is best to communicate your ideas with the developers first before investing a great deal of time into a pull request to ensure that it will mesh smoothly with the project.

Remember that this project is licensed under the MIT license, and by submitting a pull request, you agree that your work will be, too.

#### Pull Request Guidelines

- Ensure any install or build dependencies are removed before the end of the layer when doing a build.
- Update the README.md with details of changes to the interface, including new plist variables, exposed ports, useful file locations and container parameters.
- Ensure that your code conforms to our existing code conventions and test coverage.
- Include the relevant issue number, if applicable.
- You may merge the Pull Request in once you have the sign-off of two other developers, or if you do not have permission to do that, you may request the second reviewer to merge it for you.

### Attribution

These contribution guidelines have been adapted from [this good-Contributing.md-template](https://gist.github.com/PurpleBooth/b24679402957c63ec426).

## Documentation

See [https://github.com/Lambda-School-Labs/street-smarts-fe/blob/master/README.md] for details on the frontend of our project.
