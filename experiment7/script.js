const form = document.getElementById('myForm');
const dataTableBody = document.querySelector('#data-table tbody');
const dataTable = document.getElementById('data-table');
const themeSelect = document.getElementById('theme');
const copyBtn = document.getElementById('copy-btn');
const downloadBtn = document.getElementById('download-btn');

// Array to store data objects
let records = [];

// Handle Theme Change live
themeSelect.addEventListener('change', (e) => {
  document.body.className = e.target.value;
});

// Handle Form Submit
form.addEventListener('submit', (e) => {
  e.preventDefault();
  
  const formData = new FormData(form);
  const now = new Date();
  const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  
  // Extract values
  const name = formData.get('name');
  const role = formData.get('role');
  const skills = formData.getAll('skills').join(', ') || 'None';
  const theme = formData.get('theme');

  // Change body theme if user selects a new one based on submission
  document.body.className = theme;
  themeSelect.value = theme; // Keep select synced

  const record = { name, role, skills, theme, time: timeString };
  records.push(record);

  // Update UI
  renderTable();
  form.reset();
  
  // Keep theme selected after reset
  themeSelect.value = theme;
  
  // Add quick visual feedback on button
  const submitBtn = form.querySelector('.submit-btn span');
  const originalText = submitBtn.innerText;
  submitBtn.innerText = 'Added!';
  setTimeout(() => submitBtn.innerText = originalText, 1500);
});

// Render Table from Records
function renderTable() {
  if (records.length > 0) {
    dataTable.classList.add('has-data');
  }

  dataTableBody.innerHTML = '';
  records.forEach(record => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td><strong>${record.name}</strong></td>
      <td>${record.role}</td>
      <td>${record.skills}</td>
      <td><span style="padding:4px 8px;border-radius:12px;background:var(--input-bg);font-size:0.8rem">${record.theme}</span></td>
      <td style="color:var(--text-muted);font-size:0.9rem">${record.time}</td>
    `;
    dataTableBody.appendChild(tr);
  });
}

// Format Records for Clipboard/CSV
function getFormattedData(separator = '\t') {
  const headers = ['Name', 'Role', 'Skills', 'Theme', 'Time'];
  let result = headers.join(separator) + '\n';
  
  records.forEach(r => {
    // Escape quotes for CSV if needed
    const row = [r.name, r.role, r.skills, r.theme, r.time].map(val => {
      let str = String(val);
      if (str.includes(separator) || str.includes('\"') || str.includes('\n')) {
        str = '"' + str.replace(/"/g, '""') + '"';
      }
      return str;
    });
    result += row.join(separator) + '\n';
  });
  
  return result;
}

// Copy to Clipboard
copyBtn.addEventListener('click', async () => {
  if (records.length === 0) {
    alert("No data to copy.");
    return;
  }
  
  const textToCopy = getFormattedData('\t');
  
  try {
    await navigator.clipboard.writeText(textToCopy);
    const originalText = copyBtn.innerText;
    copyBtn.innerText = '✅ Copied!';
    setTimeout(() => copyBtn.innerText = originalText, 2000);
  } catch (err) {
    console.error('Failed to copy: ', err);
    alert('Failed to copy data.');
  }
});

// Download CSV
downloadBtn.addEventListener('click', () => {
  if (records.length === 0) {
    alert("No data to download.");
    return;
  }

  const csvContent = getFormattedData(',');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  
  // Create object URL and download link
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', 'records_export.csv');
  link.style.visibility = 'hidden';
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
});
