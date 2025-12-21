import nodemailer from 'nodemailer';

/**
 * Create a nodemailer transporter
 * If SMTP credentials are not provided, returns a test account or logs to console
 */
const createTransporter = async () => {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } = process.env;

  // Check if SMTP credentials are provided
  if (SMTP_HOST && SMTP_PORT && SMTP_USER && SMTP_PASS) {
    return nodemailer.createTransport({
      host: SMTP_HOST,
      port: parseInt(SMTP_PORT),
      secure: parseInt(SMTP_PORT) === 465, // true for 465, false for other ports
      auth: {
        user: SMTP_USER,
        pass: SMTP_PASS,
      },
    });
  }

  // If no credentials, return null (we'll log to console instead)
  return null;
};

/**
 * Send a generic email
 */
export const sendEmail = async ({ to, subject, html, text }) => {
  try {
    const transporter = await createTransporter();

    if (!transporter) {
      console.log('\n📧 ===== EMAIL (DRY RUN) =====');
      console.log(`To: ${to}`);
      console.log(`Subject: ${subject}`);
      console.log(`Body:\n${text || html}`);
      console.log('===== END EMAIL =====\n');
      return { success: true, dryRun: true };
    }

    const info = await transporter.sendMail({
      from: `"Pitara Gifts" <${process.env.SMTP_USER}>`,
      to,
      subject,
      text,
      html,
    });

    console.log('✅ Email sent:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('❌ Error sending email:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Send order confirmation email
 */
export const sendOrderConfirmationEmail = async (order) => {
  const { customerInfo, orderNumber, items, totalPrice, createdAt } = order;

  // Format address
  const formatAddress = (addr) => {
    if (typeof addr === 'string') return addr;
    if (!addr) return 'N/A';
    const parts = [
      addr.street,
      addr.city,
      addr.state,
      addr.zipCode,
      addr.country
    ].filter(Boolean);
    return parts.join(', ');
  };

  // Format items for email
  const itemsList = items
    .map((item) => {
      const itemName = item.name || 'Gift Item';
      
      const customizations = item.customization
        ? `\n    Customizations: Size: ${item.customization.size}, Wrapping: ${item.customization.wrapping}, Ribbon: ${item.customization.ribbon ? 'Yes' : 'No'}`
        : '';

      return `  • ${itemName} x${item.quantity} - ₹${item.itemTotal}${customizations}`;
    })
    .join('\n');

  const emailText = `
Dear ${customerInfo.name},

Thank you for your order at Pitara!

Order Details:
--------------
Order Number: ${orderNumber}
Order Date: ${new Date(createdAt).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}

Items:
${itemsList}

Total: ₹${totalPrice}

Delivery Information:
---------------------
${customerInfo.name}
${formatAddress(customerInfo.address)}
${customerInfo.phone}
${customerInfo.email}

We will process your order shortly and keep you updated on the delivery status.

Thank you for choosing Pitara!

Best regards,
The Pitara Team
  `.trim();

  const emailHtml = `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: linear-gradient(135deg, #d4af37 0%, #f4e5b1 100%); color: #1a1a1a; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
    .header h1 { margin: 0; font-size: 28px; }
    .content { background: #ffffff; padding: 30px; border: 1px solid #e0e0e0; }
    .order-info { background: #f9f9f9; padding: 15px; border-radius: 6px; margin: 20px 0; }
    .items { margin: 20px 0; }
    .item { padding: 10px 0; border-bottom: 1px solid #eee; }
    .item:last-child { border-bottom: none; }
    .total { font-size: 20px; font-weight: bold; color: #d4af37; margin-top: 20px; text-align: right; }
    .footer { background: #f5f5f5; padding: 20px; text-align: center; color: #666; font-size: 14px; border-radius: 0 0 8px 8px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>🎁 Order Confirmation</h1>
      <p style="margin: 10px 0 0 0;">Thank you for your order!</p>
    </div>
    
    <div class="content">
      <p>Dear <strong>${customerInfo.name}</strong>,</p>
      <p>We're delighted to confirm your order at Pitara. Your thoughtful gift is being prepared with care.</p>
      
      <div class="order-info">
        <p><strong>Order Number:</strong> ${orderNumber}</p>
        <p><strong>Order Date:</strong> ${new Date(createdAt).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}</p>
      </div>

      <h3>Order Items:</h3>
      <div class="items">
        ${items.map(item => {
          const itemName = item.name || 'Gift Item';
          
          const customizations = item.customization
            ? `<br><small style="color: #666;">Customizations: Size: ${item.customization.size}, Wrapping: ${item.customization.wrapping}, Ribbon: ${item.customization.ribbon ? 'Yes' : 'No'}</small>`
            : '';

          return `
            <div class="item">
              <strong>${itemName}</strong> x${item.quantity}
              ${customizations}
              <div style="text-align: right; color: #d4af37;">₹${item.itemTotal}</div>
            </div>
          `;
        }).join('')}
      </div>

      <div class="total">Total: ₹${totalPrice}</div>

      <h3>Delivery Information:</h3>
      <div class="order-info">
        <p><strong>${customerInfo.name}</strong></p>
        <p>${formatAddress(customerInfo.address)}</p>
        <p>Phone: ${customerInfo.phone}</p>
        <p>Email: ${customerInfo.email}</p>
      </div>

      <p>We will process your order shortly and keep you updated on the delivery status.</p>
    </div>

    <div class="footer">
      <p><strong>Pitara</strong> - Gifts That Speak From The Heart</p>
      <p>Contact us: pitarareal@gmail.com</p>
    </div>
  </div>
</body>
</html>
  `.trim();

  return sendEmail({
    to: customerInfo.email,
    subject: `Order Confirmation - ${orderNumber} | Pitara`,
    text: emailText,
    html: emailHtml,
  });
};
