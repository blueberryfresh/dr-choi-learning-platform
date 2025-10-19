// Application State
const APP_STATE = {
    isAuthenticated: false,
    currentSection: 'materials',
    posts: [],
    currentFilter: 'all'
};

// Configuration
const CONFIG = {
    // You can change this password as needed
    accessPassword: 'DrChoi2024!',
    
    // AI Course sample posts for demonstration
    samplePosts: [
        {
            id: 1,
            author: 'Sarah Johnson',
            title: 'Question about Gradient Descent',
            content: 'Hi everyone! I\'m working through the gradient descent algorithm from this week\'s lecture. Can someone explain why we use the learning rate? What happens if it\'s too high or too low?',
            category: 'machine-learning',
            timestamp: new Date('2024-10-18T10:30:00'),
        },
        {
            id: 2,
            author: 'Mike Chen',
            title: 'Neural Network Assignment Help',
            content: 'I\'m stuck on Assignment 2 - building the feedforward neural network. My loss isn\'t decreasing after epoch 10. Has anyone encountered this issue? Any debugging tips?',
            category: 'assignments',
            timestamp: new Date('2024-10-17T15:45:00'),
        },
        {
            id: 3,
            author: 'Emily Rodriguez',
            title: 'AI Ethics Discussion',
            content: 'After today\'s lecture on AI ethics, I\'ve been thinking about bias in machine learning models. How do we ensure our models are fair when the training data itself might be biased?',
            category: 'general',
            timestamp: new Date('2024-10-16T09:20:00'),
        },
        {
            id: 4,
            author: 'David Kim',
            title: 'CNN Architecture Question',
            content: 'Working on my final project using CNNs for image classification. Should I use ResNet or start with a simpler architecture like LeNet? My dataset has about 10,000 images.',
            category: 'projects',
            timestamp: new Date('2024-10-15T14:15:00'),
        },
        {
            id: 5,
            author: 'Lisa Wang',
            title: 'Backpropagation Explanation',
            content: 'Can someone help me understand backpropagation intuitively? I get the math, but I\'m struggling to visualize what\'s actually happening when we update the weights.',
            category: 'neural-networks',
            timestamp: new Date('2024-10-14T11:30:00'),
        },
        {
            id: 6,
            author: 'Alex Thompson',
            title: 'Study Group - Deep Learning',
            content: 'Forming a study group for the upcoming deep learning module. We\'ll meet Wednesdays at 6 PM in the CS building. Focus on practical implementations and theory review.',
            category: 'general',
            timestamp: new Date('2024-10-13T16:45:00'),
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
const categoryButtons = document.querySelectorAll('.category-btn');
const postsCount = document.getElementById('posts-count');

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
    
    // Category filter buttons
    categoryButtons.forEach(button => {
        button.addEventListener('click', handleCategoryFilter);
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
function handleCategoryFilter(e) {
    const category = e.target.closest('.category-btn').dataset.category;
    
    // Update active category button
    categoryButtons.forEach(btn => {
        btn.classList.remove('active');
    });
    e.target.closest('.category-btn').classList.add('active');
    
    // Update current filter
    APP_STATE.currentFilter = category;
    
    // Re-render posts with filter
    renderPosts();
}

function handleNewPost(e) {
    e.preventDefault();
    
    const studentName = document.getElementById('student-name').value.trim();
    const postTitle = document.getElementById('post-title').value.trim();
    const postContent = document.getElementById('post-content').value.trim();
    const postCategory = document.getElementById('post-category').value;
    
    if (!studentName || !postContent || !postCategory) {
        alert('Please fill in your name, message, and select a category.');
        return;
    }
    
    // Create new post
    const newPost = {
        id: Date.now(), // Simple ID generation
        author: studentName,
        title: postTitle || null,
        content: postContent,
        category: postCategory,
        timestamp: new Date()
    };
    
    // Add to posts array (at the beginning for newest first)
    APP_STATE.posts.unshift(newPost);
    
    // Clear form
    document.getElementById('student-name').value = '';
    document.getElementById('post-title').value = '';
    document.getElementById('post-content').value = '';
    document.getElementById('post-category').value = '';
    
    // Re-render posts
    renderPosts();
    
    // Show success message
    showPostSuccess();
}

function renderPosts() {
    postsContainer.innerHTML = '';
    
    // Filter posts based on current filter
    let filteredPosts = APP_STATE.posts;
    if (APP_STATE.currentFilter !== 'all') {
        filteredPosts = APP_STATE.posts.filter(post => post.category === APP_STATE.currentFilter);
    }
    
    // Update posts count
    updatePostsCount(filteredPosts.length, APP_STATE.posts.length);
    
    if (filteredPosts.length === 0) {
        const emptyMessage = APP_STATE.currentFilter === 'all' 
            ? 'No messages yet. Be the first to post!'
            : `No posts in this category yet. Be the first to share something about ${getCategoryDisplayName(APP_STATE.currentFilter)}!`;
            
        postsContainer.innerHTML = `
            <div class="no-posts-category">
                <i class="fas fa-comments"></i>
                <p>${emptyMessage}</p>
            </div>
        `;
        return;
    }
    
    filteredPosts.forEach(post => {
        const postElement = createPostElement(post);
        postsContainer.appendChild(postElement);
    });
}

function updatePostsCount(filtered, total) {
    if (postsCount) {
        const filterText = APP_STATE.currentFilter === 'all' ? 'all posts' : getCategoryDisplayName(APP_STATE.currentFilter);
        postsCount.textContent = `Showing ${filtered} of ${total} posts in ${filterText}`;
    }
}

function getCategoryDisplayName(category) {
    const categoryNames = {
        'machine-learning': 'Machine Learning',
        'neural-networks': 'Neural Networks',
        'assignments': 'Assignments',
        'projects': 'Projects',
        'general': 'General Q&A'
    };
    return categoryNames[category] || category;
}

function createPostElement(post) {
    const postDiv = document.createElement('div');
    postDiv.className = `post ${post.category || ''}`;
    
    const formattedDate = formatDate(post.timestamp);
    const categoryDisplay = getCategoryDisplayName(post.category || 'general');
    
    const titleHtml = post.title ? `<div class="post-title">${escapeHtml(post.title)}</div>` : '';
    
    postDiv.innerHTML = `
        <div class="post-category ${post.category || 'general'}">${categoryDisplay}</div>
        ${titleHtml}
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
