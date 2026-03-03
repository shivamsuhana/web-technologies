// 1. Inject the form into the container
const formContainer = document.getElementById('form-container');
formContainer.innerHTML = `
  <form id="myForm" style="display: flex; flex-direction: column; gap: 15px; width: 300px;">
    <h2>Register</h2>

    <label>Name: <input type="text" name="name" required></label>

    <fieldset>
      <legend>Role:</legend>
      <label><input type="radio" name="role" value="Developer" required> Developer</label>
      <label><input type="radio" name="role" value="Designer"> Designer</label>
    </fieldset>

    <fieldset>
      <legend>Skills:</legend>
      <label><input type="checkbox" name="skills" value="HTML"> HTML</label>
      <label><input type="checkbox" name="skills" value="CSS"> CSS</label>
      <label><input type="checkbox" name="skills" value="JS"> JavaScript</label>
    </fieldset>

    <label>Theme: 
      <select name="theme">
        <option value="light">Light Mode</option>
        <option value="dark">Dark Mode</option>
      </select>
    </label>

    <button type="submit">Submit Form</button>
  </form>
`;

// 2. Handle the Form Submission
const form = document.getElementById('myForm');
const outputDiv = document.getElementById('output-div');

form.addEventListener('submit', function(event) {
  // Prevent the page from reloading
  event.preventDefault(); 

  // Gather all data from the form
  const formData = new FormData(form);
  
  // Start building the output HTML
  let outputHTML = '<h3>Submitted Data:</h3><ul>';
  
  // Loop through the data and format it
  for (let [key, value] of formData.entries()) {
    outputHTML += `<li><strong>${key}:</strong> ${value}</li>`;
  }
  
  outputHTML += '</ul>';

  // "Print" the result into the div
  outputDiv.innerHTML = outputHTML;
});