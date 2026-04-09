const themeSelect = document.getElementById('theme');
const copyBtn = document.getElementById('copy-btn');
const downloadBtn = document.getElementById('download-btn');
const table = document.getElementById('data-table');

// Handle Theme Change Live
if (themeSelect) {
    themeSelect.addEventListener('change', (e) => {
        document.body.className = e.target.value;
    });
}

// Ensure the theme matches the current selected default
window.addEventListener('DOMContentLoaded', () => {
    if (themeSelect) {
        document.body.className = themeSelect.value;
    }
});

// Copy to clipboard functionality
if (copyBtn) {
    copyBtn.addEventListener('click', () => {
        if (!table) return;

        // We get rows, avoiding empty state rows
        const rows = table.querySelectorAll('tbody tr:not(.empty-row)');
        if (rows.length === 0) {
            alert('No data to copy!');
            return;
        }

        let textToCopy = 'ID\tName\tRole\tSkills\tTheme\tTime\n';
        rows.forEach(row => {
            const cells = row.querySelectorAll('td');
            const rowData = Array.from(cells).map(cell => cell.textContent).join('\t');
            textToCopy += rowData + '\n';
        });

        navigator.clipboard.writeText(textToCopy).then(() => {
            const originalText = copyBtn.innerHTML;
            copyBtn.innerHTML = '✅ Copied!';
            setTimeout(() => copyBtn.innerHTML = originalText, 2000);
        });
    });
}

// Download CSV functionality
if (downloadBtn) {
    downloadBtn.addEventListener('click', () => {
        if (!table) return;

        const rows = table.querySelectorAll('tbody tr:not(.empty-row)');
        if (rows.length === 0) {
            alert('No data to download!');
            return;
        }

        let csvContent = 'ID,Name,Role,Skills,Theme,Time\n';
        rows.forEach(row => {
            const cells = row.querySelectorAll('td');
            // Escape commas in names/skills
            const rowData = Array.from(cells).map(cell => `"${cell.textContent}"`).join(',');
            csvContent += rowData + '\n';
        });

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);

        link.setAttribute('href', url);
        link.setAttribute('download', 'database_records.csv');
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    });
}