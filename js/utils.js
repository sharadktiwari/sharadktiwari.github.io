export async function loadJSON(path) {
  try {
    const response = await fetch(path);
    if (!response.ok) {
      throw new Error(`Failed to load JSON: ${path}`);
    }
    return response.json();
  } catch (error) {
    console.error(error);
    return null;
  }
}

export function createElement(tag, attributes = {}, children = []) {
  const element = document.createElement(tag);
  Object.entries(attributes).forEach(([key, value]) => {
    if (key === 'className') {
      element.className = value;
      return;
    }
    if (key.startsWith('data-')) {
      element.setAttribute(key, value);
      return;
    }
    element[key] = value;
  });

  children.forEach((child) => {
    if (typeof child === 'string') {
      element.appendChild(document.createTextNode(child));
    } else if (child) {
      element.appendChild(child);
    }
  });

  return element;
}

export function getCurrentPage() {
  return document.body.dataset.page || 'home';
}

export function scrollToElement(target) {
  const element = document.querySelector(target);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}
