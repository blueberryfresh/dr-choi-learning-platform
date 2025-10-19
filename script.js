// Application State
const APP_STATE = {
    isAuthenticated: false,
    currentSection: 'materials',
    posts: []
};

// Configuration
const CONFIG = {
    // You can change this password as needed
    accessPassword: 'DrChoi2024!',
    
    // Sample posts for demonstration
    samplePosts: [
        {
            id: 1,
            author: 'Sarah Johnson',
            content: 'Hi everyone! I found the reading for Chapter 3 really interesting. Has anyone started working on Assignment 1 yet? I\'d love to discuss some of the key concepts.',
            timestamp: new Date('2024-10-18T10:30:00'),
        },
        {
            id: 2,
            author: 'Mike Chen',
            content: 'Dr. Choi, thank you for the excellent lecture yesterday. The examples really helped clarify the complex theories. Looking forward to the next class!',
            timestamp: new Date('2024-10-17T15:45:00'),
        },
        {
            id: 3,
            author: 'Emily Rodriguez',
            content: 'Study group forming for the midterm exam! We\'re planning to meet this Saturday at 2 PM in the library. Message me if you\'re interested in joining.',
            timestamp: new Date('2024-10-16T09:20:00'),
        }
    ]
};

// DOM Elements
const loginContainer = document.getElementById('login-container');
const mainApp = document.getElementById('main-app');
const loginForm = document.getElementById('login-form');
const passwordInput = document.getElementById('password');
const errorMessage = document.getElementById('error-message');
const navButtons = document.querySelectorAll('.nav-btn');
const contentSections = document.querySelectorAll('.content-section');
const postForm = document.getElementById('post-form');
const postsContainer = document.getElementById('posts-container');

// Initialize Application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    // Check if user is already authenticated (using sessionStorage)
    const isAuthenticated = sessionStorage.getItem('authenticated') === 'true';
    
    if (isAuthenticated) {
        showMainApp();
    } else {
        showLogin();
    }
    
    // Load sample posts
    APP_STATE.posts = [...CONFIG.samplePosts];
    
    // Setup event listeners
    setupEventListeners();
    
    // Render initial content
    renderPosts();
}

function setupEventListeners() {
    // Login form
    loginForm.addEventListener('submit', handleLogin);
    
    // Navigation buttons
    navButtons.forEach(button => {
        if (button.classList.contains('logout-btn')) {
            button.addEventListener('click', handleLogout);
        } else {
            button.addEventListener('click', handleNavigation);
        }
    });
    
    // Post form
    postForm.addEventListener('submit', handleNewPost);
    
    // Material items (for future functionality)
    document.addEventListener('click', function(e) {
        if (e.target.closest('.material-item')) {
            handleMaterialClick(e.target.closest('.material-item'));
        }
    });
}

// Authentication Functions
function handleLogin(e) {
    e.preventDefault();
    
    const enteredPassword = passwordInput.value.trim();
    
    if (enteredPassword === CONFIG.accessPassword) {
        // Successful login
        APP_STATE.isAuthenticated = true;
        sessionStorage.setItem('authenticated', 'true');
        showMainApp();
        clearError();
    } else {
        // Failed login
        showError('Incorrect password. Please contact Dr. Stephen Choi for access.');
        passwordInput.value = '';
        passwordInput.focus();
    }
}

function handleLogout() {
    APP_STATE.isAuthenticated = false;
    sessionStorage.removeItem('authenticated');
    showLogin();
    passwordInput.value = '';
}

function showLogin() {
    loginContainer.classList.remove('hidden');
    mainApp.classList.add('hidden');
    passwordInput.focus();
}

function showMainApp() {
    loginContainer.classList.add('hidden');
    mainApp.classList.remove('hidden');
    showSection('materials');
}

function showError(message) {
    errorMessage.textContent = message;
    errorMessage.style.display = 'block';
}

