# shift-tracker rest-ish api -- php

Modelled after [code of a ninja's tutorial](https://www.codeofaninja.com/2017/02/create-simple-rest-api-in-php.html).  Basically divided into a frontend and backend php project.  The backend is 'separate' for semantics and maintainability but dependent on the session initiated by the front-end for authentication and authorization.

The backend consists of simple REST api endpoints (create, read, update, delete) with use of GET and POST methods.  The backend does not strictly adhere to REST principles as there is a reliance on session state and the lack of the proper use of HTTP method verbs (eg. PUT for update routes, DELETE for delete routes).

Each endpoint reads the body of the request and interprets it as a JSON object to process and act on.  It then returns a JSON object as a response in the following format:

```javascript

jsonResponse = {
  "response":"OK", // or "ERROR"
  "message":"brief description of returned result", // or of the error encountered
  "records": [] // an array of the records returned for read/GET requests
}

```

## Ideas

1. convert all read to return ___ object and not the PDOstatement object
2. make use of `$_SERVER['REQUEST_METHOD']` to differentiate GET, PUT, POST, DELETE methods, create unified endpoint

## Hangups

- I don't have a solution for shift tags yet... (eg. evd, crrt)
  - *SOLUTION* decided to create a JSON object in the query for the tags, so that they can be displayed well later with relevant meta-data

## Progress - key

✅ complete
❌ not started
➖ in progress

## Progress - backend

- config
  - ❌ authorization
  - ✅ database
- objects
  - ✅ shift
  - ✅ staff
  - ✅ user
  - ✅ assignment
  - ✅ role
  - ✅ mod
- shift
  - ✅ MariaDB Table
  - ✅ foreign keys
  - ✅ unique index
  - ✅ create
  - ❌ create_many
  - ✅ read
  - ✅ read_one
  - ✅ read_date_range
  - ✅ read_one_staff
  - ✅ update
  - ✅ delete
- staff_member
  - ✅ MariaDB Table
  - ✅ foreign keys
  - ✅ unique index
  - ✅ create
  - ✅ read
  - ✅ update
  - ✅ delete
- user
  - ✅ MariaDB Table
  - ✅ unique index
  - ✅ create
  - ✅ read
  - ✅ check_password
  - ✅ update
  - ✅ delete
- category
  - ✅ MariaDB Table
  - ✅ unique index
  - ✅ create
  - ✅ read
  - ✅ update
  - ✅ delete
- role
  - ✅ MariaDB Table
  - ✅ unique index
  - ✅ create
  - ✅ read
  - ✅ update
  - ✅ delete
- assignment
  - ✅ MariaDB Table
  - ✅ unique index
  - ✅ create
  - ✅ read
  - ✅ update
  - ✅ delete
- mod
  - ✅ MariaDB Table
  - ✅ unique index
  - ✅ create
  - ✅ read
  - ✅ update
  - ✅ delete
- shift_to_mod
  - ✅ MariaDB Table
  - ✅ foreign keys
  - ✅ unique index
  - ✅ create
  - ✅ read
  - ✅ update
  - ✅ delete

## Progress - frontend

- ❌ processes
  - ❌ auth state
  - ❌ ajax query lib
- ❌ pages
  - ❌ landing
  - ❌ index
    - ❌ date range table
    - ❌ dynamic shift edit
  - ❌ shifts
    - ❌ add unit shift
    - ❌ add single shift
    - ❌ find shift
    - ❌ shift report
  - ❌ staff member
    - ❌ add
    - ❌ review/report
    - ❌ edit/delete
  - ❌ admin panel
    - ❌ add user
    - ❌ change password
    - ❌ remove user
    - ❌ change auth
