Lets Setup the project
Start Backend
npm run dev

Start Frontend
npm run start

    MongoDB
    sudo systemctl start mongod
    sudo systemctl enable mongod
    sudo systemctl status mongod

Setup Server Config

    .env file

    APP_NAME=Hostal
    DB_URI=mongodb://localhost:27017/hostal_management
    JWT_SECRET=hostal
    PORT=5000

Now Setup Database in MongoDB Compass

    Run :mongodb-compass in terminal

    DataBase Name       :hostal_management
    Collection          :hostal_management
    Connection Stining  :mongodb://localhost:27017
