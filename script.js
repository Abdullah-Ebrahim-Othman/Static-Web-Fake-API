// Function to fetch users using fetch API and Promises
function fetchUsers() {
    return fetch('https://jsonplaceholder.typicode.com/users')
        .then(function(response) {
            if (!response.ok) {
                throw new Error('Failed to fetch users');
            }
            return response.json();
        })
        .catch(function(error) {
            console.error('Error fetching users:', error);
            throw error;
        });
}

// Function to fetch posts for a specific user using async/await
async function fetchUserPosts(userId) {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts?userId=' + userId);
        if (!response.ok) {
            throw new Error('Failed to fetch user posts');
        }
        const posts = await response.json();
        return posts;
    } catch (error) {
        console.error('Error fetching user posts:', error);
        throw error;
    }
}

// Function to create user tabs and display usernames
function displayUserTabs(users) {
    var tabsContainer = document.getElementById('tabs');
    users.forEach(function(user, index) {
        var tab = document.createElement('button');
        tab.textContent = user.name;
        tab.addEventListener('click', function() {
            fetchUserPosts(user.id)
                .then(function(posts) {
                    displayUserPosts(posts);
                })
                .catch(function(error) {
                    console.error('Error fetching user posts:', error);
                });
        });

        // Initially display posts for the first user ID
        if (index === 0) {
            tab.click();
        }

        tabsContainer.appendChild(tab);
    });
}

// Function to display user posts' titles
function displayUserPosts(posts) {
    var postsContainer = document.getElementById('posts');
    postsContainer.innerHTML = '';
    posts.forEach(function(post) {
        var postDiv = document.createElement('div');
        postDiv.classList.add('post');

        var postTitle = document.createElement('p');
        postTitle.textContent = post.title;

        postDiv.appendChild(postTitle);
        postsContainer.appendChild(postDiv);
    });
}

// Fetch users and display tabs with usernames
fetchUsers()
    .then(function(users) {
        displayUserTabs(users);
    })
    .catch(function(error) {
        console.error('Error:', error);
    });
