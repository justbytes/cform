const User = require('./User');
const Post = require('./Post');

// Define sequelize associations in this file.
User.hasMany(Post, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
});

Post.belongsTo(User, {
  foreignKey: 'user_id',
});

module.exports = { User, Post };
