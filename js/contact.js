export function initContactForm() {
  const form = document.querySelector('[data-contact-form]');
  if (!form) return;

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(form);
    const message = validateContactForm(formData);
    if (message) {
      form.querySelector('[data-form-status]').textContent = message;
      return;
    }
    form.reset();
    form.querySelector('[data-form-status]').textContent = 'Message sent. Thank you.';
  });
}

function validateContactForm(formData) {
  const name = formData.get('name')?.toString().trim();
  const email = formData.get('email')?.toString().trim();
  const message = formData.get('message')?.toString().trim();

  if (!name || !email || !message) {
    return 'Please complete all required fields.';
  }
  if (!email.includes('@')) {
    return 'Please enter a valid email address.';
  }
  return null;
}
