<?php
// Error handling configuration
error_reporting(E_ALL);
ini_set('display_errors', 0); // Don't show errors in production
ini_set('log_errors', 1);

// Create logs directory if it doesn't exist
if (!file_exists(__DIR__ . '/logs')) {
    mkdir(__DIR__ . '/logs', 0755, true);
}

// Enable error reporting for debugging
error_reporting(E_ALL);
ini_set('display_errors', 1);
ini_set('error_log', __DIR__ . '/logs/php_errors.log');

ini_set('error_log', __DIR__ . '/logs/php_errors.log');

// Log access for debugging
file_put_contents(__DIR__ . '/logs/access.log', date('Y-m-d H:i:s') . ' - Access from: ' . $_SERVER['REMOTE_ADDR'] . ' - User Agent: ' . $_SERVER['HTTP_USER_AGENT'] . PHP_EOL, FILE_APPEND);

// Function to get the correct date format regardless of system date
function getCorrectDate() {
    // Get current date from system
    $currentDate = new DateTime();
    
    // Check if year is in the future (after 2023)
    if ((int)$currentDate->format('Y') > 2023) {
        // Force the year to be 2023 if system date is in the future
        return date('Y-m-d H:i:s', strtotime('2023-' . date('m-d H:i:s')));
    }
    
    return date('Y-m-d H:i:s');
}

// Send CORS headers for all requests
$allowedOrigins = array(
    'http://localhost:3000',
    'http://localhost:3001',
    'http://127.0.0.1:3000',
    'http://127.0.0.1:3001',
    'https://leolilly.org',
    'https://www.leolilly.org',
    'http://leolilly.org',
    'http://www.leolilly.org'
);

// For development, allow all origins if running on localhost
if (strpos($_SERVER['HTTP_HOST'], 'localhost') !== false || strpos($_SERVER['HTTP_HOST'], '127.0.0.1') !== false) {
    header('Access-Control-Allow-Origin: *');
}

// Get the origin
$origin = isset($_SERVER['HTTP_ORIGIN']) ? $_SERVER['HTTP_ORIGIN'] : '';
if (empty($origin) && isset($_SERVER['HTTP_REFERER'])) {
    // Try to extract origin from referer if origin header is not available
    $refererParts = parse_url($_SERVER['HTTP_REFERER']);
    if (isset($refererParts['scheme']) && isset($refererParts['host'])) {
        $origin = $refererParts['scheme'] . '://' . $refererParts['host'];
        if (isset($refererParts['port'])) {
            $origin .= ':' . $refererParts['port'];
        }
    }
}

if (in_array($origin, $allowedOrigins)) {
    header('Access-Control-Allow-Origin: ' . $origin);
}

header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    // Just exit with 200 OK for preflight
    exit(0);
}

// Set content type for actual requests
header('Content-Type: application/json');

// Ensure log files are writable
if (!is_writable(__DIR__)) {
    error_log('Server directory is not writable for logging');
}

// Clear old debug log if it's too large (> 1MB)
if (file_exists(__DIR__ . '/logs/debug.log') && filesize(__DIR__ . '/logs/debug.log') > 1048576) {
    file_put_contents(__DIR__ . '/logs/debug.log', getCorrectDate() . ' - Log file cleared (size limit reached)' . PHP_EOL);
}

