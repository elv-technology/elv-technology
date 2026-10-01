// Converts stored blog content (HTML string, plain text, or JSON sections) into HTML.
// Shared by the server page (which sanitizes the result) and the client component.
export const formatContent = (content: any) => {
    if (!content) return '';

    // Handle structured JSON sections from db.json or database
    if (typeof content === 'object' && content.sections) {
        let html = '';
        for (const sec of content.sections) {
            if (sec.type === 'paragraph') {
                html += `<p>${sec.content}</p>`;
            } else if (sec.type === 'heading') {
                html += `<h2><strong>${sec.title}</strong></h2>`;
            } else if (sec.type === 'list') {
                if (sec.title) html += `<h3><strong>${sec.title}</strong></h3>`;
                html += '<ul>';
                for (const item of (sec.items || [])) {
                    html += `<li>${item}</li>`;
                }
                html += '</ul>';
            }
        }
        return html;
    }

    const strContent = typeof content === 'string' ? content : String(content);

    // If it already strongly looks like HTML, return as-is
    if (/<[a-z][\s\S]*>/i.test(strContent)) {
        return strContent;
    }

    // Otherwise, parse plain text into HTML
    const lines = strContent.split('\n');
    let html = '';
    let inList = false;

    const isHeading = (text: string) => {
        if (text.endsWith('?')) return true;
        if (text.length < 100 && !text.endsWith('.') && !text.endsWith(',') && text.split(' ').length < 12) {
            return true;
        }
        return false;
    };

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim();

        if (!line) {
            if (inList) {
                html += '</ul>';
                inList = false;
            }
            html += '<br />';
            continue;
        }

        if (inList) {
            if (isHeading(line) || line.length > 150) {
                html += '</ul>';
                inList = false;
            } else {
                html += `<li>${line}</li>`;
                continue;
            }
        }

        const prevLine = i > 0 ? lines[i - 1].trim() : '';
        if (prevLine.endsWith(':') && line.length < 150 && !line.endsWith(':')) {
            html += '<ul>';
            html += `<li>${line}</li>`;
            inList = true;
            continue;
        }

        if (line.endsWith(':')) {
            html += `<h3><strong>${line}</strong></h3>`;
        } else if (line.endsWith('?') || isHeading(line)) {
            html += `<h2><strong>${line}</strong></h2>`;
        } else {
            html += `<p>${line}</p>`;
        }
    }

    if (inList) {
        html += '</ul>';
    }

    return html;
};
