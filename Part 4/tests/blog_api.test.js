const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')

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


describe('GET /blogs', function () {
    test('blogs are returned as json', async () => {
        await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/);
    });

    test('correct amount of blogs', async () => {
        const blogs = await api.get('/api/blogs');
        expect(blogs.body.length).toBe(2);
    });

    test('verify unique identifier property of blog by id', async () => {
        const blogs = await api.get('/api/blogs');
        expect(blogs.body[0].id).toBeDefined();
    });
});

describe('POST /blogs', function () {
    test('create a new blog', async () => {
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


    test('blog without property likes, will have 0', async () => {
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
    })

    test('400 request code if title is missing', async () => {
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
    
      test('400 request code if url is missing', async () => {
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

    afterAll(() => {
        mongoose.connection.close()
    });