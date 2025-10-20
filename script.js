// Application State
const APP_STATE = {
    isAuthenticated: false,
    currentSection: 'materials',
    posts: [],
    currentFilter: 'all',
    currentView: 'student' // 'student' or 'instructor'
};

// Configuration
const CONFIG = {
    // Main platform password
    accessPassword: 'DrChoi2024!',
    // Instructor password for bulletin board access
    instructorPassword: 'DrChoiInstructor2025!',
    
    // Student bulletin board messages for demonstration
    samplePosts: [
        {
            id: 1,
            author: 'Sarah Johnson',
            schoolYear: '2024-2025',
            semester: 'Fall',
            courseName: 'CS 175 - Artificial Intelligence',
            title: 'Thank you for the great lecture!',
            content: 'Dr. Choi, that lecture on neural networks today was incredibly insightful! I finally understand the concept of deep learning. Thank you for making complex topics so accessible.',
            timestamp: new Date('2024-10-18T10:30:00'),
        },
        {
            id: 2,
            author: 'Mike Chen',
            schoolYear: '2024-2025',
            semester: 'Fall',
            courseName: 'CS 175 - Artificial Intelligence',
            title: 'Question about Assignment 2',
            content: 'Hi Dr. Choi, I\'m working on Assignment 2 and having trouble with the backpropagation implementation. Could you provide some guidance during office hours?',
            timestamp: new Date('2024-10-17T15:45:00'),
        },
        {
            id: 3,
            author: 'Emily Rodriguez',
            schoolYear: '2024-2025',
            semester: 'Fall',
            courseName: 'CS 175 - Artificial Intelligence',
            title: '',
            content: 'Really enjoying the class so far! The practical examples make the theoretical concepts much clearer. Looking forward to the next module.',
            timestamp: new Date('2024-10-16T09:20:00'),
        },
        {
            id: 4,
            author: 'David Kim',
            schoolYear: '2023-2024',
            semester: 'Spring',
            courseName: 'CS 180 - Machine Learning',
            title: 'Course Feedback',
            content: 'Dr. Choi, I wanted to thank you for an excellent semester in Machine Learning. The course has inspired me to pursue graduate studies in AI.',
            timestamp: new Date('2024-05-15T14:15:00'),
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
// Category buttons removed
const postsCount = document.getElementById('posts-count');
const viewButtons = document.querySelectorAll('.view-btn');

// Initialize Application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    // Check if user is already authenticated (using sessionStorage)
    const isAuthenticated = sessionStorage.getItem('authenticated') === 'true';
    const userType = sessionStorage.getItem('user-type') || 'student';
    
    if (isAuthenticated) {
        // Restore user type and view
        APP_STATE.currentView = userType;
        showMainApp();
        
        // Update view button to match restored state
        viewButtons.forEach(btn => {
            btn.classList.remove('active');
            if (btn.dataset.view === userType) {
                btn.classList.add('active');
            }
        });
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
    
    // View toggle buttons
    viewButtons.forEach(button => {
        button.addEventListener('click', handleViewToggle);
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
    
    if (enteredPassword === CONFIG.instructorPassword) {
        // Instructor login - set instructor view for bulletin
        APP_STATE.isAuthenticated = true;
        APP_STATE.currentView = 'instructor';
        sessionStorage.setItem('authenticated', 'true');
        sessionStorage.setItem('user-type', 'instructor');
        showMainApp();
        clearError();
        
        // Update view button to show instructor view is active
        viewButtons.forEach(btn => {
            btn.classList.remove('active');
            if (btn.dataset.view === 'instructor') {
                btn.classList.add('active');
            }
        });
        
        renderPosts();
    } else if (enteredPassword === CONFIG.accessPassword) {
        // Regular login - set student view for bulletin
        APP_STATE.isAuthenticated = true;
        APP_STATE.currentView = 'student';
        sessionStorage.setItem('authenticated', 'true');
        sessionStorage.setItem('user-type', 'student');
        showMainApp();
        clearError();
        
        // Update view button to show student view is active
        viewButtons.forEach(btn => {
            btn.classList.remove('active');
            if (btn.dataset.view === 'student') {
                btn.classList.add('active');
            }
        });
        
        renderPosts();
    } else {
        // Failed login
        showError('Incorrect password. Please contact Dr. Stephen Choi for access.');
        passwordInput.value = '';
        passwordInput.focus();
    }
}

function handleLogout() {
    APP_STATE.isAuthenticated = false;
    APP_STATE.currentView = 'student'; // Reset to default
    sessionStorage.removeItem('authenticated');
    sessionStorage.removeItem('user-type');
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
function handleViewToggle(e) {
    const targetView = e.target.closest('.view-btn').dataset.view;
    
    // Update active view button
    viewButtons.forEach(btn => {
        btn.classList.remove('active');
    });
    e.target.closest('.view-btn').classList.add('active');
    
    // Update current view
    APP_STATE.currentView = targetView;
    
    // Re-render posts with new view
    renderPosts();
}

function handleNewPost(e) {
    e.preventDefault();
    
    const studentName = document.getElementById('student-name').value.trim();
    const schoolYear = document.getElementById('school-year').value;
    const semester = document.getElementById('semester').value;
    const courseName = document.getElementById('course-name').value.trim();
    const postTitle = document.getElementById('post-title').value.trim();
    const postContent = document.getElementById('post-content').value.trim();
    
    if (!studentName || !schoolYear || !semester || !courseName || !postContent) {
        alert('Please fill in all required fields: name, school year, semester, course name, and message.');
        return;
    }
    
    // Create new post
    const newPost = {
        id: Date.now(), // Simple ID generation
        author: studentName,
        schoolYear: schoolYear,
        semester: semester,
        courseName: courseName,
        title: postTitle || null,
        content: postContent,
        timestamp: new Date()
    };
    
    // Add to posts array (at the beginning for newest first)
    APP_STATE.posts.unshift(newPost);
    
    // Clear form
    document.getElementById('student-name').value = '';
    document.getElementById('school-year').value = '';
    document.getElementById('semester').value = '';
    document.getElementById('course-name').value = '';
    document.getElementById('post-title').value = '';
    document.getElementById('post-content').value = '';
    
    // Re-render posts
    renderPosts();
    
    // Show success message
    showPostSuccess();
}

function renderPosts() {
    postsContainer.innerHTML = '';
    
    // Update posts count
    updatePostsCount(APP_STATE.posts.length, APP_STATE.posts.length);
    
    if (APP_STATE.posts.length === 0) {
        postsContainer.innerHTML = `
            <div class="no-posts-category">
                <i class="fas fa-comments"></i>
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

function updatePostsCount(filtered, total) {
    if (postsCount) {
        postsCount.textContent = `${total} message${total !== 1 ? 's' : ''} posted`;
    }
}

// Category display function removed - no longer needed

function createPostElement(post) {
    const postDiv = document.createElement('div');
    postDiv.className = `post ${APP_STATE.currentView}-view`;
    
    const formattedDate = formatDate(post.timestamp);
    
    if (APP_STATE.currentView === 'instructor') {
        // Instructor view: Show all details
        const titleHtml = post.title ? `<div class="post-title">${escapeHtml(post.title)}</div>` : '';
        const courseInfo = post.schoolYear && post.semester && post.courseName 
            ? `${post.schoolYear} ${post.semester} - ${post.courseName}`
            : 'Course info not available';
        
        postDiv.innerHTML = `
            ${titleHtml}
            <div class="post-header">
                <div class="post-author-info">
                    <span class="post-author">${escapeHtml(post.author)}</span>
                    <span class="post-course-info">${escapeHtml(courseInfo)}</span>
                </div>
                <span class="post-date">${formattedDate}</span>
            </div>
            <div class="post-content">${escapeHtml(post.content)}</div>
        `;
    } else {
        // Student view: Show only message content
        postDiv.innerHTML = `
            <div class="post-content-only">${escapeHtml(post.content)}</div>
            <div class="post-date-simple">${formattedDate}</div>
        `;
    }
    
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
