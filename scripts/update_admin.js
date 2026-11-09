const fs = require('fs');
const path = require('path');

const adminPath = path.join(__dirname, '..', 'admin.php');
let content = fs.readFileSync(adminPath, 'utf8');

// Replace the readCsvData and data loading in admin.php
const oldReadBlockRegex = /\/\/ Helper to read CSV rows[\s\S]*?\$totalRevenue = \$totalPaid \* SCHOLARSHIP_APPLICATION_FEE;/;

const newReadBlock = `// Helper to read raw CSV rows (used for payments where every transaction is recorded)
function readCsvData($filePath) {
    if (!file_exists($filePath)) {
        return [];
    }
    $rows = [];
    if (($handle = fopen($filePath, 'r')) !== false) {
        $header = fgetcsv($handle);
        while (($data = fgetcsv($handle)) !== false) {
            if (empty($data)) continue;
            if ($header && count($header) === count($data)) {
                $rows[] = array_combine($header, $data);
            } else {
                $rows[] = $data;
            }
        }
        fclose($handle);
    }
    return array_reverse($rows); // Newest first
}

// Helper to read and deduplicate CSV rows by email (latest entry retained)
function readDeduplicatedCsvData($filePath, $emailKey = 'Email', $defaultCol = 2) {
    if (!file_exists($filePath)) {
        return [];
    }
    $rows = [];
    if (($handle = fopen($filePath, 'r')) !== false) {
        $header = fgetcsv($handle);
        while (($data = fgetcsv($handle)) !== false) {
            if (empty($data)) continue;
            if ($header && count($header) === count($data)) {
                $rows[] = array_combine($header, $data);
            } else {
                $rows[] = $data;
            }
        }
        fclose($handle);
    }
    // Deduplicate by normalized email
    $unique = [];
    foreach ($rows as $item) {
        $email = '';
        if (is_array($item)) {
            if (isset($item[$emailKey])) {
                $email = strtolower(trim($item[$emailKey]));
            } elseif (isset($item[$defaultCol])) {
                $email = strtolower(trim($item[$defaultCol]));
            }
        }
        if (!empty($email)) {
            $unique[$email] = $item; // Overwrite with newest
        } else {
            $unique[] = $item;
        }
    }
    return array_reverse(array_values($unique)); // Newest first
}

$leadsDir = __DIR__ . '/data';
// De-duplicate leads and applicants by email; NEVER de-duplicate payments
$optinLeads = $isAuthenticated ? readDeduplicatedCsvData($leadsDir . '/optin_leads.csv', 'Email', 2) : [];
$scholarshipApps = $isAuthenticated ? readDeduplicatedCsvData($leadsDir . '/scholarship_applications.csv', 'Email', 3) : [];
$enrolledStudents = $isAuthenticated ? readCsvData($leadsDir . '/enrolled_students.csv') : [];

// Compute statistics
$totalDelegates = count($optinLeads);
$totalScholarships = count($scholarshipApps);
$totalPaid = count($enrolledStudents); // Every payment transaction counts
$totalRevenue = $totalPaid * SCHOLARSHIP_APPLICATION_FEE;`;

content = content.replace(oldReadBlockRegex, newReadBlock);

// Ensure heading font in Tailwind config
content = content.replace(
    "sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],",
    "sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],\n                        heading: ['Poppins', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],"
);

fs.writeFileSync(adminPath, content, 'utf8');
console.log('Successfully updated admin.php with deduplication and typography');

