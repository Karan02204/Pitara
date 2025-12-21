// API base URL - change this based on environment
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

/**
 * Generic fetch wrapper with error handling
 */
async function fetchAPI(endpoint, options = {}) {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'API request failed');
    }

    return await response.json();
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
}

/**
 * Fetch all gifts with optional filters
 * @param {Object} filters - Optional filters (category, popular)
 * @returns {Promise<Array>} Array of gifts
 */
export async function fetchGifts(filters = {}) {
  const params = new URLSearchParams();
  
  if (filters.category && filters.category !== 'All') {
    params.append('category', filters.category);
  }
  
  if (filters.popular) {
    params.append('popular', 'true');
  }

  const queryString = params.toString();
  const endpoint = `/gifts${queryString ? `?${queryString}` : ''}`;
  
  return fetchAPI(endpoint);
}

/**
 * Fetch a single gift by ID
 * @param {string} id - Gift ID
 * @returns {Promise<Object>} Gift object
 */
export async function fetchGiftById(id) {
  return fetchAPI(`/gifts/${id}`);
}

/**
 * Fetch gifts by category
 * @param {string} category - Category name
 * @returns {Promise<Array>} Array of gifts
 */
export async function fetchGiftsByCategory(category) {
  return fetchAPI(`/gifts/category/${encodeURIComponent(category)}`);
}

/**
 * Create a new order
 * @param {Object} orderData - Order data including customerInfo, items, totalPrice
 * @returns {Promise<Object>} Created order object
 */
export async function createOrder(orderData) {
  const token = localStorage.getItem('token');
  const options = {
    method: 'POST',
    body: JSON.stringify(orderData),
  };
  
  if (token) {
    options.headers = {
      'Authorization': `Bearer ${token}`
    };
  }
  
  return fetchAPI('/orders', options);
}

/**
 * Fetch order by ID
 * @param {string} id - Order ID
 * @returns {Promise<Object>} Order object
 */
export async function fetchOrderById(id) {
  return fetchAPI(`/orders/${id}`);
}

/**
 * Fetch order by order number
 * @param {string} orderNumber - Order number
 * @returns {Promise<Object>} Order object
 */
export async function fetchOrderByNumber(orderNumber) {
  return fetchAPI(`/orders/number/${orderNumber}`);
}

/**
 * Fetch all orders (admin)
 * @param {Object} filters - Optional filters (status, email, page, limit)
 * @returns {Promise<Object>} Orders with pagination info
 */
export async function fetchOrders(filters = {}) {
  const params = new URLSearchParams();
  
  if (filters.status) params.append('status', filters.status);
  if (filters.email) params.append('email', filters.email);
  if (filters.page) params.append('page', filters.page);
  if (filters.limit) params.append('limit', filters.limit);

  const queryString = params.toString();
  const endpoint = `/orders${queryString ? `?${queryString}` : ''}`;
  
  return fetchAPI(endpoint);
}

/**
 * Health check endpoint
 * @returns {Promise<Object>} API health status
 */
export async function checkAPIHealth() {
  return fetchAPI('/health');
}

/**
 * Create a Razorpay order
 * @param {number} amount - Order amount in INR
 * @param {Object} orderData - Order data for later use
 * @returns {Promise<Object>} Razorpay order details
 */
export async function createRazorpayOrder(amount, orderData) {
  const token = localStorage.getItem('token');
  const options = {
    method: 'POST',
    body: JSON.stringify({ amount, currency: 'INR' }),
  };
  
  if (token) {
    options.headers = {
      'Authorization': `Bearer ${token}`
    };
  }
  
  return fetchAPI('/payment/create-order', options);
}

/**
 * Verify Razorpay payment and create order
 * @param {Object} paymentData - Payment data from Razorpay
 * @returns {Promise<Object>} Created order object
 */
export async function verifyPayment(paymentData) {
  const token = localStorage.getItem('token');
  const options = {
    method: 'POST',
    body: JSON.stringify(paymentData),
  };
  
  if (token) {
    options.headers = {
      'Authorization': `Bearer ${token}`
    };
  }
  
  return fetchAPI('/payment/verify', options);
}
