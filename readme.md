Todos Backend Project

## Installation process of node_module package

#### Command

```bash
npm init
```

### Initilize the given .env variable with their appropriate value

###### JWT_SECRET_KEY=

###### JWT_TOKEN_EXPIRES_IN=

###### MONGO_DB_URL

## To run the project

#### use the Command

```bash
npm run dev
```

## Routes

### User routes

```base
 POST: /api/v1/user/create

 POST: /api/v1/user/login

 PATCH: /api/v1/user/update/first-name

 PATCH: /api/v1/user/update/last-name

 PATCH: /api/v1/user/update/email

 PATCH: /api/v1/user/update/password

 PATCH: /api/v1/user/update/user-details

 DELETE: /api/v1/user/delete

 GET: /api/v1/user

```

### Todos routes

```base
 POST: /api/v1/todos/create

 PATCH: /api/v1/todos/update/title/:_id  (_id of the todos which we want to update)

 GET: /api/v1/todos

 DELETE: /api/v1/todos/delete/:_id  (_id of the todos which we want to delete)
```

### Task routes

```base
 POST: /api/v1/task/add/:_id  (_id of the todos in which we want to add the task)

 PATCH: /api/v1/task/update/task-name/:_id  (_id of the task which we want to update)

 PATCH: /api/v1/task/update/status/:_id  (_id of the task which we want to update)

 DELETE: /api/v1/task/delete/:_id (_id of the todos which we want to delete)

```
