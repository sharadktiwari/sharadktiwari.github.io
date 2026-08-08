export async function loadMarkdown(path) {
  try {
    const response = await fetch(path);
    if (!response.ok) {
      throw new Error(`Failed to load markdown: ${path}`);
    }
    return response.text();
  } catch (error) {
    console.error(error);
    return null;
  }
}

function escapeHtml(text) {
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  };
  return text.replace(/[&<>"']/g, (m) => map[m]);
}

function parseInline(text) {
  let result = escapeHtml(text);
  result = result.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  result = result.replace(/\*(.*?)\*/g, '<em>$1</em>');
  result = result.replace(/\`([^`]+)\`/g, '<code>$1</code>');
  result = result.replace(/!\[([^\]]*)\]\(([^\)]+)\)/g, '<img src="$2" alt="$1" loading="lazy" />');
  result = result.replace(/\[([^\]]+)\]\(([^\)]+)\)/g, '<a href="$2" target="_blank" rel="noreferrer">$1</a>');
  return result;
}

export function markdownToHtml(markdown) {
  const lines = markdown.split('\n');
  const html = [];
  let inCode = false;
  let codeLang = '';
  let listType = null;
  let listOpen = false;
  let tableOpen = false;
  let tableHeader = false;

  function closeList() {
    if (listOpen) {
      html.push(`</${listType}>`);
      listOpen = false;
      listType = null;
    }
  }

  function closeTable() {
    if (tableOpen) {
      html.push('</tbody>');
      html.push('</table>');
      tableOpen = false;
      tableHeader = false;
    }
  }

  lines.forEach((rawLine) => {
    const line = rawLine.trimEnd();
    if (line.startsWith('```')) {
      if (!inCode) {
        inCode = true;
        codeLang = line.slice(3).trim();
        html.push(`<pre><code class="language-${codeLang}">`);
      } else {
        inCode = false;
        html.push('</code></pre>');
      }
      return;
    }

    if (inCode) {
      html.push(escapeHtml(line));
      return;
    }

    if (/^> \[!(NOTE|TIP|WARNING|CAUTION)\]/.test(line)) {
      closeList();
      closeTable();
      const type = line.match(/^> \[!(.*?)\]/)[1].toLowerCase();
      const content = line.replace(/^> \[!.*?\]\s*/, '');
      html.push(`<div class="callout callout-${type}"><p>${parseInline(content)}</p></div>`);
      return;
    }

    if (line.startsWith('> ')) {
      closeList();
      closeTable();
      html.push(`<blockquote>${parseInline(line.slice(2))}</blockquote>`);
      return;
    }

    const headingMatch = line.match(/^(#{1,6})\s+(.*)$/);
    if (headingMatch) {
      closeList();
      closeTable();
      const level = headingMatch[1].length;
      html.push(`<h${level}>${parseInline(headingMatch[2])}</h${level}>`);
      return;
    }

    if (/^\|.+\|$/.test(line) && line.includes('|')) {
      const cells = line.split('|').slice(1, -1).map((cell) => cell.trim());
      if (!tableOpen) {
        closeList();
        html.push('<table>');
        html.push('<thead>');
        html.push('<tr>');
        cells.forEach((cell) => html.push(`<th>${parseInline(cell)}</th>`));
        html.push('</tr>');
        html.push('</thead>');
        html.push('<tbody>');
        tableOpen = true;
        tableHeader = true;
      } else if (tableHeader) {
        tableHeader = false;
      } else {
        html.push('<tr>');
        cells.forEach((cell) => html.push(`<td>${parseInline(cell)}</td>`));
        html.push('</tr>');
      }
      return;
    }

    if (/^\d+\.\s+/.test(line)) {
      const item = line.replace(/^\d+\.\s+/, '');
      if (listType !== 'ol') {
        closeList();
        closeTable();
        listType = 'ol';
        html.push('<ol>');
        listOpen = true;
      }
      html.push(`<li>${parseInline(item)}</li>`);
      return;
    }

    if (/^[-*+]\s+/.test(line)) {
      const item = line.replace(/^[-*+]\s+/, '');
      if (listType !== 'ul') {
        closeList();
        closeTable();
        listType = 'ul';
        html.push('<ul>');
        listOpen = true;
      }
      html.push(`<li>${parseInline(item)}</li>`);
      return;
    }

    if (line === '') {
      closeList();
      closeTable();
      return;
    }

    closeTable();
    html.push(`<p>${parseInline(line)}</p>`);
  });

  closeList();
  closeTable();
  return html.join('');
}
