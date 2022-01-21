import CodeMirror from "codemirror";
import "codemirror/addon/display/autorefresh.js";
import "codemirror/mode/apl/apl.js";
import "codemirror/mode/asciiarmor/asciiarmor.js";
import "codemirror/mode/asn.1/asn.1.js";
import "codemirror/mode/asterisk/asterisk.js";
import "codemirror/mode/brainfuck/brainfuck.js";
import "codemirror/mode/clike/clike.js";
import "codemirror/mode/clojure/clojure.js";
import "codemirror/mode/cmake/cmake.js";
import "codemirror/mode/cobol/cobol.js";
import "codemirror/mode/coffeescript/coffeescript.js";
import "codemirror/mode/commonlisp/commonlisp.js";
import "codemirror/mode/crystal/crystal.js";
import "codemirror/mode/css/css.js";
import "codemirror/mode/cypher/cypher.js";
import "codemirror/mode/d/d.js";
import "codemirror/mode/dart/dart.js";
import "codemirror/mode/diff/diff.js";
import "codemirror/mode/django/django.js";
import "codemirror/mode/dockerfile/dockerfile.js";
import "codemirror/mode/dtd/dtd.js";
import "codemirror/mode/dylan/dylan.js";
import "codemirror/mode/ebnf/ebnf.js";
import "codemirror/mode/ecl/ecl.js";
import "codemirror/mode/eiffel/eiffel.js";
import "codemirror/mode/elm/elm.js";
import "codemirror/mode/erlang/erlang.js";
import "codemirror/mode/factor/factor.js";
import "codemirror/mode/fcl/fcl.js";
import "codemirror/mode/forth/forth.js";
import "codemirror/mode/fortran/fortran.js";
import "codemirror/mode/gas/gas.js";
import "codemirror/mode/gfm/gfm.js";
import "codemirror/mode/gherkin/gherkin.js";
import "codemirror/mode/go/go.js";
import "codemirror/mode/groovy/groovy.js";
import "codemirror/mode/haml/haml.js";
import "codemirror/mode/handlebars/handlebars.js";
import "codemirror/mode/haskell-literate/haskell-literate.js";
import "codemirror/mode/haskell/haskell.js";
import "codemirror/mode/haxe/haxe.js";
import "codemirror/mode/htmlembedded/htmlembedded.js";
import "codemirror/mode/htmlmixed/htmlmixed.js";
import "codemirror/mode/http/http.js";
import "codemirror/mode/idl/idl.js";
import "codemirror/mode/javascript/javascript.js";
import "codemirror/mode/jinja2/jinja2.js";
import "codemirror/mode/jsx/jsx.js";
import "codemirror/mode/julia/julia.js";
import "codemirror/mode/livescript/livescript.js";
import "codemirror/mode/lua/lua.js";
import "codemirror/mode/markdown/markdown.js";
import "codemirror/mode/mathematica/mathematica.js";
import "codemirror/mode/mbox/mbox.js";
import "codemirror/mode/meta.js";
import "codemirror/mode/mirc/mirc.js";
import "codemirror/mode/mllike/mllike.js";
import "codemirror/mode/modelica/modelica.js";
import "codemirror/mode/mscgen/mscgen.js";
import "codemirror/mode/mumps/mumps.js";
import "codemirror/mode/nginx/nginx.js";
import "codemirror/mode/nsis/nsis.js";
import "codemirror/mode/ntriples/ntriples.js";
import "codemirror/mode/octave/octave.js";
import "codemirror/mode/oz/oz.js";
import "codemirror/mode/pascal/pascal.js";
import "codemirror/mode/pegjs/pegjs.js";
import "codemirror/mode/perl/perl.js";
import "codemirror/mode/php/php.js";
import "codemirror/mode/pig/pig.js";
import "codemirror/mode/powershell/powershell.js";
import "codemirror/mode/properties/properties.js";
import "codemirror/mode/protobuf/protobuf.js";
import "codemirror/mode/pug/pug.js";
import "codemirror/mode/puppet/puppet.js";
import "codemirror/mode/python/python.js";
import "codemirror/mode/q/q.js";
import "codemirror/mode/r/r.js";
import "codemirror/mode/rpm/rpm.js";
import "codemirror/mode/rst/rst.js";
import "codemirror/mode/ruby/ruby.js";
import "codemirror/mode/rust/rust.js";
import "codemirror/mode/sas/sas.js";
import "codemirror/mode/sass/sass.js";
import "codemirror/mode/scheme/scheme.js";
import "codemirror/mode/shell/shell.js";
import "codemirror/mode/sieve/sieve.js";
import "codemirror/mode/slim/slim.js";
import "codemirror/mode/smalltalk/smalltalk.js";
import "codemirror/mode/smarty/smarty.js";
import "codemirror/mode/solr/solr.js";
import "codemirror/mode/soy/soy.js";
import "codemirror/mode/sparql/sparql.js";
import "codemirror/mode/spreadsheet/spreadsheet.js";
import "codemirror/mode/sql/sql.js";
import "codemirror/mode/stex/stex.js";
import "codemirror/mode/stylus/stylus.js";
import "codemirror/mode/swift/swift.js";
import "codemirror/mode/tcl/tcl.js";
import "codemirror/mode/textile/textile.js";
import "codemirror/mode/tiddlywiki/tiddlywiki.js";
import "codemirror/mode/tiki/tiki.js";
import "codemirror/mode/toml/toml.js";
import "codemirror/mode/tornado/tornado.js";
import "codemirror/mode/troff/troff.js";
import "codemirror/mode/ttcn-cfg/ttcn-cfg.js";
import "codemirror/mode/ttcn/ttcn.js";
import "codemirror/mode/turtle/turtle.js";
import "codemirror/mode/twig/twig.js";
import "codemirror/mode/vb/vb.js";
import "codemirror/mode/vbscript/vbscript.js";
import "codemirror/mode/velocity/velocity.js";
import "codemirror/mode/verilog/verilog.js";
import "codemirror/mode/vhdl/vhdl.js";
import "codemirror/mode/vue/vue.js";
import "codemirror/mode/wast/wast.js";
import "codemirror/mode/webidl/webidl.js";
import "codemirror/mode/xml/xml.js";
import "codemirror/mode/xquery/xquery.js";
import "codemirror/mode/yacas/yacas.js";
import "codemirror/mode/yaml-frontmatter/yaml-frontmatter.js";
import "codemirror/mode/yaml/yaml.js";
import "codemirror/mode/z80/z80.js";
import React, { useEffect, useRef, useState } from "react";
import {
	MirrorProvider,
	useAddComment,
	useGhost,
	useInitializeComments,
	useMirrorMode,
	useMirrorTheme,
	useSetReadOnly,
} from "../../hooks/mirror";

