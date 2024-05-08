const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Profile extends Model {
    static associate(models) {
      Profile.belongsTo(models.User); 
    }
  } 

  Profile.init({
    name: DataTypes.STRING,
    location: DataTypes.STRING,
    about: DataTypes.TEXT,
    bio: DataTypes.TEXT,
    followerCount: DataTypes.INTEGER,
    connectionCount: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Profile',
  });

  return Profile;
};
