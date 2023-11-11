const blogs = [];
let lastSeen ;

function createPost(title) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            blogs.push({ title: title });
            resolve();
        }, 1000);
    });
}

function updateLastUserActivityTime() {
    return new Promise((resolve) => {
        setTimeout(() => {
            lastSeen = new Date();
            resolve();
        }, 1000);
    });
}

function deleteBlog() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (blogs.length > 0) {
                const deletedBlog = blogs.pop();
                resolve(deletedBlog);
            } else {
                reject("ERROR: ARRAY IS EMPTY");
            }
        }, 1000);
    });
}

// Create a post and update last activity time
Promise.all([createPost("Post 1"), updateLastUserActivityTime()])
    .then(() => {
        return Promise.all([createPost("Post 2"), updateLastUserActivityTime()]);
    })
    .then(() => {
        console.log('------------')
        console.log('All Posts:-')
        blogs.forEach((blog) => console.log(blog.title))

        console.log("Last seen:-", lastSeen);
        console.log('------------')
        return deleteBlog();
    })
    .then((deletedPost) => {
        console.log('            ')
        console.log('            ')
        console.log('------------')
        console.log('Deleted Post:-')
        console.log( deletedPost.title);
        console.log('------------')
        console.log('            ')
        console.log('------------')

        console.log("Remaining posts:-");
                blogs.forEach((blog) => console.log(blog.title))
        console.log('------------')
    })
    .catch((error) => {
        console.log(error);
    });

 //# sourceURL=snippet:///Promises%20All