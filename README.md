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

- ✅ complete
- ❌ not started
- ➖ in progress

## Progress - backend

- ✅ config
  - ✅ authorization
  - ✅ database
- ✅ objects
  - ✅ shift
  - ✅ staff
  - ✅ user
  - ✅ assignment
  - ✅ role
  - ✅ mod
- ✅ shift
  - ✅ MariaDB Table
  - ✅ foreign keys
  - ✅ unique index
  - ✅ create
  - ✅ read
  - ✅ read_one
  - ✅ read_date_range
  - ✅ read_one_staff
  - ✅ update
  - ✅ delete
- ✅ staff_member
  - ✅ MariaDB Table
  - ✅ foreign keys
  - ✅ unique index
  - ✅ create
  - ✅ read
  - ✅ update
  - ✅ delete
- ✅ user
  - ✅ MariaDB Table
  - ✅ unique index
  - ✅ create
  - ✅ read
  - ✅ check_password
  - ✅ update
  - ✅ delete
  - ✅ login
  - ✅ logout
- ✅ category
  - ✅ MariaDB Table
  - ✅ unique index
  - ✅ create
  - ✅ read
  - ✅ update
  - ✅ delete
- ✅ role
  - ✅ MariaDB Table
  - ✅ unique index
  - ✅ create
  - ✅ read
  - ✅ update
  - ✅ delete
- ✅ assignment
  - ✅ MariaDB Table
  - ✅ unique index
  - ✅ create
  - ✅ read
  - ✅ update
  - ✅ delete
- ✅ mod
  - ✅ MariaDB Table
  - ✅ unique index
  - ✅ create
  - ✅ read
  - ✅ update
  - ✅ delete
- ✅ shift_to_mod
  - ✅ MariaDB Table
  - ✅ foreign keys
  - ✅ unique index
  - ✅ create
  - ✅ read
  - ✅ update
  - ✅ delete

## Progress - frontend

- ✅ processes
  - ✅ auth state
  - ✅ axios
  - ✅ handlebars / gulp
- ✅ pages
  - ✅ landing
  - ✅ home
    - ✅ date range table
    - ✅ dynamic shift edit
  - ✅ shifts
    - ✅ add unit shift
    - ✅ add single shift
    - ✅ shift report
  - ✅ staff member
    - ✅ review
  - ✅ admin panel
    - ✅ add user
    - ✅ change password
    - ✅ remove user
    - ✅ change auth
