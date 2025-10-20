// Application State for Bulletin Board
const BULLETIN_STATE = {
    isAuthenticated: false,
    posts: [],
    currentView: 'student' // 'student' or 'instructor'
};

// Configuration for Bulletin Board
const BULLETIN_CONFIG = {
    // Student bulletin board password
    studentPassword: 'FresnoStateAI@2019',
    // Instructor password for full access
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
const bulletinLoginContainer = document.getElementById('bulletin-login-container');
const bulletinApp = document.getElementById('bulletin-app');
const bulletinLoginForm = document.getElementById('bulletin-login-form');
const bulletinPasswordInput = document.getElementById('bulletin-password');
const bulletinErrorMessage = document.getElementById('bulletin-error-message');
const bulletinPostForm = document.getElementById('bulletin-post-form');
const bulletinPostsContainer = document.getElementById('bulletin-posts-container');
const bulletinPostsCount = document.getElementById('bulletin-posts-count');
const bulletinLogoutBtn = document.getElementById('bulletin-logout-btn');
const bulletinViewButtons = document.querySelectorAll('.view-btn');

// Initialize Application
document.addEventListener('DOMContentLoaded', function() {
    initializeBulletinApp();
});

function initializeBulletinApp() {
    // Check if user is already authenticated (using sessionStorage)
    const isAuthenticated = sessionStorage.getItem('bulletin-authenticated') === 'true';
    const userType = sessionStorage.getItem('bulletin-user-type') || 'student';
    
    if (isAuthenticated) {
        // Restore user type and view
        BULLETIN_STATE.currentView = userType;
        showBulletinApp();
        
        // Update view button to match restored state
        bulletinViewButtons.forEach(btn => {
            btn.classList.remove('active');
            if (btn.dataset.view === userType) {
                btn.classList.add('active');
            }
        });
    } else {
        showBulletinLogin();
    }
    
    // Load sample posts
    BULLETIN_STATE.posts = [...BULLETIN_CONFIG.samplePosts];
    
    // Setup event listeners
    setupBulletinEventListeners();
    
    // Render initial content
    renderBulletinPosts();
}

function setupBulletinEventListeners() {
    // Login form
    bulletinLoginForm.addEventListener('submit', handleBulletinLogin);
    
    // Logout button
    bulletinLogoutBtn.addEventListener('click', handleBulletinLogout);
    
    // View toggle buttons
    bulletinViewButtons.forEach(button => {
        button.addEventListener('click', handleBulletinViewToggle);
    });
    
    // Post form
    bulletinPostForm.addEventListener('submit', handleBulletinNewPost);
}

// Authentication Functions
function handleBulletinLogin(e) {
    e.preventDefault();
    
    const enteredPassword = bulletinPasswordInput.value.trim();
    
    if (enteredPassword === BULLETIN_CONFIG.instructorPassword) {
        // Instructor login - set instructor view
        BULLETIN_STATE.isAuthenticated = true;
        BULLETIN_STATE.currentView = 'instructor';
        sessionStorage.setItem('bulletin-authenticated', 'true');
        sessionStorage.setItem('bulletin-user-type', 'instructor');
        showBulletinApp();
        clearBulletinError();
        
        // Update view button to show instructor view is active
        bulletinViewButtons.forEach(btn => {
            btn.classList.remove('active');
            if (btn.dataset.view === 'instructor') {
                btn.classList.add('active');
            }
        });
        
        renderBulletinPosts();
    } else if (enteredPassword === BULLETIN_CONFIG.studentPassword) {
        // Student login - set student view
        BULLETIN_STATE.isAuthenticated = true;
        BULLETIN_STATE.currentView = 'student';
        sessionStorage.setItem('bulletin-authenticated', 'true');
        sessionStorage.setItem('bulletin-user-type', 'student');
        showBulletinApp();
        clearBulletinError();
        
        // Update view button to show student view is active
        bulletinViewButtons.forEach(btn => {
            btn.classList.remove('active');
            if (btn.dataset.view === 'student') {
                btn.classList.add('active');
            }
        });
        
        renderBulletinPosts();
    } else {
        // Failed login
        showBulletinError('Incorrect password. Please contact Dr. Stephen Choi for access.');
        bulletinPasswordInput.value = '';
        bulletinPasswordInput.focus();
    }
}

function handleBulletinLogout() {
    BULLETIN_STATE.isAuthenticated = false;
    BULLETIN_STATE.currentView = 'student'; // Reset to default
    sessionStorage.removeItem('bulletin-authenticated');
    sessionStorage.removeItem('bulletin-user-type');
    showBulletinLogin();
    bulletinPasswordInput.value = '';
}

function showBulletinLogin() {
    bulletinLoginContainer.classList.remove('hidden');
    bulletinApp.classList.add('hidden');
    bulletinPasswordInput.focus();
}

function showBulletinApp() {
    bulletinLoginContainer.classList.add('hidden');
    bulletinApp.classList.remove('hidden');
}

function showBulletinError(message) {
    bulletinErrorMessage.textContent = message;
    bulletinErrorMessage.style.display = 'block';
}

function clearBulletinError() {
    bulletinErrorMessage.textContent = '';
    bulletinErrorMessage.style.display = 'none';
}

// Bulletin Board Functions
function handleBulletinViewToggle(e) {
    const targetView = e.target.closest('.view-btn').dataset.view;
    
    // Update active view button
    bulletinViewButtons.forEach(btn => {
        btn.classList.remove('active');
    });
    e.target.closest('.view-btn').classList.add('active');
    
    // Update current view
    BULLETIN_STATE.currentView = targetView;
    
    // Re-render posts with new view
    renderBulletinPosts();
}

function handleBulletinNewPost(e) {
    e.preventDefault();
    
    const studentName = document.getElementById('bulletin-student-name').value.trim();
    const schoolYear = document.getElementById('bulletin-school-year').value;
    const semester = document.getElementById('bulletin-semester').value;
    const courseName = document.getElementById('bulletin-course-name').value.trim();
    const postTitle = document.getElementById('bulletin-post-title').value.trim();
    const postContent = document.getElementById('bulletin-post-content').value.trim();
    
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
    BULLETIN_STATE.posts.unshift(newPost);
    
    // Clear form
    document.getElementById('bulletin-student-name').value = '';
    document.getElementById('bulletin-school-year').value = '';
    document.getElementById('bulletin-semester').value = '';
    document.getElementById('bulletin-course-name').value = '';
    document.getElementById('bulletin-post-title').value = '';
    document.getElementById('bulletin-post-content').value = '';
    
    // Re-render posts
    renderBulletinPosts();
    
    // Show success message
    showBulletinPostSuccess();
}

function renderBulletinPosts() {
    bulletinPostsContainer.innerHTML = '';
    
    // Update posts count
    updateBulletinPostsCount(BULLETIN_STATE.posts.length);
    
    if (BULLETIN_STATE.posts.length === 0) {
        bulletinPostsContainer.innerHTML = `
            <div class="no-posts-category">
                <i class="fas fa-comments"></i>
                <p>No messages yet. Be the first to post!</p>
            </div>
        `;
        return;
    }
    
    BULLETIN_STATE.posts.forEach(post => {
        const postElement = createBulletinPostElement(post);
        bulletinPostsContainer.appendChild(postElement);
    });
}

function updateBulletinPostsCount(total) {
    if (bulletinPostsCount) {
        bulletinPostsCount.textContent = `${total} message${total !== 1 ? 's' : ''} posted`;
    }
}

function createBulletinPostElement(post) {
    const postDiv = document.createElement('div');
    postDiv.className = `post ${BULLETIN_STATE.currentView}-view`;
    
    const formattedDate = formatBulletinDate(post.timestamp);
    
    if (BULLETIN_STATE.currentView === 'instructor') {
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

function formatBulletinDate(date) {
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

function showBulletinPostSuccess() {
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
`;
document.head.appendChild(style);
