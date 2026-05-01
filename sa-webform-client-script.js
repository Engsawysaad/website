/**
 * Client Script for SA Web Form
 * Injects the Flow Soft theme CSS into the page
 * 
 * Installation:
 * 1. Go to Website > Web Form > SA
 * 2. Add this code in the "Client Script" field
 * 3. Or add via Website Settings > Custom Scripts
 */
frappe.ready(function() {
    // Check if CSS is already loaded
    if ($('link[href*="sa-webform.css"]').length === 0) {
        // Inject the CSS file
        $('head').append('<link rel="stylesheet" href="/files/sa-webform.css">');
    }
    
    // Ensure fonts are loaded (fallback if not in HTML head)
    if ($('link[href*="fonts.googleapis.com"]').length === 0) {
        $('head').append('<link rel="preconnect" href="https://fonts.googleapis.com">');
        $('head').append('<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>');
        $('head').append('<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Space+Grotesk:wght@500;600;700&display=swap" rel="stylesheet">');
    }
});
