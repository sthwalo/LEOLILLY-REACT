<?php
// Enable error reporting for debugging
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Send CORS headers for all requests
header('Access-Control-Allow-Origin: http://localhost:3000');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    // Just exit with 200 OK for preflight
    exit(0);
}

// Set content type for actual requests
header('Content-Type: application/json');

try {
    // Log the request for debugging
    file_put_contents('debug.log', date('Y-m-d H:i:s') . ' - Request received' . PHP_EOL, FILE_APPEND);
    
    // Get the POST data
    $rawInput = file_get_contents('php://input');
    file_put_contents('debug.log', date('Y-m-d H:i:s') . ' - Raw input: ' . $rawInput . PHP_EOL, FILE_APPEND);
    
    $data = json_decode($rawInput, true);
    if (json_last_error() !== JSON_ERROR_NONE) {
        throw new Exception('Invalid JSON: ' . json_last_error_msg());
    }
    
    // Check if all required fields are present
    if (!isset($data['name']) || !isset($data['email']) || !isset($data['phone']) || !isset($data['course'])) {
        throw new Exception('Missing required fields');
    }
    
    // Extract form data
    $name = $data['name'];
    $email = $data['email'];
    $phone = $data['phone'];
    $course = $data['course'];
    
    // Log the form data
    file_put_contents('debug.log', date('Y-m-d H:i:s') . ' - Form data: ' . json_encode($data) . PHP_EOL, FILE_APPEND);
    
    // Load environment variables
    $dotenv = __DIR__ . '/.env';
    file_put_contents('debug.log', date('Y-m-d H:i:s') . ' - Loading env from: ' . $dotenv . PHP_EOL, FILE_APPEND);
    
    if (file_exists($dotenv)) {
        $lines = file($dotenv, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
        foreach ($lines as $line) {
            if (strpos($line, '=') !== false && strpos($line, '#') !== 0) {
                list($key, $value) = explode('=', $line, 2);
                $_ENV[$key] = $value;
                putenv("$key=$value");
            }
        }
        file_put_contents('debug.log', date('Y-m-d H:i:s') . ' - Env loaded successfully' . PHP_EOL, FILE_APPEND);
    } else {
        file_put_contents('debug.log', date('Y-m-d H:i:s') . ' - Env file not found' . PHP_EOL, FILE_APPEND);
    }
    
    // Process the form data and store it
    file_put_contents('enrollments.log', date('Y-m-d H:i:s') . ' - New enrollment: ' . json_encode($data) . PHP_EOL, FILE_APPEND);
    
    // Check if PHPMailer is available
    if (file_exists(__DIR__ . '/vendor/autoload.php')) {
        // Use PHPMailer
        require __DIR__ . '/vendor/autoload.php';
        
        // Email configuration from environment variables (Laravel style)
        $emailMailer = $_ENV['MAIL_MAILER'] ?? 'smtp';
        $emailHost = $_ENV['MAIL_HOST'] ?? 'mail.leolilly.org';
        $emailPort = intval($_ENV['MAIL_PORT'] ?? 465);
        $emailUsername = $_ENV['MAIL_USERNAME'] ?? 'admin@leolilly.org';
        $emailPassword = $_ENV['MAIL_PASSWORD'] ?? '';
        $emailEncryption = $_ENV['MAIL_ENCRYPTION'] ?? 'ssl';
        
        file_put_contents('debug.log', date('Y-m-d H:i:s') . ' - Using PHPMailer with SMTP' . PHP_EOL, FILE_APPEND);
        file_put_contents('debug.log', date('Y-m-d H:i:s') . ' - SMTP Settings: ' . $emailHost . ':' . $emailPort . ' (encryption: ' . $emailEncryption . ')' . PHP_EOL, FILE_APPEND);
        
        try {
            // Admin email content
            $adminSubject = 'New Course Enrollment';
            $adminMessage = "<h2>New Enrollment Request</h2>
<p><strong>Name:</strong> $name</p>
<p><strong>Email:</strong> $email</p>
<p><strong>Phone:</strong> $phone</p>
<p><strong>Course:</strong> $course</p>";
            
            // Student email content
            $studentSubject = 'Your LeoLilly Care International Enrollment';
            $studentMessage = "<h2>Thank You for Enrolling!</h2>
<p>Dear $name,</p>
<p>Thank you for enrolling in our <strong>$course</strong> course. We have received your application and will contact you shortly with more information.</p>
<p>If you have any questions, please don't hesitate to contact us.</p>
<p>Best regards,</p>
<p>LeoLilly Care International Team</p>";
            
            // Create a new PHPMailer instance for admin email
            $adminMailer = new \PHPMailer\PHPMailer\PHPMailer(true);
            $adminMailer->SMTPDebug = 0; // Set to 2 for detailed debug output
            $adminMailer->isSMTP();
            $adminMailer->Host = $emailHost;
            $adminMailer->SMTPAuth = true;
            $adminMailer->Username = $emailUsername;
            $adminMailer->Password = $emailPassword;
            $adminMailer->SMTPSecure = $emailEncryption;
            $adminMailer->Port = $emailPort;
            $adminMailer->setFrom($emailUsername, 'LeoLilly Care International');
            $adminMailer->addAddress($emailUsername);
            $adminMailer->isHTML(true);
            $adminMailer->Subject = $adminSubject;
            $adminMailer->Body = $adminMessage;
            
            file_put_contents('debug.log', date('Y-m-d H:i:s') . ' - Attempting to send admin email via SMTP' . PHP_EOL, FILE_APPEND);
            $adminSent = $adminMailer->send();
            file_put_contents('debug.log', date('Y-m-d H:i:s') . ' - Admin email result: ' . ($adminSent ? 'success' : 'failed - ' . $adminMailer->ErrorInfo) . PHP_EOL, FILE_APPEND);
            
            // Create a new PHPMailer instance for student email
            $studentMailer = new \PHPMailer\PHPMailer\PHPMailer(true);
            $studentMailer->SMTPDebug = 0; // Set to 2 for detailed debug output
            $studentMailer->isSMTP();
            $studentMailer->Host = $emailHost;
            $studentMailer->SMTPAuth = true;
            $studentMailer->Username = $emailUsername;
            $studentMailer->Password = $emailPassword;
            $studentMailer->SMTPSecure = $emailEncryption;
            $studentMailer->Port = $emailPort;
            $studentMailer->setFrom($emailUsername, 'LeoLilly Care International');
            $studentMailer->addAddress($email, $name);
            $studentMailer->isHTML(true);
            $studentMailer->Subject = $studentSubject;
            $studentMailer->Body = $studentMessage;
            
            file_put_contents('debug.log', date('Y-m-d H:i:s') . ' - Attempting to send student email via SMTP' . PHP_EOL, FILE_APPEND);
            $studentSent = $studentMailer->send();
            file_put_contents('debug.log', date('Y-m-d H:i:s') . ' - Student email result: ' . ($studentSent ? 'success' : 'failed - ' . $studentMailer->ErrorInfo) . PHP_EOL, FILE_APPEND);
            
            if ($adminSent && $studentSent) {
                echo json_encode([
                    'success' => true, 
                    'message' => 'Enrollment submitted successfully'
                ]);
            } else {
                // Return a success message to the user but log the email failure
                file_put_contents('debug.log', date('Y-m-d H:i:s') . ' - Email sending failed but returning success to user' . PHP_EOL, FILE_APPEND);
                echo json_encode([
                    'success' => true, 
                    'message' => 'Enrollment submitted successfully (Note: Email delivery may have failed, check server logs)'
                ]);
            }
        } catch (\PHPMailer\PHPMailer\Exception $e) {
            file_put_contents('debug.log', date('Y-m-d H:i:s') . ' - PHPMailer error: ' . $e->getMessage() . PHP_EOL, FILE_APPEND);
            // Return a success message to the user but log the error
            echo json_encode([
                'success' => true, 
                'message' => 'Enrollment submitted successfully (Note: Email delivery may have failed, check server logs)'
            ]);
        }
    } else {
        file_put_contents('debug.log', date('Y-m-d H:i:s') . ' - PHPMailer not found, skipping email sending' . PHP_EOL, FILE_APPEND);
        
        // Return success message to user
        echo json_encode([
            'success' => true, 
            'message' => 'Enrollment submitted successfully'
        ]);
    }
    
} catch (Exception $e) {
    // Log the error
    file_put_contents('debug.log', date('Y-m-d H:i:s') . ' - Error: ' . $e->getMessage() . PHP_EOL, FILE_APPEND);
    
    // Return error response
    http_response_code(500);
    echo json_encode([
        'success' => false, 
        'message' => 'Error processing request: ' . $e->getMessage()
    ]);
}
