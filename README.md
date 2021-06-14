- Wiki docs: https://github.com/guny12/W16-MeetUpClone/wiki

# Cook Off

Cook Off is a website to connect chefs, cooks, and people who want to have a unique dining experience. Users will be able to create and join groups. Groups will have events that users can host and rsvp to attend to. Each group page will have a calendar that shows the upcoming events. Users will be able to search for groups, and events to join.

## Technologies Used

### Frontend

I used [React](https://reactjs.org/) to create components that could be combined to create the interactive UI. The application state was managed using [Redux](https://redux.js.org/) and [react-redux](https://react-redux.js.org/) library, which made requests to the backend API and updated the store as neccessary. This allowed me to forgo prop threading data throughout all my components and update components only as needed.

### Backend

I used an SQL database with [PostgreSQL](https://www.postgresql.org/) as the RDBMS, [Express](https://expressjs.com/) as the backend server framework, [Sequelize](https://sequelize.org/) as the ORM.

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
