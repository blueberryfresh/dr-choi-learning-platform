# 🔐 Password Change Instructions for Dr. Stephen Choi

## Overview
Your learning platform has multiple password levels for different access types. This guide shows you exactly how to change each password.

## 📍 Current Password Structure

### Main Platform (`/index.html`)
- **Regular Access**: `DrChoiAI2025!`
- **Instructor Access**: `DrChoiInstructor2025!` (gives instructor view in bulletin)

### Direct Bulletin Board (`/bulletin.html`)
- **Student Access**: `FresnoStateAI@2019`
- **Instructor Access**: `DrChoiInstructor2025!` (gives instructor view)

---

## 🔧 How to Change Passwords

### 1. Main Platform Passwords

**File to Edit**: `script.js`

**Location**: Lines 13-15 (approximately)

```javascript
// Configuration
const CONFIG = {
    // Main platform password
    accessPassword: 'DrChoiAI2025!',
    // Instructor password for bulletin board access
    instructorPassword: 'DrChoiInstructor2025!',
```

**To Change**:
- **Regular Password**: Replace `'DrChoiAI2025!'` with your new password
- **Instructor Password**: Replace `'DrChoiInstructor2025!'` with your new instructor password

### 2. Direct Bulletin Board Passwords

**File to Edit**: `bulletin-script.js`

**Location**: Lines 10-13 (approximately)

```javascript
// Configuration for Bulletin Board
const BULLETIN_CONFIG = {
    // Student bulletin board password
    studentPassword: 'FresnoStateAI@2019',
    // Instructor password for full access
    instructorPassword: 'DrChoiInstructor2025!',
```

**To Change**:
- **Student Password**: Replace `'FresnoStateAI@2019'` with your new student password
- **Instructor Password**: Replace `'DrChoiInstructor2025!'` with your new instructor password

---

## 📝 Step-by-Step Change Process

### Step 1: Edit the Files
1. Open your code editor or GitHub
2. Navigate to the file you want to edit (`script.js` or `bulletin-script.js`)
3. Find the password lines (use Ctrl+F to search for "Password")
4. Replace the password text between the quotes
5. Keep the quotes and semicolon!

### Step 2: Save and Deploy
1. Save the file
2. Commit changes to GitHub:
   ```bash
   git add .
   git commit -m "Updated passwords"
   git push origin main
   ```
3. Changes will be live in a few minutes

---

## ⚠️ Important Notes

### Password Format Rules
- Always keep passwords in **single quotes**: `'YourPassword!'`
- Don't remove the quotes, commas, or semicolons
- Passwords are case-sensitive

### Recommended Password Structure
- Use a mix of letters, numbers, and symbols
- Make it memorable but secure
- Consider using a pattern like: `DrChoi[Topic][Year]!`

### Examples of Good Passwords
- `DrChoiAI2025!`
- `DrChoiML2025!`
- `DrChoiCS2025!`
- `FresnoStateAI@2025`

---

## 🎯 Quick Reference

### If You Want to Change...

**Main Platform Access**:
- Edit: `script.js` → line with `accessPassword`

**Instructor Bulletin Access**:
- Edit: `script.js` → line with `instructorPassword`
- Edit: `bulletin-script.js` → line with `instructorPassword`
- (Change both to keep them synchronized)

**Student Bulletin Access**:
- Edit: `bulletin-script.js` → line with `studentPassword`

---

## 🔍 Finding the Right Lines

### In `script.js`:
Search for: `accessPassword` or `instructorPassword`

### In `bulletin-script.js`:
Search for: `studentPassword` or `instructorPassword`

---

## 🚨 Troubleshooting

### If Login Stops Working:
1. Check that you didn't accidentally delete quotes or punctuation
2. Make sure passwords don't contain single quotes (use double quotes inside if needed)
3. Verify the file saved properly
4. Check that changes were pushed to GitHub

### Common Mistakes:
- ❌ `accessPassword: DrChoiAI2025!` (missing quotes)
- ❌ `accessPassword: 'DrChoiAI2025!'` (missing comma/semicolon)
- ✅ `accessPassword: 'DrChoiAI2025!',` (correct format)

---

## 📞 Need Help?

If you run into issues:
1. Double-check the format matches the examples exactly
2. Make sure you saved and pushed changes to GitHub
3. Try refreshing the website after a few minutes
4. Contact your developer if login completely breaks

---

**Last Updated**: October 19, 2025
**Platform Version**: Current
**Files Involved**: `script.js`, `bulletin-script.js`
