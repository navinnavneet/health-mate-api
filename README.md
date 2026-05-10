# Health Mate API

Simple backend for signup/login using Express, MongoDB, and JWT.

## Setup

1. Copy `.env.example` to `.env`
2. Update `MONGODB_URI` and `JWT_SECRET`
3. Install dependencies:
   ```bash
   cd ../health-mate-api
   npm install
   ```
4. Start development server:
   ```bash
   npm run dev
   ```

## API Endpoints

- `POST /api/auth/register`
  - body: `{ name, email, password }`
- `POST /api/auth/login`
  - body: `{ email, password }`

## Notes

- Passwords are hashed with `bcryptjs`
- JWT token is returned on successful auth
- Add protected routes in `src/routes` using JWT middleware later