import {
	CODE_MIRROR_DEFAULTS,
	CODE_MIRROR_MODES,
	CODE_MIRROR_THEMES,
} from "../../util/constants";
import { OrderedListOfComments } from "../Comments/Comments";
import "./my-mirror.css";
import { ColorProvider, useInitializeColor } from "../../hooks/color";
import { CodeDropdown } from "../common/CodeDropdown";
import { CodeCommentButton } from "../CodeCommentButton/CodeCommentButton";
import { H1 } from "../common/Font";

function useInitializeMyMirror(container: React.RefObject<HTMLDivElement>) {
	const [myMirror, setMyMirror] = useState<CodeMirror.Editor | undefined>(
		undefined
	);
	useEffect(() => {
		if (container.current && !myMirror) {
			const m = CodeMirror(container.current, {
				value: CODE_MIRROR_DEFAULTS.VALUE,
				mode: CODE_MIRROR_DEFAULTS.MODE,
				theme: CODE_MIRROR_DEFAULTS.THEME,
				viewportMargin: Infinity,
				lineNumbers: false,
				autoRefresh: true,
				scrollbarStyle: "null",
				lineWrapping: true,
			});

			setMyMirror(m);
			setTimeout(() => m.refresh(), 10);
			setTimeout(() => m.refresh(), 50);
			setTimeout(() => m.refresh(), 100);
		}
	}, [container, myMirror]);
	return myMirror;
}

export function MyMirror() {
	const color = useInitializeColor();
	const container = useRef<HTMLDivElement>(null);

	const mymirror = useInitializeMyMirror(container);
	const [mirrorMode, onModeChange] = useMirrorMode(mymirror);
	const { theme, onThemeSelect } = useMirrorTheme(mymirror);

	useInitializeComments(mymirror);
	useGhost(mymirror);
	useAddComment(mymirror);
	useSetReadOnly(mymirror);

	return (
		<MirrorProvider value={mymirror}>
			<ColorProvider value={color}>
				<div
					id="export-region"
					className="flex flex-col items-center bg-white p-8"
				>
					<div className="w-full">
						<H1 contenteditable>Glossy helps you document your code</H1>
					</div>
					<div id="code-container" ref={container} className="w-full">
						<div className="flex flex-row justify-between items-baseline relative z-10 h-0 top-3 pl-3 pr-3 gap-x-1">
							<div className="flex flex-row grow gap-x-1">
								<CodeDropdown
									options={CODE_MIRROR_MODES}
									current={mirrorMode}
									onChange={onModeChange}
								/>
								<CodeDropdown
									options={CODE_MIRROR_THEMES}
									current={theme}
									onChange={onThemeSelect}
								/>
							</div>
							<div className="flex flex-row">
								<CodeCommentButton />
							</div>
						</div>
					</div>
					<OrderedListOfComments />
				</div>
			</ColorProvider>
		</MirrorProvider>
	);
}
