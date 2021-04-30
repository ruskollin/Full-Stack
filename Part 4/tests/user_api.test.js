const supertest = require('supertest');
const User = require('../models/user')
const helper = require('../utils/test_helper');
const app = require('../app');
const api = supertest(app);

const initialUsers = [
  {
    name: 'Winnie',
    username: 'Pooh',
    password: 'bears',
  },
  {
    name: 'Felicitte',
    username: 'spacecat',
    password: 'cats',
  },
];

beforeEach(async () => {
  await User.deleteMany({});

  const usersArray = initialUsers.map((user) => new User(user));
  const promiseArray = usersArray.map((user) => user.save());

  await Promise.all(promiseArray);
});

describe('when there is initially some users saved', () => {
  test('users are returned as json', async () => {
    await api
      .get('/api/users')
      .expect(200)
      .expect('Content-Type', /application\/json/);
  });

  test('shows correct number of users', async () => {
    const users = await api.get('/api/users');
    expect(users.body.length).toBe(initialUsersList.length);
  })
})

describe('addition of new user', () => {
  test('succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'mluukkai',
      name: 'Matti Luukkainen',
      password: 'salainen',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    expect(usernames).toContain(newUser.username)
  })

  test('fails if username is not unique', async () => {
    const newUser = {
      name: 'Catarina Poe',
      username: 'spacecat',
      password: 'cats',
    };

    await api.post('/api/users').send(newUser);

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toHaveLength(initialUsers.length);
  });

  test('fails for missing username', async () => {
    const newUser = {
      name: 'Jellylorum',
      password: 'cats',
    };

    const addedUser = await api.post('/api/users').send(newUser);
    expect(addedUser.status).toBe(400);
    expect(addedUser.body.error).toBe('username is empty');
  });

  test('fails for missing password', async () => {
    const newUser = {
      name: 'Mademoiselle Fifi',
      username: 'Paree',
    };

    const addedUser = await api.post('/api/users').send(newUser);
    expect(addedUser.status).toBe(400);
    expect(addedUser.body.error).toBe('password is empty');
  });

  test('fails if username is not at least 3 characters long', async () => {
    const newUser = {
      name: 'Professor Meowingtons',
      username: 'mw',
      password: 'cats',
    };

    const addedUser = await api.post('/api/users').send(newUser);

    expect(addedUser.status).toBe(400);
    expect(addedUser.body.error).toBe(
      'username must be at least 3 characters long'
    );
  });

  test('fails if password is not at least 3 characters long', async () => {
    const newUser = {
      name: 'Shorty Blackwell',
      username: 'Monkees',
      password: 'oi',
    };

    const addedUser = await api.post('/api/users').send(newUser);

    expect(addedUser.status).toBe(400);
    expect(addedUser.body.error).toBe(
      'password must be at least 3 characters long'
    );
  });
});