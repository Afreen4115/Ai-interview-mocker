# 🎤 AI Interview Mocker

An intelligent, AI-powered mock interview platform that helps job seekers practice and improve their interview skills. Built with Next.js, Google Gemini AI, and modern web technologies to provide realistic interview experiences with real-time feedback.

## ✨ Features

### AI-Powered Interview Generation
- **🤖 Gemini AI Integration**: Uses Google Gemini 1.5 Flash to generate contextual interview questions
- **📝 Customizable Interviews**: Create interviews based on job position, description, and experience level
- **🎯 Role-Specific Questions**: AI generates questions tailored to your specific job role
- **📊 Multiple Questions**: Configurable number of interview questions per session

### Interview Experience
- **📹 Video Recording**: Record your answers using webcam
- **🎙️ Speech-to-Text**: Real-time speech recognition for hands-free answering
- **📝 Text Input**: Type your answers if preferred
- **⏭️ Navigation**: Navigate between questions with Previous/Next buttons
- **💾 Answer Storage**: All answers are saved for review

### Feedback & Analytics
- **⭐ AI-Generated Ratings**: Each answer receives a rating (0-10 scale)
- **💬 Detailed Feedback**: AI provides constructive feedback for each answer
- **📊 Overall Performance**: Average rating across all questions
- **✅ Correct Answers**: View model answers for comparison
- **📈 Performance Tracking**: Track your improvement over time

### User Management
- **🔐 Clerk Authentication**: Secure user authentication and authorization
- **👤 User Profiles**: Personal dashboard for each user
- **📚 Interview History**: View all your past mock interviews
- **🔒 Protected Routes**: Secure access to dashboard and interviews

### Database & Storage
- **🗄️ PostgreSQL Database**: Neon serverless PostgreSQL for data storage
- **📦 Drizzle ORM**: Type-safe database queries and migrations
- **💾 Persistent Storage**: All interviews and answers are saved
- **🔍 Query Optimization**: Efficient database queries

## 🛠️ Technologies Used

### Core Framework
- **Next.js 15**: React framework with App Router
- **React 18**: UI library
- **TypeScript**: Type-safe JavaScript

### AI & Machine Learning
- **Google Gemini AI**: Large language model for question generation and feedback
- **@google/generative-ai**: Official Gemini AI SDK

### Authentication
- **Clerk**: Complete authentication solution
- **@clerk/nextjs**: Next.js integration for Clerk

### Database
- **Neon PostgreSQL**: Serverless PostgreSQL database
- **Drizzle ORM**: TypeScript ORM for database operations
- **@neondatabase/serverless**: Neon database client

### Media & Recording
- **React Webcam**: Webcam access and video recording
- **React Hook Speech-to-Text**: Speech recognition for voice answers

### UI Components
- **Radix UI**: Accessible component primitives
- **Tailwind CSS**: Utility-first CSS framework
- **Lucide React**: Icon library
- **Sonner**: Toast notifications

### Development Tools
- **ESLint**: Code linting
- **Prettier**: Code formatting
- **Drizzle Kit**: Database migrations and studio

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

