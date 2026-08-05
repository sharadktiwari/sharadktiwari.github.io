const modalSelector = '[data-modal]';
const openSelector = '[data-modal-open]';
const closeSelector = '[data-modal-close]';

export function initModal() {
  document.addEventListener('click', (event) => {
    const openTrigger = event.target.closest(openSelector);
    const closeTrigger = event.target.closest(closeSelector);
    if (openTrigger) {
      const targetId = openTrigger.dataset.modalOpen;
      openModal(targetId);
    }
    if (closeTrigger) {
      const modal = event.target.closest(modalSelector);
      closeModal(modal);
    }
  });
}

export function openModal(id) {
  const modal = document.querySelector(`[data-modal="${id}"]`);
  if (!modal) return;
  modal.classList.add('is-active');
  document.body.classList.add('modal-open');
}

export function closeModal(modal) {
  if (!modal) return;
  modal.classList.remove('is-active');
  document.body.classList.remove('modal-open');
}
