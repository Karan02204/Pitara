# Pitara (Gifty Hub) - Complete Learning Guide

Welcome to the Pitara project learning guide. This directory contains a module-by-module breakdown designed to help you deeply understand the architecture and rebuild the entire application from scratch without AI assistance.

## Project Architecture

Pitara is a MERN Stack (MongoDB, Express, React, Node.js) single-page e-commerce application.
The system is divided into two distinct parts:
1. **Frontend (Vite/React)**: Responsible for UI, global state, routing, and interacting with the user.
2. **Backend (Node/Express)**: Responsible for business logic, database interactions, authentication, and secure payment processing.

They communicate strictly via RESTful APIs over HTTP, exchanging JSON data.

## Dependency Graph

```mermaid
graph TD
    subgraph Frontend (React)
        UI[UI Components] --> Router[React Router]
        Router --> Pages[Pages]
        Pages --> Context[State: Auth & Cart Contexts]
        Pages --> RQ[React Query]
    end

    subgraph Backend (Express)
        RQ -- HTTP REST --> Routes[API Routes]
        Context -- HTTP REST --> Routes
        Routes --> Controllers[Controllers]
        Controllers --> Middleware[Auth Middleware]
        Controllers --> Models[Mongoose Models]
        Models --> DB[(MongoDB)]
    end
    
    Controllers -.-> Razorpay[Razorpay API]
    UI -.-> RazorpayFrontend[Razorpay Script]
```

## Recommended Learning Order

Follow these modules sequentially. They are designed to build upon each other, starting from core infrastructure and ending with complex integrations.

1. [Module 1: Backend Foundation & Authentication](./01-backend-foundation-authentication.md) *(Estimated time: 4 hours)*
2. [Module 2: Products & Orders](./02-products-orders.md) *(Estimated time: 3 hours)*
3. [Module 3: Payment Gateway](./03-payment-gateway.md) *(Estimated time: 3 hours)*
4. [Module 4: Frontend Foundation & Routing](./04-frontend-foundation-routing.md) *(Estimated time: 2 hours)*
5. [Module 5: Global State Management](./05-global-state-management.md) *(Estimated time: 3 hours)*
6. [Module 6: Data Fetching & UI Polish](./06-data-fetching-ui-polish.md) *(Estimated time: 3 hours)*
7. [Module 7: Checkout & Final Assembly](./07-checkout-final-assembly.md) *(Estimated time: 4 hours)*

**Total Estimated Time:** ~22 hours

## From Beginner to Production Roadmap

1. **Understand**: Read through these markdown files and trace the code in the actual repository. Use the Sequence Diagrams to map concepts to files.
2. **Experiment**: Complete the "Beginner" and "Intermediate" exercises at the end of each module within the existing codebase to build muscle memory.
3. **Rebuild in Isolation**: Take one module at a time. Create a blank directory, and attempt to fulfill the "Rebuild From Scratch Checklist" without looking at the original code. Refer back only when stuck.
4. **Deploy**: Once rebuilt locally, learn to deploy the backend to Render/Railway, the frontend to Vercel/Netlify, and host your MongoDB database on MongoDB Atlas.

## Final Challenge

Your ultimate goal is the **Blank Slate Challenge**:
1. `mkdir my-pitara-clone`
2. Set a timer.
3. Without copying and pasting, and relying only on official documentation (React docs, Express docs, Mongoose docs) and your own knowledge, rebuild a functioning version of this e-commerce store featuring:
   - User Auth
   - Product Listing
   - Functional Cart
   - Successful Razorpay Checkout test transaction.

Good luck!
