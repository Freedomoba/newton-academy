<?php
/**
 * Newton Academy - Direct Award Letter PDF Download Endpoint
 */

require_once __DIR__ . '/award_letter_pdf.php';

$name = trim($_GET['name'] ?? 'Candidate');
$programme = trim($_GET['programme'] ?? $_GET['track'] ?? 'Digital Marketing + Applied AI');
$appId = trim($_GET['app_id'] ?? 'NA-SCH-' . strtoupper(substr(md5(uniqid()), 0, 8)));

$pdfContent = NewtonAwardPdf::generate($name, $programme, $appId);

header('Content-Type: application/pdf');
header('Content-Disposition: inline; filename="Newton_Academy_Scholarship_Award_' . $appId . '.pdf"');
header('Content-Length: ' . strlen($pdfContent));
header('Cache-Control: private, max-age=0, must-revalidate');
header('Pragma: public');

echo $pdfContent;
exit;
