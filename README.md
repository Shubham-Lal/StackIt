# StackIt – A Minimal Q&A Forum Platform

**StackIt** is a clean, community-focused question-and-answer platform that promotes collaborative learning and structured knowledge sharing. Inspired by platforms like StackOverflow, StackIt focuses on simplicity, usability, and essential Q&A features.

---

##  Overview

StackIt enables users to:
- Ask and answer questions
- Vote on answers
- Tag posts for better searchability
- Get notified on interactions
- Experience a minimal, distraction-free interface

Mockup: [StackIt UI Wireframes](https://link.excalidraw.com/l/65VNwvy7c4X/8bM86GXnnUN)  
Notification UI Mockup: [Notification System](https://link.excalidraw.com/l/65VNwvy7c4X/9mhEahV0MQg)

---

##  User Roles

| Role   | Permissions                                                                  |
|--------|------------------------------------------------------------------------------|
| Guest  | View all questions and answers                                               |
| User   | Register, log in, post questions/answers, upvote/downvote answers            |
| Admin  | Moderate content, manage users, send announcements, download reports         |

---

##  Core Features

###  1. Ask a Question
Users can submit a new question with:
- **Title** – Short, descriptive
- **Description** – Written using a rich text editor
- **Tags** – Multi-select input (e.g., React, JWT)

###  2. Rich Text Editor for Descriptions
Supports:
- Bold, Italic, Strikethrough
- Numbered lists, Bullet points
- Emoji insertion
- Hyperlink insertion (URLs)
- Image upload
- Text alignment: Left, Center, Right

###  3. Answering Questions
- Any user can post answers
- Uses the same rich text editor for formatting
- Only logged-in users can post answers

###  4. Voting & Accepting Answers
- Users can upvote/downvote answers
- Question owners can mark one answer as **accepted**

###  5. Tagging System
- Questions require relevant tags
- Helps filter and categorize questions effectively

###  6. Notification System
- Notification bell icon in top nav bar
- Users notified when:
  - Someone answers their question
  - Someone comments on their answer
  - Someone mentions them using `@username`
- Unread count visible
- Dropdown with recent notifications

---

## Admin Capabilities

Admins can:
- Reject spam or inappropriate content
- Ban users violating community guidelines
- Monitor question and answer activity
- Broadcast platform-wide messages
- Download user activity reports and feedback logs

---

## Tech Stack

- **Frontend**: React.js, Tailwind CSS, Vite
- **Backend**: Node.js, Express.js, MongoDB
- **State Management**: Zustand
- **Routing**: React Router

---

## 🛠 Getting Started

### Prerequisites
- Node.js v18 (recommended)
- npm