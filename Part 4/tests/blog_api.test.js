const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const helper = require('../utils/test_helper')

const initialBlogs = [
    {
        _id: "5a422a851b54a676234d17f7",
        title: "React patterns",
        author: "Michael Chan",
        url: "https://reactpatterns.com/",
        likes: 7,
        __v: 0
    },
    {
        _id: "5a422ba71b54a676234d17fb",
        title: "TDD harms architecture",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
        likes: 0,
        __v: 0
    }
]

beforeEach(async () => {
    await Blog.deleteMany({})
    let blogObject = new Blog(initialBlogs[0])
    await blogObject.save()
    blogObject = new Blog(initialBlogs[1])
    await blogObject.save()
})


describe('when there is initially some blogs saved', function () {
    test('blogs are returned as json', async () => {
        await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/);
    });

    test('shows correct amount of blogs', async () => {
        const blogs = await api.get('/api/blogs');
        expect(blogs.body.length).toBe(2);
    });

    test('verifies unique identifier property of blog by id', async () => {
        const blogs = await api.get('/api/blogs');
        expect(blogs.body[0].id).toBeDefined();
    });
});

describe('addition of a new blog', function () {
    test('succeeds with valid data', async () => {
        const newBlog = {
            title: 'If Cats Disappeared From The World',
            author: 'Genki Kawamura',
            url: 'https://www.goodreads.com/book/show/40740914-if-cats-disappeared-from-the-world',
            likes: 10,
        };

        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(200)
            .expect('Content-Type', /application\/json/)

        const response = await api.get('/api/blogs')

        expect(response.body).toHaveLength(initialBlogs.length + 1)
        expect(response.body).toContainEqual(expect.objectContaining(newBlog))
    })


    test('returns 0 for blog created without the property: likes', async () => {
        const newBlog = {
            title: 'If Cats Disappeared From The World',
            author: 'Genki Kawamura',
            url: 'https://www.goodreads.com/book/show/40740914-if-cats-disappeared-from-the-world'
        };

        const response = await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        expect(response.body.likes).toBe(0)
    })

    test('fails with statuscode 404 if title does not exist', async () => {
        const blogNoTitle = {
            author: 'Genki Kawamura',
            url: 'https://www.goodreads.com/book/show/40740914-if-cats-disappeared-from-the-world',
            likes: 10
        }
    
        await api
            .post('/api/blogs')
            .send(blogNoTitle)
            .expect(400)
    })
    
    test('fails with statuscode 404 if URL does not exist', async () => {
        const blogNoURL = {
            title: 'If Cats Disappeared From The World',
            author: 'Genki Kawamura',
            likes: 10
        }
    
        await api
            .post('/api/blogs')
            .send(blogNoURL)
            .expect(400)
    })
})


describe('deletion of a blog', function () {
    test('succeeds with status code 204 if ID is valid', async () => {
        const blogsAtStart = await helper.blogsInDb()
        const blogToDelete = blogsAtStart[0]

        await api
            .delete(`/api/blogs/${blogToDelete.id}`)
            .expect(204);

        const blogsAtEnd = await helper.blogsInDb();
        expect(blogsAtStart).toHaveLength(blogsAtEnd.length + 1)
    });
});

describe('updating a blog', function () {
    test('update likes of blog post', async () => {
        const newBlog = {
            title: 'If Cats Disappeared From The World',
            author: 'Genki Kawamura',
            url: 'https://www.goodreads.com/book/show/40740914-if-cats-disappeared-from-the-world',
            likes: 10,
        };
  
      await api
        .post('/api/blogs')
        .send(newBlog);
  
      const blogsAtStart = await helper.blogsInDb();
      const blogToUpdate = blogsAtStart[blogsAtStart.length - 1].id;
  
      const newLikes = {
        likes: 200,
      };

      const updatedBlog = await api
        .put(`/api/blogs/${blogToUpdate}`)
        .send(newLikes)
        .set('Accept', 'application/json')
        .expect(200);
  
      expect(updatedBlog.body).toHaveProperty('likes', 200);
    });
});

    afterAll(() => {
        mongoose.connection.close()
    });