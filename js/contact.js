export function initContactForm() {
  const form = document.querySelector('[data-contact-form]');
  if (!form) return;

  const statusText = form.querySelector('[data-form-status]');
  form.addEventListener('submit', (event) => {
    const formData = new FormData(form);
    const message = validateContactForm(formData);

    if (message) {
      event.preventDefault();
      displayFormStatus(statusText, message, 'error');
      return;
    }

    event.preventDefault();
    sendMail(formData);
    displayFormStatus(statusText, 'Opening your email client. Please send the message from there.', 'success');
  });

  function sendMail(formData) {
    const recipient = 'sharadktiwari2000@gmail.com';
    const subject = encodeURIComponent('AI project inquiry from portfolio');
    const bodyLines = [
      `Name: ${formData.get('name')}`,
      `Email: ${formData.get('email')}`,
      `Industry: ${formData.get('industry')}`,
      `Project type: ${formData.get('projectType')}`,
      `Timeline: ${formData.get('timeline') || 'Not specified'}`,
      `Budget: ${formData.get('budget') || 'Not specified'}`,
      '',
      'Project overview:',
      `${formData.get('message')}`
    ];
    const body = encodeURIComponent(bodyLines.join('\r\n'));
    const mailtoUrl = `mailto:${recipient}?subject=${subject}&body=${body}`;
    window.open(mailtoUrl, '_blank');
  }
}

function validateContactForm(formData) {
  const name = formData.get('name')?.toString().trim();
  const email = formData.get('email')?.toString().trim();
  const message = formData.get('message')?.toString().trim();
  const industry = formData.get('industry')?.toString().trim();
  const projectType = formData.get('projectType')?.toString().trim();

  if (!name || !email || !industry || !projectType || !message) {
    return 'Please complete all required fields to help me understand your project.';
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return 'Please enter a valid email address.';
  }

  return null;
}

function displayFormStatus(element, message, type) {
  if (!element) return;
  element.textContent = message;
  element.classList.toggle('status-success', type === 'success');
  element.classList.toggle('status-error', type === 'error');
}
