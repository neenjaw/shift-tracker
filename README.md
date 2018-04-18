# shift-tracker

## frontend

The front end is designed to be an interface to the shift tracker REST**ish**-API.  Basic design decisions being:

- HTML5 / CSS / Bootstrap 4 / Font Awesome 5
- ES5 JS for IE compatibility
- Handlebars Templates using the JS library, precompiled then uploaded as compiled templates.js using gulp
- Axios for interaction with the REST**ish**-API
- JQuery used minimally for document.onready and for bootstrap support

Making sure to:

- Modularize my css files
- Modularize my js files

Plan for now, keep it simple, get a working version done, don't get side-tracked by details.

## backend -- rest-*ish* api

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

1. **nah** convert all read to return ___ object and not the PDOstatement object
2. **later** make use of `$_SERVER['REQUEST_METHOD']` to differentiate GET, PUT, POST, DELETE methods, create unified endpoint

## Hangups

- **fixed** I don't have a solution for shift tags yet... (eg. evd, crrt)
  - *SOLUTION* decided to create a JSON object in the query for the tags, so that they can be displayed well later with relevant meta-data
  - *caveat* I am using MariaDB 10.2 and 000webhost uses MariaDB 10.1, so while on 10.2 this is done elegantly on the database side with GROUP_CONCAT and JSON_OBJECT, it has to be done manually with CONCAT formatting the string object.

## Progress - key

- [x] complete
- [ ] in progress

## Progress - backend

- [x] config
  - [x] authorization
  - [x] database
- [x] objects
  - [x] shift
  - [x] staff
  - [x] user
  - [x] assignment
  - [x] role
  - [x] mod
- [x] shift
  - [x] MariaDB Table
  - [x] foreign keys
  - [x] unique index
  - [x] create
  - [x] read
  - [x] read_one
  - [x] read_date_range
  - [x] read_one_staff
  - [x] update
  - [x] delete
- [x] staff_member
  - [x] MariaDB Table
  - [x] foreign keys
  - [x] unique index
  - [x] create
  - [x] read
  - [x] update
  - [x] delete
- [x] user
  - [x] MariaDB Table
  - [x] unique index
  - [x] create
  - [x] read
  - [x] check_password
  - [x] update
  - [x] delete
  - [x] login
  - [x] logout
- [x] category
  - [x] MariaDB Table
  - [x] unique index
  - [x] create
  - [x] read
  - [x] update
  - [x] delete
- [x] role
  - [x] MariaDB Table
  - [x] unique index
  - [x] create
  - [x] read
  - [x] update
  - [x] delete
- [x] assignment
  - [x] MariaDB Table
  - [x] unique index
  - [x] create
  - [x] read
  - [x] update
  - [x] delete
- [x] mod
  - [x] MariaDB Table
  - [x] unique index
  - [x] create
  - [x] read
  - [x] update
  - [x] delete
- [x] shift_to_mod
  - [x] MariaDB Table
  - [x] foreign keys
  - [x] unique index
  - [x] create
  - [x] read
  - [x] update
  - [x] delete

## Progress - frontend

- [x] processes
  - [x] auth state
  - [x] axios
  - [x] handlebars / gulp
- [x] pages
  - [x] landing
  - [x] home
    - [x] date range table
    - [x] dynamic shift edit
  - [x] shifts
    - [x] add unit shift
    - [x] add single shift
    - [x] shift report
  - [x] staff member
    - [x] review
  - [x] admin panel
    - [x] add user
    - [x] change password
    - [x] remove user
    - [x] change auth
