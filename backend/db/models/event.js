'use strict';
module.exports = (sequelize, DataTypes) => {
  const Event = sequelize.define('Event', {
    name: DataTypes.STRING,
    hostId: DataTypes.INTEGER,
    groupId: DataTypes.INTEGER,
    location: DataTypes.STRING,
    description: DataTypes.STRING,
    eventDate: DataTypes.DATE,
    eventType: DataTypes.STRING,
    availableSpots: DataTypes.INTEGER,
    imgURL: DataTypes.STRING
  }, {});
  Event.associate = function(models) {
    // associations can be defined here
  };
  return Event;
};