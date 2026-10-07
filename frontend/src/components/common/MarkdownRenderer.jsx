import React from 'react';

/**
 * Beautiful, lightweight Markdown renderer for ChatGPT-style responses.
 * Renders headers, tables, bold text, lists, code, and quotes with zero external dependencies.
 */
export const MarkdownRenderer = ({ content = '' }) => {
  if (!content) return null;

  const lines = content.split('\n');
  const elements = [];
  let tableRows = [];
  let inTable = false;
  let inList = false;
  let listItems = [];
  let isNumbered = false;

  const parseInline = (text) => {
    if (!text) return '';

    // Split text by bold, italic, code tokens
    // Match **bold**, *italic*, `code`, and plain text
    const tokens = [];
    let remaining = text;

    while (remaining.length > 0) {
      // Bold: **text**
      const boldMatch = remaining.match(/\*\*(.+?)\*\*/);
      // Inline Code: `code`
      const codeMatch = remaining.match(/`(.+?)`/);
      // Italic: *text* (when not preceded/followed by *)
      const italicMatch = remaining.match(/(?<!\*)\*([^*]+?)\*(?!\*)/);

      // Find earliest match
      let firstMatch = null;
      let matchType = null;
      let matchIndex = Infinity;

      if (boldMatch && boldMatch.index < matchIndex) {
        firstMatch = boldMatch;
        matchType = 'bold';
        matchIndex = boldMatch.index;
      }
      if (codeMatch && codeMatch.index < matchIndex) {
        firstMatch = codeMatch;
        matchType = 'code';
        matchIndex = codeMatch.index;
      }
      if (italicMatch && italicMatch.index < matchIndex) {
        firstMatch = italicMatch;
        matchType = 'italic';
        matchIndex = italicMatch.index;
      }

      if (!firstMatch) {
        tokens.push(remaining);
        break;
      }

      // Add text before match
      if (firstMatch.index > 0) {
        tokens.push(remaining.substring(0, firstMatch.index));
      }

      // Add formatted element
      if (matchType === 'bold') {
        tokens.push(<strong key={tokens.length} className="font-bold text-slate-900">{firstMatch[1]}</strong>);
      } else if (matchType === 'code') {
        tokens.push(
          <code key={tokens.length} className="px-1.5 py-0.5 rounded bg-slate-100 text-indigo-700 font-mono text-xs font-semibold">
            {firstMatch[1]}
          </code>
        );
      } else if (matchType === 'italic') {
        tokens.push(<em key={tokens.length} className="italic text-slate-600">{firstMatch[1]}</em>);
      }

      remaining = remaining.substring(firstMatch.index + firstMatch[0].length);
    }

    return tokens;
  };

  const flushList = () => {
    if (listItems.length > 0) {
      if (isNumbered) {
        elements.push(
          <ol key={`ol-${elements.length}`} className="list-decimal list-inside space-y-1.5 my-2 pl-2 text-slate-700 text-xs sm:text-sm">
            {listItems.map((item, idx) => (
              <li key={idx} className="leading-relaxed">
                {parseInline(item)}
              </li>
            ))}
          </ol>
        );
      } else {
        elements.push(
          <ul key={`ul-${elements.length}`} className="space-y-1.5 my-2 pl-1 text-slate-700 text-xs sm:text-sm">
            {listItems.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2 leading-relaxed">
                <span className="text-indigo-500 font-bold mt-1 text-xs">•</span>
                <span>{parseInline(item)}</span>
              </li>
            ))}
          </ul>
        );
      }
      listItems = [];
      inList = false;
    }
  };

  const flushTable = () => {
    if (tableRows.length > 0) {
      const headerRow = tableRows[0];
      const dataRows = tableRows.slice(1).filter((r) => !r.every((c) => /^:?-+:?$/.test(c.trim())));

      elements.push(
        <div key={`table-${elements.length}`} className="overflow-x-auto my-3 rounded-xl border border-slate-200">
          <table className="min-w-full divide-y divide-slate-200 text-xs">
            <thead className="bg-slate-50">
              <tr>
                {headerRow.map((cell, cIdx) => (
                  <th key={cIdx} className="px-3.5 py-2.5 text-left font-bold text-slate-800 uppercase tracking-wider text-[11px]">
                    {parseInline(cell.trim())}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-slate-100">
              {dataRows.map((row, rIdx) => (
                <tr key={rIdx} className={rIdx % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'}>
                  {row.map((cell, cIdx) => (
                    <td key={cIdx} className="px-3.5 py-2 text-slate-700 font-medium">
                      {parseInline(cell.trim())}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
      tableRows = [];
      inTable = false;
    }
  };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();

    // Check Table Row
    if (line.startsWith('|') && line.endsWith('|')) {
      if (inList) flushList();
      inTable = true;
      const cells = line.split('|').slice(1, -1);
      tableRows.push(cells);
      continue;
    } else if (inTable) {
      flushTable();
    }

    // Check Divider
    if (line === '---' || line === '***' || line === '___') {
      if (inList) flushList();
      elements.push(<hr key={`hr-${elements.length}`} className="my-3 border-slate-200" />);
      continue;
    }

    // Check Headings
    if (line.startsWith('### ')) {
      if (inList) flushList();
      elements.push(
        <h3 key={`h3-${elements.length}`} className="text-base sm:text-lg font-extrabold text-slate-900 mt-3 mb-1.5 flex items-center gap-1.5">
          {parseInline(line.replace('### ', ''))}
        </h3>
      );
      continue;
    }

    if (line.startsWith('#### ')) {
      if (inList) flushList();
      elements.push(
        <h4 key={`h4-${elements.length}`} className="text-xs sm:text-sm font-bold text-indigo-700 uppercase tracking-wider mt-2.5 mb-1">
          {parseInline(line.replace('#### ', ''))}
        </h4>
      );
      continue;
    }

    // Check Blockquote
    if (line.startsWith('> ')) {
      if (inList) flushList();
      elements.push(
        <blockquote key={`quote-${elements.length}`} className="border-l-3 border-indigo-500 bg-indigo-50/40 px-3.5 py-2 my-2 rounded-r-lg text-xs sm:text-sm text-slate-700 italic">
          {parseInline(line.replace('> ', ''))}
        </blockquote>
      );
      continue;
    }

    // Check Bullet List
    if (line.startsWith('* ') || line.startsWith('- ')) {
      if (inList && isNumbered) flushList();
      inList = true;
      isNumbered = false;
      listItems.push(line.substring(2));
      continue;
    }

    // Check Numbered List
    const numMatch = line.match(/^(\d+)\.\s+(.+)/);
    if (numMatch) {
      if (inList && !isNumbered) flushList();
      inList = true;
      isNumbered = true;
      listItems.push(numMatch[2]);
      continue;
    }

    // Regular line
    if (inList) flushList();

    if (line.length > 0) {
      elements.push(
        <p key={`p-${elements.length}`} className="text-xs sm:text-sm text-slate-700 leading-relaxed my-1.5">
          {parseInline(line)}
        </p>
      );
    }
  }

  if (inList) flushList();
  if (inTable) flushTable();

  return <div className="space-y-1">{elements}</div>;
};

export default MarkdownRenderer;
