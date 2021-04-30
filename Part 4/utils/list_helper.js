const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    return blogs.reduce((acc, cur) => acc + cur.likes, 0)
}

const favoriteBlog = (blogs) => {
    let maxBlog = blogs.reduce((max, blog) => max.likes > blog.likes ? max : blog)
    return maxBlog
}

module.exports = {
    dummy, totalLikes, favoriteBlog
}
