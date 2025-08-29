#!/bin/bash

# Product Listing App - Development Startup Script
# This script starts both the frontend and backend servers

echo "Starting Product Listing App Development Environment..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "ERROR: Node.js is not installed. Please install Node.js first."
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "ERROR: npm is not installed. Please install npm first."
    exit 1
fi

# Function to check if a port is in use
check_port() {
    local port=$1
    if lsof -Pi :$port -sTCP:LISTEN -t >/dev/null ; then
        echo "WARNING: Port $port is already in use. Please stop the service using port $port first."
        return 1
    fi
    return 0
}

# Function to cleanup processes on exit
cleanup() {
    echo ""
    echo "Shutting down servers..."
    if [ ! -z "$BACKEND_PID" ]; then
        kill $BACKEND_PID 2>/dev/null
    fi
    if [ ! -z "$FRONTEND_PID" ]; then
        kill $FRONTEND_PID 2>/dev/null
    fi
    exit 0
}

# Set up signal handlers
trap cleanup SIGINT SIGTERM

# Check if ports are available
echo "Checking port availability..."
if ! check_port 3000; then
    exit 1
fi

if ! check_port 5001; then
    exit 1
fi

# Install dependencies if node_modules doesn't exist
echo "Installing frontend dependencies..."
if [ ! -d "node_modules" ]; then
    npm install
fi

echo "Installing backend dependencies..."
if [ ! -d "backend/node_modules" ]; then
    cd backend && npm install && cd ..
fi

# Check if concurrently is installed locally, if not install it
if ! npm list concurrently &> /dev/null; then
    echo "Installing concurrently locally..."
    npm install --save-dev concurrently
fi

echo "Dependencies installed successfully!"

# Start backend first and wait for it to be ready
echo "Starting backend server..."
echo "Backend API will be available at: http://localhost:5001"
echo ""

# Start backend in background
cd backend && npm run dev &
BACKEND_PID=$!

# Function to check if backend is ready
check_backend_ready() {
    local max_attempts=30
    local attempt=1
    
    echo "Waiting for backend to be ready..."
    while [ $attempt -le $max_attempts ]; do
        if curl -s http://localhost:5001/health > /dev/null 2>&1; then
            echo "Backend is ready!"
            return 0
        fi
        
        echo "Attempt $attempt/$max_attempts: Backend not ready yet, waiting..."
        sleep 2
        attempt=$((attempt + 1))
    done
    
    echo "ERROR: Backend failed to start within 60 seconds"
    kill $BACKEND_PID 2>/dev/null
    exit 1
}

# Wait for backend to be ready
check_backend_ready

# Start frontend
echo ""
echo "Starting frontend server..."
echo "Frontend will be available at: http://localhost:3000"
echo ""
echo "Press Ctrl+C to stop both servers"
echo ""

# Start frontend
npm start &
FRONTEND_PID=$!

# Wait for both processes
wait $BACKEND_PID $FRONTEND_PID
