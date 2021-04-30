const bcrypt = require('bcryptjs')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.post('/', async (request, response, next) => {
  const body = request.body
  const { password, username } = body;

  if (!username) {
    response.status(400).json({ error: 'username is empty' });
    return;
  }
  if (!password) {
    response.status(400).json({ error: 'password is empty' });
    return;
  }
  if (username.length && username.length < 3) {
    response
      .status(400)
      .json({ error: 'username must be at least 3 characters long' });
    return;
  }
  if (password.length && password.length < 3) {
    response
      .status(400)
      .json({ error: 'password must be at least 3 characters long' });
    return;
  }

  try {
    const saltRounds = bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, saltRounds);

    const user = new User({
      username: body.username,
      name: body.name,
      passwordHash,
    });

    const addedUser = await user.save();

    response.json(addedUser.toJSON());
  } catch (err) {
    next(err);
  }
});

usersRouter.get('/', async (request, response, next) => {
  try {
    const users = await User.find({}).populate('blogs', {
      title: 1,
      url: 1,
      author: 1,
    });
    response.json(users.map((user) => user.toJSON()));
  } catch (err) {
    next(err);
  }
});

module.exports = usersRouter