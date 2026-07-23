# BazaarX API

REST backend for the BazaarX e-commerce frontend. Built with **Node.js**, **Express**, and **MongoDB**.

## Quick start

```bash
cd backend
cp .env.example .env
npm install
npm run seed    # requires MongoDB running
npm run dev
```

API runs at `http://localhost:5000`.

## Environment variables

| Variable | Description |
|----------|-------------|
| `PORT` | Server port (default `5000`) |
| `MONGODB_URI` | MongoDB connection string |
| `JWT_SECRET` | Secret for signing auth tokens |
| `JWT_EXPIRES_IN` | Token expiry (default `7d`) |
| `CLIENT_URL` | Frontend URL for CORS (comma-separated for multiple) |

For production, use [MongoDB Atlas](https://www.mongodb.com/atlas) and set `CLIENT_URL` to your deployed frontend URL.

## API endpoints

### Health
- `GET /api/health`

### Auth
- `POST /api/auth/register` — `{ name, email, password }`
- `POST /api/auth/login` — `{ email, password }`
- `GET /api/auth/me` — requires `Authorization: Bearer <token>`
- `PUT /api/auth/profile` — update name / addresses

### Products (public)
- `GET /api/products` — search, filter, sort, paginate
  - Query: `q`, `category`, `minPrice`, `maxPrice`, `minRating`, `sort`, `page`, `limit`, `trending`, `featured`
  - Sort values: `featured`, `price-asc`, `price-desc`, `rating`, `name`
- `GET /api/products/categories`
- `GET /api/products/trending`
- `GET /api/products/featured`
- `GET /api/products/:id`
- `GET /api/products/:id/related`

Product `id` matches the frontend (`"1"`, `"2"`, …).

### Cart (auth required)
- `GET /api/cart`
- `POST /api/cart/items` — `{ productId, quantity?, size? }`
- `PATCH /api/cart/items/:productId` — `{ quantity?, size? }`
- `DELETE /api/cart/items/:productId`
- `DELETE /api/cart`
- `POST /api/cart/sync` — merge localStorage cart on login

### Wishlist (auth required)
- `GET /api/wishlist`
- `POST /api/wishlist/:productId`
- `DELETE /api/wishlist/:productId`
- `POST /api/wishlist/sync` — `{ ids: ["1","2"] }`

### Orders (auth required)
- `POST /api/orders` — `{ shippingAddress, paymentMethod?, items? }`
- `GET /api/orders`
- `GET /api/orders/:id`
- `POST /api/orders/:id/pay` — demo payment confirmation
- `PATCH /api/orders/:id/cancel`

## Deploy (Render / Railway)

1. Push the `backend/` folder to your repo.
2. Create a web service with:
   - **Build:** `npm install`
   - **Start:** `npm start`
3. Set env vars: `MONGODB_URI`, `JWT_SECRET`, `CLIENT_URL`, `NODE_ENV=production`.
4. Run seed once: `npm run seed` (via shell or one-off job).

## Frontend integration

Set in your Vite frontend `.env`:

```
VITE_API_URL=http://localhost:5000/api
```

Send the JWT on protected routes:

```
Authorization: Bearer <token>
```

On login, call `/api/cart/sync` and `/api/wishlist/sync` to merge localStorage data into the server.

## What's included vs not

| Feature | Status |
|---------|--------|
| Products from DB | Yes |
| Search / filters / pagination | Yes |
| JWT auth | Yes |
| Server cart & wishlist | Yes |
| Orders (COD + demo pay) | Yes |
| Real Razorpay/Stripe | No — wire in `confirmPayment` |
| Admin panel | No |
