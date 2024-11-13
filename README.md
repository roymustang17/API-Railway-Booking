# Installation

1. Clone repo
2. Install dependency: npm i
3. Create env file in root folder and add following:

PORT=3000
DB_HOST=your_hostname
DB_USER= your_username
DB_PASSWORD=your_password
DB_NAME=your_db_name
ADMIN_API_KEY=your_admin_api_key
JWT_SECRET=your_jwt_secret

Note: add DBname and other as per your setup in workbench mySQL 

4. Run project using node app.js

## Technology used
NodeJS , ExpressJS and MySQL

# TABLE SS
## user table
This table help us to maintain which user is admin or normal user. Also, secret key is used to sign the password and same secret key is used to decrypt the password.
![Screenshot 2024-11-13 215752](https://github.com/user-attachments/assets/c53b8cc4-8990-4e4f-aec7-6c41ac13cff5)


## Train table
This table is used to maintain the present train, their route, id and number of seats, etc. No. of seats per train is tracked using this table.
![Screenshot 2024-11-13 215846](https://github.com/user-attachments/assets/c27b1949-9149-4792-b1fc-b330c1a881b3)


## Booking table
This table is used to store bookings, it store train id and the booking id for each seat. Multiple seats can be booked at once and race condition handled.
![Screenshot 2024-11-13 215937](https://github.com/user-attachments/assets/6271c4d6-4adc-4a93-b4b4-410e2a76a81c)

# Working 
## 1. Register a User
### http://localhost:3000/api/users/register
![Screenshot 2024-11-13 221230](https://github.com/user-attachments/assets/806910c4-d8af-44d4-a4bc-b5390db3771a)



## 2. Login User
### http://localhost:3000/api/users/login
![Screenshot 2024-11-13 220938](https://github.com/user-attachments/assets/96493f69-e823-401d-b8b0-1f17a70591be)


## 3. Add a New Train
###
![Screenshot (100)](https://github.com/user-attachments/assets/419915d4-4fdf-4128-bc32-72a439bad5c5)

both organisation api key and authorization key of admin login is neeeded to add new train.
![Screenshot (99)](https://github.com/user-attachments/assets/cf665090-1cb8-4eca-adaa-dc927bc36f59)


## 4. Get Seat Availability
###
![Screenshot 2024-11-13 221705](https://github.com/user-attachments/assets/371e5a72-7043-40a9-bcdd-2b68cc3bdc32)


## 5. Book a Seat
### http://localhost:3000/api/bookings/book
Booking multiple/single seat at once.
### For getting booking seats, Authorization Token received in the login endpoint is required.
![Screenshot (101)](https://github.com/user-attachments/assets/b3fa5bd2-0eeb-4688-a6b1-2c280318b60c)

If try to book more than capacity 
![Screenshot (102)](https://github.com/user-attachments/assets/d0a4c107-5898-4d8b-873b-43bddaac30f0)


## 6. Authorization is implemented and Signing of key using secret key is done.

## 7. Admin api endpoints are protected using the ADMIN API KEY
