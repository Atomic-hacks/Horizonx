# Horizon horizon

Horizon is now a fully frontend-only banking prototype. It runs entirely on static UI, local state, and browser storage, with no backend services, databases, auth providers, or payment integrations required.

## What it includes

- Account overview dashboard
- Transaction history with filtering and statement generation
- Local transfer simulation
- Beneficiary management
- Virtual card management
- Savings goals and fixed deposits
- Loan calculator and eligibility preview
- Bill payment, airtime, and data simulation
- Budget tracking and spending analytics
- Notifications, support, and security center
- Multi-account support across savings, current, and business profiles
- Currency conversion calculator

## Run

```bash
npm install
npm run dev
```

## Static export

The app is configured for static export. Build it with:

```bash
npm run build
```

The output is generated to `out/` and can be served with:

```bash
npm run start
```

## Notes

- No environment variables are required.
- The app uses browser-local horizon state, so refreshing the page keeps your simulated banking activity.
