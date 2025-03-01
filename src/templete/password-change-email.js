const passwordChangedTemplate = () => `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Password Changed Successfully</title>
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
        .warning {
            padding: 15px;
            margin: 20px 0;
            background-color: #fff4e5;
            border: 1px solid #ffcd94;
            border-radius: 5px;
            color: #7a4900;
            font-size: 14px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Password Changed Successfully</h1>
        </div>
        <div class="content">
            <p>Hi [User's Name],</p>
            <p>Your password has been successfully changed for your Mentor Paw account.</p>
            <p>If you did not make this change, we recommend updating your password immediately to ensure your account's safety.</p>
        </div>
        <div class="warning">
            <strong>Important:</strong> If you are not the intended recipient of this email, please delete it immediately. Unauthorized sharing or use of this email is strictly prohibited.
        </div>
        <div class="footer">
            <p>Mentor Paw | <a href="https://mentor-paw.vercel.app">Visit Our Website</a></p>
        </div>
    </div>
</body>
</html>`;

export default passwordChangedTemplate;