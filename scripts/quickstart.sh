#!/bin/bash

# RateCoo Quick Start Script
# This script sets up the development environment

echo "🚀 RateCoo Quick Start"
echo "====================="

# Check prerequisites
if ! command -v pnpm &> /dev/null; then
    echo "❌ pnpm not found. Installing..."
    npm install -g pnpm
fi

if ! command -v turso &> /dev/null; then
    echo "❌ Turso CLI not found. Visit: https://docs.turso.tech/reference/turso-cli"
    exit 1
fi

echo "✅ Prerequisites OK"

# Install dependencies
echo ""
echo "📦 Installing dependencies..."
pnpm install

if [ $? -ne 0 ]; then
    echo "❌ Failed to install dependencies"
    exit 1
fi

echo "✅ Dependencies installed"

# Setup environment
echo ""
echo "🔧 Setting up environment..."

if [ ! -f .env.local ]; then
    cp .env.example .env.local
    echo "✅ Created .env.local (please update with your Turso credentials)"
else
    echo "ℹ️  .env.local already exists"
fi

echo ""
echo "📖 Next steps:"
echo "1. Update .env.local with Turso credentials:"
echo "   - Create database: turso db create ratecoo-local"
echo "   - Create token: turso db tokens create ratecoo-local"
echo "   - Copy TURSO_DATABASE_URL and TURSO_AUTH_TOKEN to .env.local"
echo ""
echo "2. Push schema to database:"
echo "   pnpm db:push"
echo ""
echo "3. Start development servers:"
echo "   pnpm dev"
echo ""
echo "4. Open your browser:"
echo "   - Landing: http://localhost:3000"
echo "   - Member: http://localhost:3001"
echo "   - Admin: http://localhost:3002"
echo "   - Widget: http://localhost:3003"
echo ""
echo "✨ Done! Ready to code."
