export const FOCUS_RING_CLASS =
	"focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-gray-800 focus:ring-offset-gray-100 focus:ring-indigo-500";
export const DEFAULT_COLOR = "#9AD4DD";
export enum CALLOUT_TABS {
	PASTE_YOUR_CODE = "1. Edit",
	ANNOTATE = "2. Annotate",
	EXPORT = "3. Export",
	UNKNOWN = "Unknown",
}

export const CODE_MIRROR_MODES = [
	"clike",
	"clojure",
	"cmake",
	"cobol",
	"css",
	"dart",
	"diff",
	"django",
	"dockerfile",
	"elm",
	"erlang",
	"forth",
	"fortran",
	"go",
	"groovy",
	"haml",
	"handlebars",
	"haskell",
	"haskell-literate",
	"javascript",
	"typescript",
	"jsx",
	"julia",
	"livescript",
	"lua",
	"markdown",
	"nginx",
	"pascal",
	"pegjs",
	"perl",
	"php",
	"pig",
	"powershell",
	"properties",
	"protobuf",
	"pug",
	"puppet",
	"python",
	"q",
	"r",
	"ruby",
	"rust",
	"sass",
	"scheme",
	"shell",
	"spreadsheet",
	"sql",
	"swift",
	"toml",
	"vb",
	"vbscript",
	"velocity",
	"verilog",
	"vue",
	"xml",
	"yaml",
	"yaml-frontmatter",
];

export const CODE_MIRROR_THEMES = [
	"3024-day",
	"3024-night",
	"abbott",
	"abcdef",
	"ambiance-mobile",
	"ambiance",
	"ayu-dark",
	"ayu-mirage",
	"base16-dark",
	"base16-light",
	"bespin",
	"blackboard",
	"cobalt",
	"colorforth",
	"darcula",
	"dracula",
	"duotone-dark",
	"duotone-light",
	"eclipse",
	"elegant",
	"erlang-dark",
	"gruvbox-dark",
	"hopscotch",
	"icecoder",
	"idea",
	"isotope",
	"juejin",
	"lesser-dark",
	"liquibyte",
	"lucario",
	"material-darker",
	"material-ocean",
	"material-palenight",
	"material",
	"mbo",
	"mdn-like",
	"midnight",
	"monokai",
	"moxer",
	"neat",
	"neo",
	"night",
	"nord",
	"oceanic-next",
	"panda-syntax",
	"paraiso-dark",
	"paraiso-light",
	"pastel-on-dark",
	"railscasts",
	"rubyblue",
	"seti",
	"shadowfox",
	"solarized",
	"ssms",
	"the-matrix",
	"tomorrow-night-bright",
	"tomorrow-night-eighties",
	"ttcn",
	"twilight",
	"vibrant-ink",
	"xq-dark",
	"xq-light",
	"yeti",
	"yonce",
	"zenburn",
];

export const CODE_MIRROR_DEFAULTS = {
	THEME: "base16-light",
	// THEME:
	// 	CODE_MIRROR_THEMES[
	// 		Math.round(Math.random() * CODE_MIRROR_THEMES.length - 1)
	// 	] ?? "dracula",
	MODE: "javascript",
	VALUE: `const array = [15, 16, 17, 18, 19];

function reducer(previous, current, index, array) {
	const returns = previous + current;
	console.log(
				\`previous: \${previous},  
					current: \${current}, index: \${index}, 
					returns: \${returns}\`
				);
	return returns;
}

array.reduce(reducer);`,
};
