<?php
/**
 * Newton Academy - Native Pure PHP Award Letter PDF Generator
 * Zero external libraries, zero Composer, zero Node.js.
 * Runs seamlessly on any standard cPanel PHP 7.x/8.x hosting.
 */

class NewtonAwardPdf {

    public static function generate($candidateName, $programmeName, $applicationId, $date = null) {
        $formattedDate = $date ?: date('j F Y');
        $candidateName = html_entity_decode($candidateName, ENT_QUOTES, 'UTF-8');
        $programmeName = html_entity_decode($programmeName, ENT_QUOTES, 'UTF-8');

        $lines = [
            ['text' => 'NEWTON ACADEMY', 'font' => '/F2', 'size' => 16, 'leading' => 20],
            ['text' => 'OFFICE OF ACADEMIC AFFAIRS & AWARDS', 'font' => '/F2', 'size' => 9.5, 'leading' => 14],
            ['text' => 'Newton Academy Global Secretariat  |  Official Contact: na@newtoncore.com', 'font' => '/F1', 'size' => 9, 'leading' => 18],
            ['text' => '---------------------------------------------------------------------------------------------------------------------------------', 'font' => '/F1', 'size' => 8, 'leading' => 18],
            ['text' => 'Date: ' . $formattedDate, 'font' => '/F1', 'size' => 9.5, 'leading' => 15],
            ['text' => 'Reference Number: ' . $applicationId, 'font' => '/F2', 'size' => 9.5, 'leading' => 15],
            ['text' => 'Candidate Name: ' . $candidateName, 'font' => '/F2', 'size' => 10, 'leading' => 22],
            ['text' => 'OFFICIAL AWARD OF 100% FULL TUITION SCHOLARSHIP', 'font' => '/F2', 'size' => 11.5, 'leading' => 16],
            ['text' => 'Programme Specialization: ' . $programmeName . ' (Flagship Diploma)', 'font' => '/F2', 'size' => 10, 'leading' => 22],
            ['text' => 'Dear ' . $candidateName . ',', 'font' => '/F1', 'size' => 10, 'leading' => 16],
            ['text' => '', 'font' => '/F1', 'size' => 6, 'leading' => 6],
            ['text' => 'We are pleased to inform you that following the review of your candidate application, the Admissions', 'font' => '/F1', 'size' => 9.5, 'leading' => 14],
            ['text' => 'Committee and Academic Board of Newton Academy have approved your admission and officially awarded you', 'font' => '/F1', 'size' => 9.5, 'leading' => 14],
            ['text' => 'a 100% Full Tuition Scholarship for the ' . $programmeName . ' professional training programme.', 'font' => '/F1', 'size' => 9.5, 'leading' => 18],
            ['text' => 'Under the terms of this award, your standard programme tuition of N200,000 is fully covered and waived', 'font' => '/F1', 'size' => 9.5, 'leading' => 14],
            ['text' => 'by the Newton Academy Endowment Fund. You bear zero tuition liability for the entire duration of the', 'font' => '/F1', 'size' => 9.5, 'leading' => 14],
            ['text' => 'three-month curriculum, including all live classes, practical assignments, tutor office hours, and specialised AI tool suites.', 'font' => '/F1', 'size' => 9.5, 'leading' => 18],
            ['text' => 'To secure your scholarship allocation, successful candidates are required to complete a one-time admissions', 'font' => '/F1', 'size' => 9.5, 'leading' => 14],
            ['text' => 'commitment and candidate portal verification fee of N20,000 only. This fee covers your tamper-proof student', 'font' => '/F1', 'size' => 9.5, 'leading' => 14],
            ['text' => 'identification issuance, personalised student dashboard provisioning, and orientation onboarding materials.', 'font' => '/F1', 'size' => 9.5, 'leading' => 18],
            ['text' => 'Please be advised that because of strict tutor-to-student coaching ratios, scholarship allocations are held', 'font' => '/F1', 'size' => 9.5, 'leading' => 14],
            ['text' => 'for exactly 24 hours from the time of issuance. You are required to access your official admissions file via the', 'font' => '/F1', 'size' => 9.5, 'leading' => 14],
            ['text' => 'admissions portal and finalize your registration within this window to guarantee your seat.', 'font' => '/F1', 'size' => 9.5, 'leading' => 18],
            ['text' => 'Upon confirmation of your one-time fee, your verified Newton Fellow credentials will be issued immediately,', 'font' => '/F1', 'size' => 9.5, 'leading' => 14],
            ['text' => 'and you will be directed to contact Odunayo (Lead Admissions Advisor) on WhatsApp to receive your official', 'font' => '/F1', 'size' => 9.5, 'leading' => 14],
            ['text' => 'onboarding pack and entry into the VIP Enrolled Fellows Room.', 'font' => '/F1', 'size' => 9.5, 'leading' => 18],
            ['text' => 'Once again, congratulations on your selection. We look forward to supporting your professional journey', 'font' => '/F1', 'size' => 9.5, 'leading' => 14],
            ['text' => 'and celebrating your milestones with Newton Academy.', 'font' => '/F1', 'size' => 9.5, 'leading' => 24],
            ['text' => 'Yours sincerely,', 'font' => '/F1', 'size' => 10, 'leading' => 16],
            ['text' => '', 'font' => '/F1', 'size' => 6, 'leading' => 6],
            ['text' => 'Ade Braimoh', 'font' => '/F2', 'size' => 11, 'leading' => 15],
            ['text' => 'Founder, Newton Academy', 'font' => '/F1', 'size' => 9.5, 'leading' => 14],
            ['text' => 'na@newtoncore.com', 'font' => '/F1', 'size' => 9, 'leading' => 30],
            ['text' => 'Newton Academy  |  Official Scholarship Award Letter  |  Reference: ' . $applicationId, 'font' => '/F1', 'size' => 8, 'leading' => 10]
        ];

        $stream = "BT\n55 780 Td\n";
        foreach ($lines as $item) {
            $font = $item['font'];
            $size = $item['size'];
            $leading = $item['leading'];
            $escaped = str_replace(['\\', '(', ')'], ['\\\\', '\\(', '\\)'], $item['text']);
            $stream .= "{$font} {$size} Tf\n{$leading} TL\n({$escaped}) Tj\nT*\n";
        }
        $stream .= "ET\n";

        $objects = [];
        $objects[] = '<< /Type /Catalog /Pages 2 0 R >>';
        $objects[] = '<< /Type /Pages /Kids [3 0 R] /Count 1 >>';
        $objects[] = '<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595.28 841.89] /Contents 6 0 R /Resources << /Font << /F1 4 0 R /F2 5 0 R >> >> >>';
        $objects[] = '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica /Encoding /WinAnsiEncoding >>';
        $objects[] = '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold /Encoding /WinAnsiEncoding >>';
        $objects[] = '<< /Length ' . strlen($stream) . " >>\nstream\n" . $stream . "endstream";

        $pdf = "%PDF-1.4\n";
        $offsets = [];
        foreach ($objects as $index => $objContent) {
            $offsets[] = strlen($pdf);
            $pdf .= ($index + 1) . " 0 obj\n" . $objContent . "\nendobj\n";
        }

        $xrefOffset = strlen($pdf);
        $pdf .= "xref\n0 " . (count($objects) + 1) . "\n0000000000 65535 f \n";
        foreach ($offsets as $offset) {
            $pdf .= sprintf("%010d 00000 n \n", $offset);
        }
        $pdf .= "trailer\n<< /Size " . (count($objects) + 1) . " /Root 1 0 R >>\nstartxref\n" . $xrefOffset . "\n%%EOF";

        return $pdf;
    }
}
