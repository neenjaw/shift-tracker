# shfittracker rest-ish api -- php

Modelled after [code of a ninja's tutorial](https://www.codeofaninja.com/2017/02/create-simple-rest-api-in-php.html).

- config
  - ❌ authorization
  - ❌ core
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
  - ❌ create
  - ❌ read
  - ❌ read_one
  - ❌ read_report
  - ❌ update
  - ❌ delete
  - ❌ search
- staff_member
  - ✅ MariaDB Table
  - ✅ foreign keys
  - ✅ unique index
  - ❌ create
  - ✅ read
  - ❌ update
  - ❌ delete
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
  - ❌ create
  - ❌ read
  - ✅ update
  - ❌ delete
- role
  - ✅ MariaDB Table
  - ✅ unique index
  - ❌ create
  - ✅ read
  - ✅ update
  - ❌ delete
- assignment
  - ✅ MariaDB Table
  - ✅ unique index
  - ❌ create
  - ✅ read
  - ✅ update
  - ❌ delete
- mod
  - ✅ MariaDB Table
  - ✅ unique index
  - ✅ shift_to_mod table
    - ✅ foreign keys
    - ✅ unique index
  - ❌ create
  - ✅ read
  - ✅ update
  - ❌ delete