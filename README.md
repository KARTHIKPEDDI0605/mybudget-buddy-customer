# MyBudget Buddy - Customer Portal

A React-based customer portal for the MyBudget Buddy application, allowing users to manage their budgets, view financial insights, and connect with service providers.

## Tech Stack

- **Frontend Framework**: React 19
- **UI Components**: Material UI 7
- **Routing**: React Router 7
- **Testing**: Jest and React Testing Library
- **Styling**: CSS and Emotion
- **Icons**: Material Icons and React Icons

## Project Structure

```
mybudget-buddy-customer/
├── public/                 # Static files
├── src/                    # Source code
│   ├── assets/             # Images, fonts, etc.
│   ├── components/         # Reusable components
│   │   ├── EventCarousel/  # Event carousel component
│   │   ├── EventTypeGrid/  # Event type grid component
│   │   ├── Footer/         # Footer component
│   │   └── NavBar/         # Navigation bar component
│   ├── pages/              # Application pages
│   │   ├── AboutUs/        # About us page
│   │   ├── Chat/           # Chat page
│   │   ├── ContactUs/      # Contact us page
│   │   ├── Home/           # Home page
│   │   ├── Profile/        # User profile page
│   │   └── ServiceProviders/ # Service providers page
│   ├── App.js              # Main application component
│   ├── App.css             # Application styles
│   ├── index.js            # Entry point
│   └── index.css           # Global styles
├── .env.example            # Example environment variables
├── .env.local              # Local environment variables (not committed)
├── .env.development        # Development environment variables
├── .env.production         # Production environment variables
├── .gitignore              # Git ignore file
├── package.json            # Project dependencies and scripts
└── README.md               # Project documentation
```

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm (v9 or higher)

### Cloning the Repository

```bash
# Clone the repository
git clone https://github.com/your-organization/mybudget-buddy-customer.git

# Navigate to the project directory
cd mybudget-buddy-customer

# Install dependencies
npm install
```

### Environment Setup

1. Copy the example environment file to create your local environment file:

```bash
cp .env.example .env.local
```

2. Edit the `.env.local` file to set your local development variables.

### Running the Application

```bash
# Start the development server
npm start
```

The application will be available at [http://localhost:3000](http://localhost:3000).

## Environment Configuration

The application supports multiple environments:

- **Local**: `.env.local` - For local development (not committed to git)
- **Development**: `.env.development` - For the development environment
- **Production**: `.env.production` - For the production environment

To run the application with a specific environment:

```bash
# Development environment
npm start

# Production build
npm run build
```

## Development Workflow

### Branching Strategy

We follow the GitFlow branching model:

- `main` - Production-ready code
- `develop` - Latest development changes
- `feature/*` - New features
- `bugfix/*` - Bug fixes
- `release/*` - Release preparation
- `hotfix/*` - Urgent fixes for production

### Commit Guidelines

We follow the Conventional Commits specification:

```
<type>(<scope>): <description>

[optional body]

[optional footer(s)]
```

Types:
- `feature`: A new feature
- `fix`: A bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code changes that neither fix bugs nor add features
- `test`: Adding or modifying tests
- `chore`: Changes to the build process or auxiliary tools

Example:
```
feat(profile): add user avatar upload functionality
```

### Pull Request Process

1. Create a feature branch from `develop`
2. Make your changes and commit them following the commit guidelines
3. Push your branch and create a pull request to `develop`
4. Ensure all tests pass and the code meets the project's standards
5. Request a review from at least one team member
6. Once approved, merge your pull request

## Available Scripts

- `npm start` - Runs the app in development mode
- `npm test` - Runs the test suite
- `npm run build` - Builds the app for production
- `npm run eject` - Ejects from Create React App (avoid if possible)

## Deployment

The application is automatically deployed through our CI/CD pipeline:

- Commits to `develop` are deployed to the development environment
- Commits to `main` are deployed to the production environment

## Learn More

For more information about the technologies used in this project:

- [React Documentation](https://react.dev/)
- [Material UI Documentation](https://mui.com/material-ui/getting-started/)
- [React Router Documentation](https://reactrouter.com/)
