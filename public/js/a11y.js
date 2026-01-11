/**
 * A11y Enhancement Script
 * Updates aria-expanded state for CSS-only accordions (Checkbox Hack)
 * Enhances accessibility for screen readers
 */
document.addEventListener('DOMContentLoaded', () => {
  // Handle all toggle inputs (accordions, expandable cards)
  document.querySelectorAll('.toggle-input').forEach(input => {
    const label = document.querySelector(`label[for="${input.id}"]`);
    if (label) {
      // Set initial aria-expanded state
      label.setAttribute('aria-expanded', input.checked ? 'true' : 'false');
      label.setAttribute('role', 'button');
      
      // Update on change
      input.addEventListener('change', () => {
        label.setAttribute('aria-expanded', input.checked ? 'true' : 'false');
      });
    }
  });
  
  // Add keyboard support for Enter key on labels
  document.querySelectorAll('label[for]').forEach(label => {
    if (label.getAttribute('role') === 'button') {
      label.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          const input = document.getElementById(label.getAttribute('for'));
          if (input && input.type === 'checkbox') {
            input.checked = !input.checked;
            input.dispatchEvent(new Event('change'));
          }
        }
      });
    }
  });
});