function clearError() {
    errorMessage.textContent = '';
    errorMessage.style.display = 'none';
}

// Navigation Functions
function handleNavigation(e) {
    const targetSection = e.target.closest('.nav-btn').dataset.section;
    showSection(targetSection);
}

function showSection(sectionName) {
    // Update navigation buttons
    navButtons.forEach(btn => {
        if (btn.dataset.section === sectionName) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
    
    // Update content sections
    contentSections.forEach(section => {
        if (section.id === `${sectionName}-section`) {
            section.classList.add('active');
        } else {
            section.classList.remove('active');
        }
    });
    
    APP_STATE.currentSection = sectionName;
}

// Bulletin Board Functions
function handleNewPost(e) {
    e.preventDefault();
    
    const studentName = document.getElementById('student-name').value.trim();
    const postContent = document.getElementById('post-content').value.trim();
    
    if (!studentName || !postContent) {
        alert('Please fill in both your name and message.');
        return;
    }
    
    // Create new post
    const newPost = {
        id: Date.now(), // Simple ID generation
        author: studentName,
        content: postContent,
        timestamp: new Date()
    };
    
    // Add to posts array (at the beginning for newest first)
    APP_STATE.posts.unshift(newPost);
    
    // Clear form
    document.getElementById('student-name').value = '';
    document.getElementById('post-content').value = '';
    
    // Re-render posts
    renderPosts();
    
    // Show success message
    showPostSuccess();
}

function renderPosts() {
    postsContainer.innerHTML = '';
    
    if (APP_STATE.posts.length === 0) {
        postsContainer.innerHTML = `
            <div class="no-posts">
                <p>No messages yet. Be the first to post!</p>
            </div>
        `;
        return;
    }
    
    APP_STATE.posts.forEach(post => {
        const postElement = createPostElement(post);
        postsContainer.appendChild(postElement);
    });
}

function createPostElement(post) {
    const postDiv = document.createElement('div');
    postDiv.className = 'post';
    
    const formattedDate = formatDate(post.timestamp);
    
    postDiv.innerHTML = `
        <div class="post-header">
            <span class="post-author">${escapeHtml(post.author)}</span>
            <span class="post-date">${formattedDate}</span>
        </div>
        <div class="post-content">${escapeHtml(post.content)}</div>
    `;
    
    return postDiv;
}

function formatDate(date) {
    const now = new Date();
    const diffInHours = (now - date) / (1000 * 60 * 60);
    
    if (diffInHours < 1) {
        return 'Just now';
    } else if (diffInHours < 24) {
        return `${Math.floor(diffInHours)} hour${Math.floor(diffInHours) !== 1 ? 's' : ''} ago`;
    } else {
        return date.toLocaleDateString() + ' at ' + date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
    }
}

function showPostSuccess() {
    // Create temporary success message
    const successDiv = document.createElement('div');
    successDiv.className = 'success-message';
    successDiv.innerHTML = `
        <i class="fas fa-check-circle"></i>
        Message posted successfully!
    `;
    successDiv.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #27ae60;
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        z-index: 1000;
        animation: slideInRight 0.3s ease-out;
    `;
    
    document.body.appendChild(successDiv);
    
    // Remove after 3 seconds
    setTimeout(() => {
        successDiv.remove();
    }, 3000);
}

// Material Functions
function handleMaterialClick(materialItem) {
    const materialInfo = materialItem.querySelector('.material-info h4').textContent;
    
    // For now, just show an alert. In a real implementation, 
    // this would open the actual file or navigate to the content
    alert(`Opening: ${materialInfo}\n\nIn a full implementation, this would open the actual course material.`);
}

// Utility Functions
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Add CSS for success message animation
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            opacity: 0;
            transform: translateX(100px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
    
    .no-posts {
        text-align: center;
        padding: 3rem;
        color: #666;
        font-style: italic;
    }
`;
document.head.appendChild(style);
