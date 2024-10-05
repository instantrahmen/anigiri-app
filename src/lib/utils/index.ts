import hljs from 'highlight.js';
import markdownit from 'markdown-it';

export * from './shadcn';
export * from './date';
export * from './score';

export const clamp = (min: number, max: number, value: number) => {
	return Math.max(min, Math.min(max, value));
};

export const md: markdownit = markdownit({
	highlight: function (str, lang) {
		if (lang && hljs.getLanguage(lang)) {
			try {
				return (
					'<pre><code class="hljs">' +
					hljs.highlight(str, { language: lang, ignoreIllegals: true }).value +
					'</code></pre>'
				);
			} catch (_err) {
				// ignore
			}
		}

		return '<pre><code class="hljs">' + md.utils.escapeHtml(str) + '</code></pre>';
	},
});

export const stringifyList = (list: string[], includeAnd?: boolean, links?: string[]) => {
	return list
		.map((item, i) => {
			const link = links?.[i];
			const finalItem = link ? `<a href="${link}" target="_blank" rel="noreferrer">${item}</a>` : item;
			if (i == list.length - 1 && includeAnd) {
				return `and ${finalItem}`;
			} else {
				return finalItem;
			}
		})
		.join(', ');
};

export const capitalize = (str: string) => {
	return str.charAt(0).toUpperCase() + str.slice(1);
};

export const titleCase = (str: string) => {
	return str
		.split(' ')
		.map((word) => capitalize(word))
		.join(' ');
};
