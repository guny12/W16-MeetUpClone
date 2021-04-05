- Wiki docs: https://github.com/guny12/W16-MeetUpClone/wiki

# Cook Off

Cook Off is a website to connect chefs, cooks, and people who want to have a unique dining experience. Users will be able to create and join groups. Groups will have events that users can host and rsvp to attend to. Each group page will have a calendar that shows the upcoming events. Users will be able to search for groups, and events to join.

## Installation and use

- git clone `https://github.com/guny12/W16-MeetUpClone`
- cd into folder frontend folder, run `npm install`

  - while still in frontend folder: run npm start

- cd into folder backend folder, run `npm install`
- while still in backend folder:
  - Run `npx dotenv sequelize db:create`
  - Then `npx dotenv sequelize db:migrate`
  - Then `npx dotenv sequelize db:seed:all`
  - Then `npm start`

## Technologies Used

- Express
- Sequelize
- React
- React-Redux
- CSS
- Javascript

## Features

- User Creation
- User Login
- Demo User
- Search
- Group Creation
- Group Getting info
- Group Updating
- Group Deletion
- Event Creation
- Event Getting info
- Event Updating
- Event Deletion
