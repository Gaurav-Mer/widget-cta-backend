const verificationEmailTemplate = ({ verificationUrl }) => `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Email Verification</title>
    <style>
        body {
            margin: 0;
            padding: 0;
            font-family: 'Inter', Arial, sans-serif;
            background-color: #f6f8fa;
            color: #333333;
        }
        .container {
            max-width: 600px;
            margin: 20px auto;
            background: #ffffff;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
            border: 1px solid #e2e8f0;
        }
        .header {
            background: linear-gradient(90deg, #FFA733, #FF6B00);
            padding: 20px;
            text-align: center;
            color: #ffffff;
        }
        .header h1 {
            margin: 0;
            font-size: 24px;
            font-weight: bold;
        }
        .content {
            padding: 20px;
            text-align: center;
        }
        .content p {
            font-size: 16px;
            line-height: 1.5;
            margin-bottom: 20px;
        }
        .btn {
            display: inline-block;
            padding: 12px 24px;
            background-color: #FF6B00;
            color: #ffffff;
            text-decoration: none;
            font-size: 16px;
            font-weight: bold;
            border-radius: 5px;
            transition: background-color 0.3s ease;
        }
        .btn:hover {
            background-color: #e65b00;
        }
        .warning {
            padding: 15px;
            margin: 20px 0;
            background-color: #fff4e5;
            border: 1px solid #ffcd94;
            border-radius: 5px;
            color: #7a4900;
            font-size: 14px;
        }
        .footer {
            padding: 20px;
            background-color: #f9fafb;
            text-align: center;
            font-size: 14px;
            color: #555555;
        }
        .footer a {
            color: #FF6B00;
            text-decoration: none;
        }
        .footer a:hover {
            text-decoration: underline;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Welcome to supawase!</h1>
        </div>
        <div class="content">
            <p>Hi User,</p>
            <p>We're excited to have you on board! Please verify your email address to get started with Supawase.</p>
            <a href="${verificationUrl}" class="btn">Verify My Email</a>
            <p>If the button above doesn't work, copy and paste this link into your browser:</p>
            <p><a href="[verification-link]" style="color: #FF6B00;">${verificationUrl}</a></p>
        </div>
        <div class="warning">
            <strong>Important:</strong> If you are not the intended recipient of this email, please delete it immediately. Sharing or using this email inappropriately is strictly prohibited.
        </div>
        <div class="footer">
            <p>Supawase | <a href="https://mentor-paw.vercel.app">Visit Our Website</a></p>
        </div>
    </div>
</body>
</html>`;

export default verificationEmailTemplate;