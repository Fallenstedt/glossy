export enum CALLOUT_TABS {
	PASTE_YOUR_CODE = "1. Paste Your Code",
	ANNOTATE = "2. Annotate",
	EXPORT = "3. Export",
	UNKNOWN = "Unknown",
}

export const CODE_MIRROR_MODES = [
	"apl",
	"asciiarmor",
	"asn.1",
	"asterisk",
	"brainfuck",
	"clike",
	"clojure",
	"cmake",
	"cobol",
	"coffeescript",
	"commonlisp",
	"crystal",
	"css",
	"cypher",
	"d",
	"dart",
	"diff",
	"django",
	"dockerfile",
	"dtd",
	"dylan",
	"ebnf",
	"ecl",
	"eiffel",
	"elm",
	"erlang",
	"factor",
	"fcl",
	"forth",
	"fortran",
	"gas",
	"gfm",
	"gherkin",
	"go",
	"groovy",
	"haml",
	"handlebars",
	"haskell",
	"haskell-literate",
	"haxe",
	"htmlembedded",
	"htmlmixed",
	"http",
	"idl",
	"javascript",
	"jinja2",
	"jsx",
	"julia",
	"livescript",
	"lua",
	"markdown",
	"mathematica",
	"mbox",
	"mirc",
	"mllike",
	"modelica",
	"mscgen",
	"mumps",
	"nginx",
	"nsis",
	"ntriples",
	"octave",
	"oz",
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
	"rpm",
	"rst",
	"ruby",
	"rust",
	"sas",
	"sass",
	"scheme",
	"shell",
	"sieve",
	"slim",
	"smalltalk",
	"smarty",
	"solr",
	"soy",
	"sparql",
	"spreadsheet",
	"sql",
	"stex",
	"stylus",
	"swift",
	"tcl",
	"textile",
	"tiddlywiki",
	"tiki",
	"toml",
	"tornado",
	"troff",
	"ttcn",
	"ttcn-cfg",
	"turtle",
	"typescript",
	"twig",
	"vb",
	"vbscript",
	"velocity",
	"verilog",
	"vhdl",
	"vue",
	"wast",
	"webidl",
	"xml",
	"xquery",
	"yacas",
	"yaml",
	"yaml-frontmatter",
	"z80",
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

array.reduce(reducer);
	`,
};