try {
    // Create debug log directory if it doesn't exist
    if (!file_exists(__DIR__ . '/logs')) {
        mkdir(__DIR__ . '/logs', 0755, true);
    }
    
    // Log the request for debugging
    file_put_contents(__DIR__ . '/logs/debug.log', getCorrectDate() . ' - Request received' . PHP_EOL, FILE_APPEND);
    file_put_contents(__DIR__ . '/logs/debug.log', getCorrectDate() . ' - Request method: ' . $_SERVER['REQUEST_METHOD'] . PHP_EOL, FILE_APPEND);
    file_put_contents(__DIR__ . '/logs/debug.log', getCorrectDate() . ' - Request headers: ' . json_encode(getallheaders()) . PHP_EOL, FILE_APPEND);
    
    // Get the POST data
    $rawInput = file_get_contents('php://input');
    file_put_contents(__DIR__ . '/logs/debug.log', getCorrectDate() . ' - Raw input: ' . $rawInput . PHP_EOL, FILE_APPEND);
    
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
    file_put_contents(__DIR__ . '/logs/debug.log', getCorrectDate() . ' - Form data: ' . json_encode($data) . PHP_EOL, FILE_APPEND);
    
    // Load environment variables
    $dotenv = __DIR__ . '/.env';
    file_put_contents(__DIR__ . '/logs/debug.log', getCorrectDate() . ' - Loading env from: ' . $dotenv . PHP_EOL, FILE_APPEND);
    
    if (file_exists($dotenv)) {
        $lines = file($dotenv, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
        foreach ($lines as $line) {
            if (strpos($line, '=') !== false && strpos($line, '#') !== 0) {
                list($key, $value) = explode('=', $line, 2);
                $_ENV[$key] = $value;
                putenv("$key=$value");
            }
        }
        file_put_contents(__DIR__ . '/logs/debug.log', getCorrectDate() . ' - Env loaded successfully' . PHP_EOL, FILE_APPEND);
    } else {
        file_put_contents(__DIR__ . '/logs/debug.log', getCorrectDate() . ' - Env file not found' . PHP_EOL, FILE_APPEND);
    }
    
    // Process the form data and store it
    file_put_contents(__DIR__ . '/logs/enrollments.log', getCorrectDate() . ' - New enrollment: ' . json_encode($data) . PHP_EOL, FILE_APPEND);
    
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
        
        file_put_contents(__DIR__ . '/logs/debug.log', getCorrectDate() . ' - Using PHPMailer with SMTP' . PHP_EOL, FILE_APPEND);
        file_put_contents(__DIR__ . '/logs/debug.log', getCorrectDate() . ' - SMTP Settings: ' . $emailHost . ':' . $emailPort . ' (encryption: ' . $emailEncryption . ')' . PHP_EOL, FILE_APPEND);
        
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
            
            file_put_contents(__DIR__ . '/logs/debug.log', getCorrectDate() . ' - Attempting to send admin email via SMTP' . PHP_EOL, FILE_APPEND);
            $adminSent = $adminMailer->send();
            file_put_contents(__DIR__ . '/logs/debug.log', getCorrectDate() . ' - Admin email result: ' . ($adminSent ? 'success' : 'failed - ' . $adminMailer->ErrorInfo) . PHP_EOL, FILE_APPEND);
            
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
            
            file_put_contents(__DIR__ . '/logs/debug.log', getCorrectDate() . ' - Attempting to send student email via SMTP' . PHP_EOL, FILE_APPEND);
            $studentSent = $studentMailer->send();
            file_put_contents(__DIR__ . '/logs/debug.log', getCorrectDate() . ' - Student email result: ' . ($studentSent ? 'success' : 'failed - ' . $studentMailer->ErrorInfo) . PHP_EOL, FILE_APPEND);
            
            if ($adminSent && $studentSent) {
                echo json_encode([
                    'success' => true, 
                    'message' => 'Enrollment submitted successfully'
                ]);
            } else {
                // Return a success message to the user but log the email failure
                file_put_contents(__DIR__ . '/logs/debug.log', getCorrectDate() . ' - Email sending failed but returning success to user' . PHP_EOL, FILE_APPEND);
                echo json_encode([
                    'success' => true, 
                    'message' => 'Enrollment submitted successfully (Note: Email delivery may have failed, check server logs)'
                ]);
            }
        } catch (\PHPMailer\PHPMailer\Exception $e) {
            file_put_contents(__DIR__ . '/logs/debug.log', getCorrectDate() . ' - PHPMailer error: ' . $e->getMessage() . PHP_EOL, FILE_APPEND);
            // Return a success message to the user but log the error
            echo json_encode([
                'success' => true, 
                'message' => 'Enrollment submitted successfully (Note: Email delivery may have failed, check server logs)'
            ]);
        }
    } else {
        file_put_contents(__DIR__ . '/logs/debug.log', getCorrectDate() . ' - PHPMailer not found, skipping email sending' . PHP_EOL, FILE_APPEND);
        
        // Return success message to user
        echo json_encode([
            'success' => true, 
            'message' => 'Enrollment submitted successfully'
        ]);
    }
    
} catch (Exception $e) {
    // Log the error
    file_put_contents(__DIR__ . '/logs/debug.log', getCorrectDate() . ' - Error: ' . $e->getMessage() . PHP_EOL, FILE_APPEND);
    
    // Return detailed error response
    http_response_code(500);
    $errorMessage = 'Error processing request: ' . $e->getMessage();
    
    // Log the error with more details
    file_put_contents(__DIR__ . '/logs/debug.log', getCorrectDate() . ' - DETAILED ERROR: ' . $errorMessage . ' | Trace: ' . $e->getTraceAsString() . PHP_EOL, FILE_APPEND);
    
    echo json_encode([
        'success' => false, 
        'message' => $errorMessage,
        'error_code' => 'ENROLLMENT_ERROR'
    ]);
}