1. **Node.js** (v18.x or higher)
   - Download from [nodejs.org](https://nodejs.org/)
   - Verify: `node --version`

2. **npm** (comes with Node.js) or **yarn**
   - Verify: `npm --version`

3. **Accounts Required**:
   - **Google Cloud Account**: For Gemini API key
   - **Clerk Account**: For authentication
   - **Neon Account**: For PostgreSQL database

## 🚀 Installation

### Step 1: Clone the Repository

```bash
git clone https://github.com/Afreen4115/Ai-interview-mocker.git
cd Ai-interview-mocker
```

### Step 2: Install Dependencies

```bash
npm install
```

### Step 3: Set Up Environment Variables

Create a `.env.local` file in the root directory:

```env
# Google Gemini API
NEXT_PUBLIC_GEMINI_API_KEY=your_gemini_api_key_here

# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key

# Database (Neon PostgreSQL)
NEXT_PUBLIC_DRIGGLE_DB_URL=your_neon_database_url

# Interview Configuration
NEXT_PUBLIC_INTERVIEW_QUESTIONS_COUNT=10
```

### Step 4: Set Up Google Gemini API

1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Create a new API key
3. Copy the API key to `.env.local`

### Step 5: Set Up Clerk Authentication

1. Go to [clerk.com](https://clerk.com/)
2. Create a new application
3. Copy the publishable key and secret key to `.env.local`
4. Configure allowed redirect URLs in Clerk dashboard

### Step 6: Set Up Neon Database

1. Go to [neon.tech](https://neon.tech/)
2. Create a new project
3. Copy the connection string to `.env.local`
4. Run database migrations:

```bash
npm run db:push
```

### Step 7: Start Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:3000`

## 📖 Usage Guide

### Creating a Mock Interview

1. **Sign In/Sign Up**:
   - Navigate to the application
   - Sign up or sign in using Clerk authentication

2. **Access Dashboard**:
   - After authentication, you'll be redirected to the dashboard
   - Click "Add New" to create a new interview

3. **Fill Interview Details**:
   - **Job Position**: Enter the job role (e.g., "Full Stack Developer")
   - **Job Description**: Enter tech stack or job requirements
   - **Years of Experience**: Enter your experience level
   - Click "Start Interview"

4. **AI Generation**:
   - The AI will generate interview questions based on your inputs
   - Wait for the questions to be generated (usually 10-30 seconds)

### Taking the Interview

1. **View Questions**:
   - Questions appear on the left side
   - Navigate using Previous/Next buttons

2. **Record Your Answer**:
   - **Video Recording**: Click to start webcam recording
   - **Speech-to-Text**: Click microphone to use voice input
   - **Text Input**: Type your answer directly
   - Click "Submit Answer" when done

3. **Navigate Questions**:
   - Use "Previous Question" to go back
   - Use "Next Question" to proceed
   - On the last question, click "End Interview"

### Viewing Feedback

1. **After Interview**:
   - You'll be redirected to the feedback page
   - View your overall rating

2. **Question Feedback**:
   - Click on each question to expand feedback
   - View:
     - Your rating (0-10)
     - Your answer
     - Correct/model answer
     - AI-generated feedback

3. **Review Performance**:
   - Check average rating across all questions
   - Review feedback for improvement areas

## 📁 Project Structure

```
Ai-interview-mocker/
├── app/
│   ├── (auth)/
│   │   ├── sign-in/                # Sign in page
│   │   └── sign-up/                # Sign up page
│   ├── dashboard/
│   │   ├── _components/
│   │   │   ├── AddNewInterview.tsx  # Create interview dialog
│   │   │   └── InterviewList.tsx   # List of past interviews
│   │   ├── interview/
│   │   │   └── [interviewId]/
│   │   │       ├── start/
│   │   │       │   ├── _components/
│   │   │       │   │   ├── QuestionsSection.tsx
│   │   │       │   │   └── RecordAnswerSection.tsx
│   │   │       │   └── page.tsx    # Interview page
│   │   │       └── feedback/
│   │   │           └── page.tsx    # Feedback page
│   │   ├── about/                   # About page
│   │   ├── how/                     # How it works page
│   │   ├── layout.tsx              # Dashboard layout
│   │   └── page.tsx                # Dashboard home
│   ├── layout.tsx                   # Root layout
│   └── page.tsx                     # Landing page
├── components/
│   └── ui/                          # Reusable UI components
│       ├── button.tsx
│       ├── dialog.tsx
│       ├── input.tsx
│       └── ...
├── utils/
│   ├── db.ts                        # Database connection
│   ├── Gemini.ts                    # Gemini AI client
│   └── schema.ts                    # Database schema
├── middleware.ts                     # Auth middleware
├── drizzle.config.ts                # Drizzle configuration
├── package.json
└── README.md
```

## 🏗️ Architecture

### Database Schema

#### MockInterview Table
```typescript
{
  id: number;
  mockId: string;              // Unique interview ID
  jsonMocResp: string;         // JSON string of questions/answers
  jobPosition: string;
  jobDesc: string;
  jobExperience: string;
  createdBy: string;           // User email
  createdAt: string;
}
```

#### UserAnswer Table
```typescript
{
  id: number;
  mockIdRef: string;           // Reference to interview
  question: string;
  correctAns: string;          // Model answer
  userAns: string;             // User's answer
  feedback: string;            // AI feedback
  rating: string;              // Rating (0-10)
  userEmail: string;
  createdAt: string;
}
```

### AI Integration Flow

1. **Question Generation**:
   - User provides job details
   - Prompt sent to Gemini AI
   - AI generates questions and answers
   - JSON response parsed and stored

2. **Feedback Generation**:
   - User submits answer
   - Answer sent to Gemini AI with question
   - AI generates rating and feedback
   - Feedback stored in database

### Authentication Flow

1. **Clerk Middleware**:
   - Protects dashboard routes
   - Redirects unauthenticated users
   - Provides user context

2. **User Context**:
   - User email used for data association
   - User profile accessible via `useUser()` hook

## 🔧 Configuration

### Changing Number of Questions

Edit `.env.local`:
```env
NEXT_PUBLIC_INTERVIEW_QUESTIONS_COUNT=15
```

### Database Migrations

```bash
# Push schema changes to database
npm run db:push

# Open Drizzle Studio (database GUI)
npm run db:studio
```

### Customizing AI Prompts

Edit `app/dashboard/_components/AddNewInterview.tsx`:
```typescript
const InputPrompt = `Job Position: ${jobPosition}, 
Job Description: ${jobDesc}, 
Years of Experience: ${jobExperience}. 
Please give ${process.env.NEXT_PUBLIC_INTERVIEW_QUESTIONS_COUNT} 
interview questions and answers in JSON format...`;
```

### Modifying Gemini Model

Edit `utils/Gemini.ts`:
```typescript
const model = genAI.getGenerativeModel({
  model: "gemini-1.5-pro", // Change model here
});
```

## 🧪 Testing

### Manual Testing

1. **Authentication**:
   - Test sign up flow
   - Test sign in flow
   - Verify protected routes

2. **Interview Creation**:
   - Create interview with different job roles
   - Verify AI question generation
   - Check database storage

3. **Interview Taking**:
   - Test video recording
   - Test speech-to-text
   - Test text input
   - Verify answer submission

4. **Feedback**:
   - Verify feedback generation
   - Check ratings calculation
   - Test feedback display

### Database Testing

```bash
# Test database connection
node testConnection.js
```

## 🐛 Troubleshooting

### Common Issues

#### 1. Gemini API Error
**Error**: `API key not found` or `Invalid API key`

**Solutions**:
- Verify `NEXT_PUBLIC_GEMINI_API_KEY` is set in `.env.local`
- Check API key is valid in Google AI Studio
- Ensure API key has proper permissions
- Restart development server after adding env variables

#### 2. Clerk Authentication Error
**Error**: `Clerk publishable key not found`

**Solutions**:
- Verify Clerk keys are in `.env.local`
- Check keys are correct in Clerk dashboard
- Ensure redirect URLs are configured
- Clear browser cache and cookies

#### 3. Database Connection Error
**Error**: `Database connection failed`

**Solutions**:
- Verify `NEXT_PUBLIC_DRIGGLE_DB_URL` is correct
- Check Neon database is active
- Run `npm run db:push` to sync schema
- Test connection with `testConnection.js`

#### 4. Webcam Not Working
**Error**: `Cannot access webcam`

**Solutions**:
- Grant browser permissions for camera
- Check camera is not used by another app
- Try different browser
- Use HTTPS in production (required for webcam)

#### 5. Speech-to-Text Not Working
**Error**: `Microphone access denied`

**Solutions**:
- Grant browser microphone permissions
- Check microphone is connected
- Use HTTPS (required for microphone)
- Try different browser

#### 6. Questions Not Generating
**Error**: `Failed to generate questions`

**Solutions**:
- Check Gemini API quota/limits
- Verify internet connection
- Check browser console for errors
- Ensure prompt format is correct

#### 7. Feedback Not Appearing
**Error**: `Feedback not showing`

**Solutions**:
- Check database for stored answers
- Verify AI feedback generation
- Check browser console for errors
- Ensure interview ID is correct

## 🔒 Security Considerations

### Current Security Features
- Clerk authentication for user management
- Protected routes with middleware
- Environment variables for sensitive data
- Type-safe database queries


## 🚧 Future Enhancements

Potential improvements for the project:

- [ ] Video playback of recorded answers
- [ ] Multiple interview modes (technical, behavioral, etc.)
- [ ] Interview scheduling and reminders
- [ ] Performance analytics dashboard
- [ ] Export interview reports (PDF)
- [ ] Share interview results
- [ ] Practice mode vs. assessment mode
- [ ] Custom question sets
- [ ] Interview templates by industry
- [ ] Real-time AI coaching during interview
- [ ] Voice tone analysis
- [ ] Body language analysis (if video enabled)
- [ ] Comparison with previous interviews
- [ ] Interview tips and resources
- [ ] Community features (share experiences)
- [ ] Mobile app version
- [ ] Offline mode support
- [ ] Multi-language support
- [ ] Rate limiting for API calls
- [ ] Input validation and sanitization
- [ ] Content Security Policy (CSP)
- [ ] HTTPS in production
- [ ] API key rotation
- [ ] Database connection pooling
- [ ] Error logging and monitoring
- [ ] User data encryption

## 📱 Browser Support

- ✅ Chrome (latest) - Full support
- ✅ Firefox (latest) - Full support
- ✅ Safari (latest) - Full support
- ✅ Edge (latest) - Full support
- ⚠️ Internet Explorer - Not supported

**Note**: Webcam and microphone access require HTTPS in production

## 📝 Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run db:push      # Push database schema changes
npm run db:studio    # Open Drizzle Studio (database GUI)
```

## 📝 Environment Variables

Required environment variables:

```env
# Google Gemini API
NEXT_PUBLIC_GEMINI_API_KEY=your_key_here

# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_key_here
CLERK_SECRET_KEY=your_secret_here

# Database
NEXT_PUBLIC_DRIGGLE_DB_URL=your_database_url_here

# Configuration
NEXT_PUBLIC_INTERVIEW_QUESTIONS_COUNT=10
```



## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) for the amazing framework
- [Google Gemini AI](https://ai.google.dev/) for AI capabilities
- [Clerk](https://clerk.com/) for authentication
- [Neon](https://neon.tech/) for serverless PostgreSQL
- [Drizzle ORM](https://orm.drizzle.team/) for database management
- Contributors and users of this project



## 🔗 Useful Links

- [Next.js Documentation](https://nextjs.org/docs)
- [Google Gemini AI Docs](https://ai.google.dev/docs)
- [Clerk Documentation](https://clerk.com/docs)
- [Neon Documentation](https://neon.tech/docs)
- [Drizzle ORM Docs](https://orm.drizzle.team/docs/overview)
- [React Webcam Docs](https://github.com/mozmorris/react-webcam)

## 🎯 Key Features Explained

### AI Question Generation
- Uses Google Gemini 1.5 Flash model
- Generates contextual questions based on job details
- Returns structured JSON format
- Configurable number of questions

### Answer Recording
- Multiple input methods (video, voice, text)
- Real-time speech-to-text conversion
- Webcam video recording
- Answer persistence in database

### AI Feedback System
- Analyzes user answers against model answers
- Provides ratings (0-10 scale)
- Generates constructive feedback
- Calculates overall performance

### Authentication & Security
- Clerk-based authentication
- Protected dashboard routes
- User-specific data isolation
- Secure API key management

---

**Practice Makes Perfect! 🎤✨**

