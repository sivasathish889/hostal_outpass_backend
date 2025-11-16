# Hostel Outpass Management System - Backend

A comprehensive backend system for managing hostel outpass requests, built with Node.js, Express, and MongoDB.

## 🏗️ Architecture

This system provides a complete outpass management solution with role-based access control for:
- **Students**: Request outpasses, view status, manage profiles
- **Wardens**: Approve/reject outpass requests, manage student data
- **Security**: Verify outpasses, track entry/exit
- **Admin**: System administration and oversight

## 🚀 Features

- **Authentication & Authorization**: JWT-based auth with role management
- **Real-time Notifications**: Firebase push notifications
- **Email Integration**: Automated email notifications via Nodemailer
- **Secure Password Management**: bcrypt encryption
- **Request Management**: Complete CRUD operations for outpass requests
- **Logging System**: Comprehensive request/response logging
- **Docker Support**: Containerized deployment

## 📋 Prerequisites

- Node.js (v18 or higher)
- MongoDB
- Firebase project (for push notifications)
- Email service credentials

## 🛠️ Installation

### Local Development

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd hostal_outpass_backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   ```bash
   cp .env.example .env
   ```
   
   Configure your `.env` file:
   ```env
   PORT=5000
   JWT_PRIVATE_KEY=your_jwt_secret_key
   MAIL_USER=your_email@gmail.com
   MAIL_PASS=your_email_password
   DB_URL=mongodb://localhost:27017/outpass_db
   GCP_CREDENTIALS={"type":"service_account",...}
   ```

4. **Firebase Setup**
   - Create a Firebase project
   - Generate service account key
   - Add credentials to `GCP_CREDENTIALS` in `.env`

5. **Start the server**
   ```bash
   # Development mode
   npm run dev
   
   # Production mode
   npm start
   ```

### Docker Deployment

1. **Build and run with Docker Compose**
   ```bash
   docker-compose up --build
   ```

2. **Or build manually**
   ```bash
   docker build -t outpass-backend .
   docker run -p 5000:5000 --env-file .env outpass-backend
   ```

## 📚 API Documentation

### Base URL
```
http://localhost:5000
```

### Authentication Endpoints

#### Student Routes
- `POST /student/register` - Student registration
- `POST /student/register/verify` - Verify registration OTP
- `POST /student/login` - Student login
- `POST /student/forgetPassword` - Password reset request
- `POST /student/forgetPassword/verify` - Verify password reset OTP
- `POST /student/changePassword` - Change password

#### Student Outpass Management
- `POST /student/newRequest` - Create new outpass request
- `GET /student/pendingRequests/:userId` - Get pending requests
- `PUT /student/passUpdate` - Update outpass request
- `POST /student/passDelete/:passId` - Delete outpass request
- `GET /student/AllRequests/:userId` - Get all requests history
- `GET /student/:userId` - Get student profile data

#### Warden Routes
- `POST /warden/*` - Warden authentication and management
- Outpass approval/rejection endpoints

#### Security Routes
- `POST /security/*` - Security guard authentication
- Outpass verification endpoints

#### Admin Routes
- `POST /api/admin/*` - Admin panel operations
- System management endpoints

## 🗂️ Project Structure

```
hostal_outpass_backend/
├── Controller/           # Business logic controllers
│   ├── adminController/  # Admin operations
│   ├── securityController/ # Security guard operations
│   ├── studentController/ # Student operations
│   ├── wardenController/ # Warden operations
│   └── verifyOTP.js     # OTP verification logic
├── middleware/          # Custom middleware
│   ├── bcrypt.js       # Password encryption
│   ├── isAuth.js       # Authentication middleware
│   ├── jsonWebToken.js # JWT utilities
│   ├── logger.js       # Request logging
│   ├── mailSender.js   # Email service
│   └── notificationSend.js # Push notifications
├── Model/              # Database models
│   ├── Schema/         # Mongoose schemas
│   └── DB.js          # Database connection
├── Routes/             # API route definitions
├── logs/              # Application logs
├── utils/             # Utility functions
├── .env.example       # Environment template
├── Dockerfile         # Docker configuration
├── Docker-compose.yaml # Docker Compose setup
└── server.js          # Application entry point
```

## 🔧 Configuration

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `PORT` | Server port (default: 5000) | No |
| `JWT_PRIVATE_KEY` | JWT signing secret | Yes |
| `MAIL_USER` | Email service username | Yes |
| `MAIL_PASS` | Email service password | Yes |
| `DB_URL` | MongoDB connection string | Yes |
| `GCP_CREDENTIALS` | Firebase service account JSON | Yes |

### Database Models

- **Student**: User profiles and authentication
- **Warden**: Warden accounts and permissions
- **Security**: Security guard accounts
- **Admin**: Administrator accounts
- **NewRequest**: Outpass request records

## 🔐 Security Features

- **JWT Authentication**: Secure token-based authentication
- **Password Encryption**: bcrypt hashing for passwords
- **Role-based Access**: Different permission levels
- **Input Validation**: Request data validation
- **CORS Configuration**: Cross-origin request handling
- **Request Logging**: Comprehensive audit trails

## 📱 Push Notifications

The system uses Firebase Cloud Messaging (FCM) for real-time notifications:
- Outpass status updates
- Approval/rejection notifications
- System alerts

## 📧 Email Integration

Automated email notifications for:
- Registration verification
- Password reset
- Outpass status changes
- Important system updates

## 🚀 Deployment

### Production Checklist

- [ ] Set strong JWT secret
- [ ] Configure production database
- [ ] Set up email service
- [ ] Configure Firebase project
- [ ] Set up reverse proxy (nginx)
- [ ] Enable HTTPS
- [ ] Configure monitoring
- [ ] Set up backup strategy

### Recommended Production Setup

```bash
# Using PM2 for process management
npm install -g pm2
pm2 start server.js --name "outpass-backend"
pm2 startup
pm2 save
```

## 🧪 Testing

```bash
# Run tests (when implemented)
npm test
```

## 📊 Monitoring

- Application logs are stored in `logs/log.txt`
- Monitor server health at `/health` endpoint (if implemented)
- Use PM2 monitoring for production deployments

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📄 License

This project is licensed under the ISC License.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Contact the development team
- Check the logs for debugging information

## 🔄 Version History

- **v1.0.0** - Initial release with core functionality

---

**Note**: Make sure to keep your environment variables secure and never commit sensitive information to version control.