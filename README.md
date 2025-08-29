# Product Listing Application

A modern, full-stack React application with a Node.js backend for browsing and searching products with filtering, sorting, and comprehensive testing.

## Features

### Frontend (React + TypeScript + SCSS)
- **Product Display**: Responsive grid layout with product cards
- **Real-time Search**: Search by product name or description (case-insensitive)
- **Price Sorting**: Toggle between ascending and descending price order
- **Statistics Footer**: Real-time product count and average price
- **Responsive Design**: Mobile-first design with breakpoint optimization
- **Component Architecture**: Modular, reusable components with individual SCSS files
- **TypeScript**: Full type safety and enhanced developer experience
- **Comprehensive Testing**: Unit tests for all components and E2E tests with Cypress

### Backend (Node.js + Express)
- **RESTful API**: Product retrieval and statistics endpoints
- **File-based Storage**: JSON file storage for development
- **Advanced Search**: Text search with filtering capabilities
- **Statistics API**: Product analytics and reporting
- **Security**: Helmet.js, CORS, input validation
- **Error Handling**: Comprehensive error handling middleware
- **Unit Testing**: Complete test coverage with Jest and isolated test mode

## Architecture

### Frontend Architecture
```
src/
├── components/          # Reusable React components
│   ├── Header/
│   │   ├── Header.tsx   # Application header
│   │   ├── Header.scss  # Header styles
│   │   └── Header.test.tsx # Header tests
│   ├── SearchBar/
│   │   ├── SearchBar.tsx # Search input component
│   │   ├── SearchBar.scss # Search bar styles
│   │   └── SearchBar.test.tsx # Search bar tests
│   ├── SortButton/
│   │   ├── SortButton.tsx # Price sorting button
│   │   ├── SortButton.scss # Sort button styles
│   │   └── SortButton.test.tsx # Sort button tests
│   ├── ProductCard/
│   │   ├── ProductCard.tsx      # Individual product display
│   │   ├── ProductCard.scss     # Product card styles
│   │   └── ProductCard.test.tsx # Product card tests
│   └── Footer/
│       ├── Footer.tsx   # Statistics footer
│       ├── Footer.scss  # Footer styles
│       └── Footer.test.tsx # Footer tests
├── services/            # API service layer
│   ├── productService.ts # Product API integration
│   └── productService.test.ts # Service layer tests
├── types/               # TypeScript type definitions
│   └── index.ts         # Application interfaces and types
├── App.tsx              # Main application component
├── App.scss             # Main styles (imports all components)
├── App.test.tsx         # App component tests
└── index.tsx            # Application entry point
```

### Backend Architecture
```
backend/
├── src/
│   ├── config/
│   │   └── database.js      # Database configuration
│   ├── controllers/
│   │   └── productController.js  # Product operations
│   ├── middleware/
│   │   └── error.js         # Error handling middleware
│   ├── models/
│   │   └── Product.js       # Product data model
│   ├── routes/
│   │   └── products.js      # Product routes
│   ├── utils/
│   │   └── storage.js       # File-based storage utility with test mode
│   ├── scripts/
│   │   └── seed.js          # Database seeding script
│   └── server.js            # Main server file
├── data/                    # File-based storage
│   └── products.json        # Product data file (12 products)
├── src/tests/               # Test files
│   ├── controllers/
│   │   └── productController.test.js
│   ├── routes/
│   │   └── products.test.js
│   ├── models/
│   │   └── Product.test.js
│   ├── middleware/
│   │   └── error.test.js
│   ├── utils/
│   │   ├── storage.test.js
│   │   ├── testData.js
│   │   ├── testStorage.js
│   │   └── mockStorage.js
│   └── utils/
│       └── testServer.js
├── config.env               # Environment variables
└── package.json             # Dependencies and scripts
```

## Technology Stack

### Frontend
- **React 18**: Modern React with hooks and functional components
- **TypeScript**: Type-safe development with interfaces and type definitions
- **SCSS**: Advanced CSS preprocessing with variables, mixins, and nested selectors
- **Font Awesome**: Icons for enhanced UI
- **Google Fonts**: Inter font family for typography
- **React Testing Library**: Unit testing for components
- **Cypress**: End-to-end testing framework with API mocking

### Backend
- **Node.js**: Runtime environment
- **Express.js**: Web framework
- **File-based Storage**: JSON file storage for development with test isolation
- **Helmet**: Security middleware
- **CORS**: Cross-origin resource sharing
- **Morgan**: HTTP request logger
- **Dotenv**: Environment configuration
- **Jest**: Testing framework with isolated test mode

## API Endpoints

### Products
| Method | Endpoint | Description | Access |
|--------|----------|-------------|---------|
| GET | `/api/v1/products` | Get all products with filtering | Public |
| GET | `/api/v1/products/:id` | Get single product | Public |
| GET | `/api/v1/products/stats` | Get product statistics | Public |
| GET | `/health` | Health check endpoint | Public |

### Query Parameters
- `search`: Text search in name and description
- `sort`: Sort by field (e.g., `price:asc`, `price:desc`)

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### 1. Clone the Repository
```bash
git clone <repository-url>
cd product-listing-app
```

### 2. Quick Start (Recommended)
Start both frontend and backend with a single command:

```bash
# Option 1: Using the shell script (recommended)
./start-dev.sh

# Option 2: Using npm script
npm run dev

# Option 3: Using npm script with concurrently
npm run dev:concurrent
```

