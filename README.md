Lets Setup the project
Start Backend
npm run dev

Setup & Install Process

    #backend folder

    npm install
    npm run dev

    #frontend folder

    npm install
    npm start

    #db_backup folder

    all backup collection is here

Start Frontend

    #MongoDB
    sudo systemctl start mongod
    sudo systemctl enable mongod
    sudo systemctl status mongod

Setup Server Config

    .env file

    APP_NAME=PointOfSell
    DB_URI=mongodb://localhost:27017/point_of_sell
    JWT_SECRET=point_of_sell
    PORT=5000

Now Setup Database in MongoDB Compass

    Run :mongodb-compass in terminal

    DataBase Name       :point_of_sell
    Collection          :point_of_sell
    Connection Stining  :mongodb://localhost:27017
