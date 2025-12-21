import User from '../models/User.js';
import Order from '../models/Order.js';

// @desc    Get user profile (orders included via population or separate query)
// @route   GET /api/users/profile
// @access  Private
export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password'); // .populate('orders') if needed, but we'll fetch orders separately
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
export const updateUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (user) {
      user.name = req.body.name || user.name;
      user.phone = req.body.phone || user.phone;
      
      if (req.body.password) {
        user.password = req.body.password;
      }
      
      // Update addresses if provided. 
      // Simplified: replacing the whole list or adding/updating specific ones. 
      // For now, let's assume we send the full address list or specific fields for the first address.
      // A better approach for the future is specific address management endpoints.
      if (req.body.addresses) {
         user.addresses = req.body.addresses;
      }

      const updatedUser = await user.save();

      res.json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        phone: updatedUser.phone,
        addresses: updatedUser.addresses,
        role: updatedUser.role,
      });
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

// @desc    Get user orders
// @route   GET /api/users/orders
// @access  Private
export const getUserOrders = async (req, res) => {
  try {
    // Find orders where the user field matches the logged-in user's ID
    const userOrders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });

    res.json(userOrders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};