This will:
- Install dependencies for both frontend and backend
- Check for port availability
- Start both servers concurrently
- Frontend: [http://localhost:3000](http://localhost:3000)
- Backend: [http://localhost:5001](http://localhost:5001)

### 3. Manual Setup (Alternative)
If you prefer to start servers separately:

#### Frontend Setup
```bash
# Install dependencies
npm install

# Start development server
npm start
```

The frontend will be available at [http://localhost:3000](http://localhost:3000)

#### Backend Setup
```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Seed the database with sample data (optional)
node src/scripts/seed.js

# Start development server
npm run dev
```

The backend API will be available at [http://localhost:5001](http://localhost:5001)

## Available Scripts

### Development (Root Directory)
- `npm run dev` - Start both frontend and backend with shell script
- `npm run dev:concurrent` - Start both servers using concurrently
- `./start-dev.sh` - Shell script to start both servers (recommended)

### Frontend
- `npm start` - Start development server (port 3000)
- `npm test` - Run unit test suite
- `npm run cypress:run` - Run E2E tests in headless mode
- `npm run cypress:open` - Open Cypress test runner
- `npm run cypress:run:headed` - Run E2E tests with browser visible
- `npm run build` - Build for production

### Backend
- `npm start` - Start production server
- `npm run dev` - Start development server with nodemon
- `npm test` - Run test suite with isolated test mode
- `npm run test:watch` - Run tests in watch mode
- `npm run test:coverage` - Run tests with coverage report

## Testing

### Frontend Unit Tests
```bash
# Run all unit tests
npm test

# Run specific test file
npm test -- --testPathPattern=productService.test.ts

# Run tests in watch mode
npm test -- --watch
```

**Test Coverage:**
- Product loading and display
- Search functionality (name and description)
- Case-insensitive search
- Price sorting (ascending/descending)
- Statistics calculation
- Error handling
- Loading states
- Service layer with mocked API calls

### Frontend E2E Tests (Cypress)
```bash
# Run all E2E tests in headless mode
npm run cypress:run

# Run E2E tests with browser visible
npm run cypress:run:headed

# Open Cypress test runner for interactive testing
npm run cypress:open
```

**E2E Test Coverage:**
- Complete user workflows (search, sort, clear)
- API integration testing with mocked responses
- Visual consistency and responsive design
- Cross-browser compatibility
- Performance and accessibility validation
- Error handling scenarios

**Test Files:**
- `cypress/e2e/api-integration.cy.ts` - Backend API testing
- `cypress/e2e/product-listing.cy.ts` - Frontend functionality testing
- `cypress/e2e/visual-regression.cy.ts` - UI consistency testing

### Backend Tests
```bash
cd backend

# Run all backend tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

**Backend Test Coverage:**
- API endpoints and routing
- Data validation and error handling
- Business logic and data processing
- File-based storage operations with test isolation
- Middleware functionality
- Controller operations

**Test Isolation Features:**
- **Test Mode**: Tests use in-memory storage instead of writing to production files
- **Isolated Data**: Each test runs with clean, predictable data
- **No File I/O**: Tests are faster and more reliable
- **Production Data Protection**: `products.json` file is never modified during testing

### Test Data

**Frontend Cypress Fixtures:**
- `cypress/fixtures/products.json` - Mocked API responses for E2E tests (12 products)

**Backend Test Data:**
- `backend/src/tests/utils/testData.js` - Test products for backend tests (2 products)
- `backend/data/products.json` - Production data (12 products, never modified by tests)

## Database Seeding

To populate the backend with sample data:

```bash
cd backend
node src/scripts/seed.js
```

This will create 12 sample products in `backend/data/products.json`.

## Features in Detail

### Search Functionality
- Real-time filtering as you type
- Searches both product names and descriptions
- Case-insensitive matching
- Updates results instantly
- Shows "no results" message when appropriate

### Sorting System
- Toggle button for price sorting
- Visual indicators for sort direction
- Maintains sort order during search
- Smooth transitions between states

### Responsive Design
- **Mobile (< 480px)**: Single column layout
- **Tablet (480px - 768px)**: Two column grid
- **Desktop (> 768px)**: Multi-column grid
- Adaptive controls and spacing

### Test Isolation
- **Frontend**: Mocked API calls prevent external dependencies
- **Backend**: Test mode prevents file system modifications
- **E2E**: Fixture-based mocking ensures consistent test data
- **Fast Execution**: All tests run in under 10 seconds

## Development Workflow

1. **Start Backend**: `cd backend && npm run dev`
2. **Start Frontend**: `npm start` (in root directory)
3. **Run Tests**: Use appropriate test commands for your needs
4. **Seed Data**: Run `node backend/src/scripts/seed.js` if needed

## Troubleshooting

### Common Issues

**Port Conflicts:**
- Frontend: Change port in `package.json` scripts if 3000 is occupied
- Backend: Change port in `config.env` if 5001 is occupied

**Test Failures:**
- Ensure both frontend and backend are running for E2E tests
- Check that test data is properly seeded
- Verify API endpoints are accessible

**Data Issues:**
- Run `node backend/src/scripts/seed.js` to restore sample data
- Check `backend/data/products.json` for data integrity
- Backend tests use isolated test mode and won't affect production data
