<?php
header('Access-Control-Allow-Origin: http://localhost:3000');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
header('Content-Type: application/json');

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Only accept POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed']);
    exit();
}

// Get the POST data
$data = json_decode(file_get_contents('php://input'), true);

// Check if all required fields are present
if (!isset($data['name']) || !isset($data['email']) || !isset($data['phone']) || !isset($data['course'])) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'All fields are required']);
    exit();
}

// Extract form data
$name = $data['name'];
$email = $data['email'];
$phone = $data['phone'];
$course = $data['course'];

// Email configuration
$adminEmail = 'admin@leolilly.org';
$subject = 'New Course Enrollment';

// Admin email content
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

// Email headers
$headers = "MIME-Version: 1.0" . "\r\n";
$headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
$headers .= "From: $adminEmail" . "\r\n";

// Send emails
try {
    // Send email to admin
    $adminSent = mail($adminEmail, $subject, $adminMessage, $headers);
    
    // Send email to student
    $studentSent = mail($email, $studentSubject, $studentMessage, $headers);
    
    if ($adminSent && $studentSent) {
        http_response_code(200);
        echo json_encode(['success' => true, 'message' => 'Enrollment submitted successfully']);
    } else {
        throw new Exception('Failed to send emails');
    }
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Failed to process enrollment']);
}
