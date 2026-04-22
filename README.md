# FinTrack — Master Your Wealth 🛡️💹

**FinTrack** is a premium, high-performance personal finance tracker built with a modern "Emerald Green" glassmorphism aesthetic. It empowers users to orchestrate their financial legacy with absolute clarity, security, and precision.

## ✨ Core Features

- **Intelligence Dashboard**: A unified command center for real-time monitoring of your financial health.
- **Dynamic Analytics**: Sophisticated charts powered by Recharts to visualize spending patterns and income growth.
- **Transaction Orchestration**: Effortlessly manage expenses and income with categorised tracking.
- **Neural Categories**: Customise and organize your financial data with a streamlined category system.
- **Premium Aesthetics**: Engineered with a cutting-edge glassmorphism design system using Tailwind CSS v4.
- **Secure by Design**: Built on the robust Laravel security framework.

## 🚀 Technology Stack

- **Backend**: [Laravel 13](https://laravel.com) (PHP 8.3+)
- **Frontend**: [React 19](https://reactjs.org) + [Inertia.js v3](https://inertiajs.com)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com) + [Lucide Icons](https://lucide.dev)
- **Database**: MySql

## 🛠️ Installation & Setup

Follow these steps to get your personal instance of FinTrack running locally.

### 1. Prerequisites
Ensure you have the following installed:
- PHP 8.3 or higher
- Composer
- Node.js & npm

### 2. Clone and Install
```bash
# Clone the repository
git clone https://github.com/your-username/FinanceTracker.git
cd FinanceTracker

# Install PHP dependencies
composer install

# Install JS dependencies
npm install
```

### 3. Environment Configuration
```bash
# Create your .env file
cp .env.example .env

# Generate application key
php artisan key:generate
```

### 4. Database Setup
The project uses SQLite by default for simplicity.
```bash
# Create the database file (if not automatically created)
touch database/database.sqlite

# Run migrations
php artisan migrate
```

### 5. Running the Application
Open two terminal windows:

**Terminal 1 (Backend):**
```bash
php artisan serve
```

**Terminal 2 (Frontend):**
```bash
npm run dev
```

Your application will be available at `http://localhost:8000`.
---

