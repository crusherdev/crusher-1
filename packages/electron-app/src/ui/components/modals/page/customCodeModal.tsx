import React, { RefObject, useEffect, useRef } from "react";
import { css } from "@emotion/react";
import { Conditional } from "@dyson/components/layouts";
import { Modal } from "@dyson/components/molecules/Modal";
import { ModalTopBar } from "../topBar";
import { Button } from "@dyson/components/atoms/button/Button";
import { performCustomCode } from "electron-app/src/ui/commands/perform";
import { iAction } from "@shared/types/action";
import { useStore } from "react-redux";
import { updateRecordedStep } from "electron-app/src/store/actions/recorder";
import { sendSnackBarEvent } from "../../toast";
import Editor, { Monaco } from "@monaco-editor/react";
import { loader } from "@monaco-editor/react";
import * as path from "path";

import LODASH_index from '!raw-loader!@types/lodash/index.d.ts';
import { typeMIne } from './type';

const theme = {
	rules: [
		{
			"background": "011627",
			"token": ""
		},
		{
			"foreground": "637777",
			"token": "comment"
		},
		{
			"foreground": "addb67",
			"token": "string"
		},
		{
			"foreground": "ecc48d",
			"token": "vstring.quoted"
		},
		{
			"foreground": "ecc48d",
			"token": "variable.other.readwrite.js"
		},
		{
			"foreground": "5ca7e4",
			"token": "string.regexp"
		},
		{
			"foreground": "5ca7e4",
			"token": "string.regexp keyword.other"
		},
		{
			"foreground": "5f7e97",
			"token": "meta.function punctuation.separator.comma"
		},
		{
			"foreground": "f78c6c",
			"token": "constant.numeric"
		},
		{
			"foreground": "f78c6c",
			"token": "constant.character.numeric"
		},
		{
			"foreground": "addb67",
			"token": "variable"
		},
		{
			"foreground": "ae6bda",
			"token": "keyword"
		},
		{
			"foreground": "ae6bda",
			"token": "punctuation.accessor"
		},
		{
			"foreground": "ae6bda",
			"token": "storage"
		},
		{
			"foreground": "ae6bda",
			"token": "meta.var.expr"
		},
		{
			"foreground": "ae6bda",
			"token": "meta.class meta.method.declaration meta.var.expr storage.type.jsm"
		},
		{
			"foreground": "ae6bda",
			"token": "storage.type.property.js"
		},
		{
			"foreground": "ae6bda",
			"token": "storage.type.property.ts"
		},
		{
			"foreground": "ae6bda",
			"token": "storage.type.property.tsx"
		},
		{
			"foreground": "82aaff",
			"token": "storage.type"
		},
		{
			"foreground": "ffcb8b",
			"token": "entity.name.class"
		},
		{
			"foreground": "ffcb8b",
			"token": "meta.class entity.name.type.class"
		},
		{
			"foreground": "addb67",
			"token": "entity.other.inherited-class"
		},
		{
			"foreground": "82aaff",
			"token": "entity.name.function"
		},
		{
			"foreground": "addb67",
			"token": "punctuation.definition.variable"
		},
		{
			"foreground": "d3423e",
			"token": "punctuation.section.embedded"
		},
		{
			"foreground": "d6deeb",
			"token": "punctuation.terminator.expression"
		},
		{
			"foreground": "d6deeb",
			"token": "punctuation.definition.arguments"
		},
		{
			"foreground": "d6deeb",
			"token": "punctuation.definition.array"
		},
		{
			"foreground": "d6deeb",
			"token": "punctuation.section.array"
		},
		{
			"foreground": "d6deeb",
			"token": "meta.array"
		},
		{
			"foreground": "d9f5dd",
			"token": "punctuation.definition.list.begin"
		},
		{
			"foreground": "d9f5dd",
			"token": "punctuation.definition.list.end"
		},
		{
			"foreground": "d9f5dd",
			"token": "punctuation.separator.arguments"
		},
		{
			"foreground": "d9f5dd",
			"token": "punctuation.definition.list"
		},
		{
			"foreground": "d3423e",
			"token": "string.template meta.template.expression"
		},
		{
			"foreground": "d6deeb",
			"token": "string.template punctuation.definition.string"
		},
		{
			"foreground": "ae6bda",
			"fontStyle": "italic",
			"token": "italic"
		},
		{
			"foreground": "addb67",
			"fontStyle": "bold",
			"token": "bold"
		},
		{
			"foreground": "82aaff",
			"token": "constant.language"
		},
		{
			"foreground": "82aaff",
			"token": "punctuation.definition.constant"
		},
		{
			"foreground": "82aaff",
			"token": "variable.other.constant"
		},
		{
			"foreground": "7fdbca",
			"token": "support.function.construct"
		},
		{
			"foreground": "7fdbca",
			"token": "keyword.other.new"
		},
		{
			"foreground": "82aaff",
			"token": "constant.character"
		},
		{
			"foreground": "82aaff",
			"token": "constant.other"
		},
		{
			"foreground": "f78c6c",
			"token": "constant.character.escape"
		},
		{
			"foreground": "addb67",
			"token": "entity.other.inherited-class"
		},
		{
			"foreground": "d7dbe0",
			"token": "variable.parameter"
		},
		{
			"foreground": "7fdbca",
			"token": "entity.name.tag"
		},
		{
			"foreground": "cc2996",
			"token": "punctuation.definition.tag.html"
		},
		{
			"foreground": "cc2996",
			"token": "punctuation.definition.tag.begin"
		},
		{
			"foreground": "cc2996",
			"token": "punctuation.definition.tag.end"
		},
		{
			"foreground": "addb67",
			"token": "entity.other.attribute-name"
		},
		{
			"foreground": "addb67",
			"token": "entity.name.tag.custom"
		},
		{
			"foreground": "82aaff",
			"token": "support.function"
		},
		{
			"foreground": "82aaff",
			"token": "support.constant"
		},
		{
			"foreground": "7fdbca",
			"token": "upport.constant.meta.property-value"
		},
		{
			"foreground": "addb67",
			"token": "support.type"
		},
		{
			"foreground": "addb67",
			"token": "support.class"
		},
		{
			"foreground": "addb67",
			"token": "support.variable.dom"
		},
		{
			"foreground": "7fdbca",
			"token": "support.constant"
		},
		{
			"foreground": "7fdbca",
			"token": "keyword.other.special-method"
		},
		{
			"foreground": "7fdbca",
			"token": "keyword.other.new"
		},
		{
			"foreground": "7fdbca",
			"token": "keyword.other.debugger"
		},
		{
			"foreground": "7fdbca",
			"token": "keyword.control"
		},
		{
			"foreground": "ae6bda",
			"token": "keyword.operator.comparison"
		},
		{
			"foreground": "ae6bda",
			"token": "keyword.control.flow.js"
		},
		{
			"foreground": "ae6bda",
			"token": "keyword.control.flow.ts"
		},
		{
			"foreground": "ae6bda",
			"token": "keyword.control.flow.tsx"
		},
		{
			"foreground": "ae6bda",
			"token": "keyword.control.ruby"
		},
		{
			"foreground": "ae6bda",
			"token": "keyword.control.module.ruby"
		},
		{
			"foreground": "ae6bda",
			"token": "keyword.control.class.ruby"
		},
		{
			"foreground": "ae6bda",
			"token": "keyword.control.def.ruby"
		},
		{
			"foreground": "ae6bda",
			"token": "keyword.control.loop.js"
		},
		{
			"foreground": "ae6bda",
			"token": "keyword.control.loop.ts"
		},
		{
			"foreground": "ae6bda",
			"token": "keyword.control.import.js"
		},
		{
			"foreground": "ae6bda",
			"token": "keyword.control.import.ts"
		},
		{
			"foreground": "ae6bda",
			"token": "keyword.control.import.tsx"
		},
		{
			"foreground": "ae6bda",
			"token": "keyword.control.from.js"
		},
		{
			"foreground": "ae6bda",
			"token": "keyword.control.from.ts"
		},
		{
			"foreground": "ae6bda",
			"token": "keyword.control.from.tsx"
		},
		{
			"foreground": "ffffff",
			"background": "ff2c83",
			"token": "invalid"
		},
		{
			"foreground": "ffffff",
			"background": "d3423e",
			"token": "invalid.deprecated"
		},
		{
			"foreground": "7fdbca",
			"token": "keyword.operator"
		},
		{
			"foreground": "ae6bda",
			"token": "keyword.operator.relational"
		},
		{
			"foreground": "ae6bda",
			"token": "keyword.operator.assignement"
		},
		{
			"foreground": "ae6bda",
			"token": "keyword.operator.arithmetic"
		},
		{
			"foreground": "ae6bda",
			"token": "keyword.operator.bitwise"
		},
		{
			"foreground": "ae6bda",
			"token": "keyword.operator.increment"
		},
		{
			"foreground": "ae6bda",
			"token": "keyword.operator.ternary"
		},
		{
			"foreground": "637777",
			"token": "comment.line.double-slash"
		},
		{
			"foreground": "cdebf7",
			"token": "object"
		},
		{
			"foreground": "ff5874",
			"token": "constant.language.null"
		},
		{
			"foreground": "d6deeb",
			"token": "meta.brace"
		},
		{
			"foreground": "ae6bda",
			"token": "meta.delimiter.period"
		},
		{
			"foreground": "d9f5dd",
			"token": "punctuation.definition.string"
		},
		{
			"foreground": "ff5874",
			"token": "constant.language.boolean"
		},
		{
			"foreground": "ffffff",
			"token": "object.comma"
		},
		{
			"foreground": "7fdbca",
			"token": "variable.parameter.function"
		},
		{
			"foreground": "80cbc4",
			"token": "support.type.vendor.property-name"
		},
		{
			"foreground": "80cbc4",
			"token": "support.constant.vendor.property-value"
		},
		{
			"foreground": "80cbc4",
			"token": "support.type.property-name"
		},
		{
			"foreground": "80cbc4",
			"token": "meta.property-list entity.name.tag"
		},
		{
			"foreground": "57eaf1",
			"token": "meta.property-list entity.name.tag.reference"
		},
		{
			"foreground": "f78c6c",
			"token": "constant.other.color.rgb-value punctuation.definition.constant"
		},
		{
			"foreground": "ffeb95",
			"token": "constant.other.color"
		},
		{
			"foreground": "ffeb95",
			"token": "keyword.other.unit"
		},
		{
			"foreground": "ae6bda",
			"token": "meta.selector"
		},
		{
			"foreground": "fad430",
			"token": "entity.other.attribute-name.id"
		},
		{
			"foreground": "80cbc4",
			"token": "meta.property-name"
		},
		{
			"foreground": "ae6bda",
			"token": "entity.name.tag.doctype"
		},
		{
			"foreground": "ae6bda",
			"token": "meta.tag.sgml.doctype"
		},
		{
			"foreground": "d9f5dd",
			"token": "punctuation.definition.parameters"
		},
		{
			"foreground": "ecc48d",
			"token": "string.quoted"
		},
		{
			"foreground": "ecc48d",
			"token": "string.quoted.double"
		},
		{
			"foreground": "ecc48d",
			"token": "string.quoted.single"
		},
		{
			"foreground": "addb67",
			"token": "support.constant.math"
		},
		{
			"foreground": "addb67",
			"token": "support.type.property-name.json"
		},
		{
			"foreground": "addb67",
			"token": "support.constant.json"
		},
		{
			"foreground": "c789d6",
			"token": "meta.structure.dictionary.value.json string.quoted.double"
		},
		{
			"foreground": "80cbc4",
			"token": "string.quoted.double.json punctuation.definition.string.json"
		},
		{
			"foreground": "ff5874",
			"token": "meta.structure.dictionary.json meta.structure.dictionary.value constant.language"
		},
		{
			"foreground": "d6deeb",
			"token": "variable.other.ruby"
		},
		{
			"foreground": "ecc48d",
			"token": "entity.name.type.class.ruby"
		},
		{
			"foreground": "ecc48d",
			"token": "keyword.control.class.ruby"
		},
		{
			"foreground": "ecc48d",
			"token": "meta.class.ruby"
		},
		{
			"foreground": "7fdbca",
			"token": "constant.language.symbol.hashkey.ruby"
		},
		{
			"foreground": "e0eddd",
			"background": "a57706",
			"fontStyle": "italic",
			"token": "meta.diff"
		},
		{
			"foreground": "e0eddd",
			"background": "a57706",
			"fontStyle": "italic",
			"token": "meta.diff.header"
		},
		{
			"foreground": "ef535090",
			"fontStyle": "italic",
			"token": "markup.deleted"
		},
		{
			"foreground": "a2bffc",
			"fontStyle": "italic",
			"token": "markup.changed"
		},
		{
			"foreground": "a2bffc",
			"fontStyle": "italic",
			"token": "meta.diff.header.git"
		},
		{
			"foreground": "a2bffc",
			"fontStyle": "italic",
			"token": "meta.diff.header.from-file"
		},
		{
			"foreground": "a2bffc",
			"fontStyle": "italic",
			"token": "meta.diff.header.to-file"
		},
		{
			"foreground": "219186",
			"background": "eae3ca",
			"token": "markup.inserted"
		},
		{
			"foreground": "d3201f",
			"token": "other.package.exclude"
		},
		{
			"foreground": "d3201f",
			"token": "other.remove"
		},
		{
			"foreground": "269186",
			"token": "other.add"
		},
		{
			"foreground": "ff5874",
			"token": "constant.language.python"
		},
		{
			"foreground": "82aaff",
			"token": "variable.parameter.function.python"
		},
		{
			"foreground": "82aaff",
			"token": "meta.function-call.arguments.python"
		},
		{
			"foreground": "b2ccd6",
			"token": "meta.function-call.python"
		},
		{
			"foreground": "b2ccd6",
			"token": "meta.function-call.generic.python"
		},
		{
			"foreground": "d6deeb",
			"token": "punctuation.python"
		},
		{
			"foreground": "addb67",
			"token": "entity.name.function.decorator.python"
		},
		{
			"foreground": "8eace3",
			"token": "source.python variable.language.special"
		},
		{
			"foreground": "82b1ff",
			"token": "markup.heading.markdown"
		},
		{
			"foreground": "ae6bda",
			"fontStyle": "italic",
			"token": "markup.italic.markdown"
		},
		{
			"foreground": "addb67",
			"fontStyle": "bold",
			"token": "markup.bold.markdown"
		},
		{
			"foreground": "697098",
			"token": "markup.quote.markdown"
		},
		{
			"foreground": "80cbc4",
			"token": "markup.inline.raw.markdown"
		},
		{
			"foreground": "ff869a",
			"token": "markup.underline.link.markdown"
		},
		{
			"foreground": "ff869a",
			"token": "markup.underline.link.image.markdown"
		},
		{
			"foreground": "d6deeb",
			"token": "string.other.link.title.markdown"
		},
		{
			"foreground": "d6deeb",
			"token": "string.other.link.description.markdown"
		},
		{
			"foreground": "82b1ff",
			"token": "punctuation.definition.string.markdown"
		},
		{
			"foreground": "82b1ff",
			"token": "punctuation.definition.string.begin.markdown"
		},
		{
			"foreground": "82b1ff",
			"token": "punctuation.definition.string.end.markdown"
		},
		{
			"foreground": "82b1ff",
			"token": "meta.link.inline.markdown punctuation.definition.string"
		},
		{
			"foreground": "7fdbca",
			"token": "punctuation.definition.metadata.markdown"
		},
		{
			"foreground": "82b1ff",
			"token": "beginning.punctuation.definition.list.markdown"
		}],
	colors: {
		"activityBar.background": "#333842",
		"activityBar.foreground": "#D7DAE0",
		"activityBarBadge.background": "#528BFF",
		"activityBarBadge.foreground": "#D7DAE0",
		"button.background": "#4D78CC",
		"button.foreground": "#FFFFFF",
		"button.hoverBackground": "#6087CF",
		"diffEditor.insertedTextBackground": "#00809B33",
		"dropdown.background": "#353b45",
		"dropdown.border": "#181A1F",
		"editorIndentGuide.activeBackground": "#626772",
		"editor.background": "#282C34",
		"editor.foreground": "#ABB2BF",
		"editor.lineHighlightBackground": "#99BBFF0A",
		"editor.selectionBackground": "#3E4451",
		"editorCursor.foreground": "#528BFF",
		"editor.findMatchHighlightBackground": "#528BFF3D",
		"editorGroup.background": "#21252B",
		"editorGroup.border": "#181A1F",
		"editorGroupHeader.tabsBackground": "#21252B",
		"editorIndentGuide.background": "#ABB2BF26",
		"editorLineNumber.foreground": "#636D83",
		"editorLineNumber.activeForeground": "#ABB2BF",
		"editorWhitespace.foreground": "#ABB2BF26",
		"editorRuler.foreground": "#ABB2BF26",
		"editorHoverWidget.background": "#21252B",
		"editorHoverWidget.border": "#181A1F",
		"editorSuggestWidget.background": "#21252B",
		"editorSuggestWidget.border": "#181A1F",
		"editorSuggestWidget.selectedBackground": "#2C313A",
		"editorWidget.background": "#21252B",
		"editorWidget.border": "#3A3F4B",
		"input.background": "#1B1D23",
		"input.border": "#181A1F",
		focusBorder: "#528BFF",
		"list.activeSelectionBackground": "#2C313A",
		"list.activeSelectionForeground": "#D7DAE0",
		"list.focusBackground": "#2C313A",
		"list.hoverBackground": "#2C313A66",
		"list.highlightForeground": "#D7DAE0",
		"list.inactiveSelectionBackground": "#2C313A",
		"list.inactiveSelectionForeground": "#D7DAE0",
		"notification.background": "#21252B",
		"pickerGroup.border": "#528BFF",
		"scrollbarSlider.background": "#4E566680",
		"scrollbarSlider.activeBackground": "#747D9180",
		"scrollbarSlider.hoverBackground": "#5A637580",
		"sideBar.background": "#21252B",
		"sideBarSectionHeader.background": "#333842",
		"statusBar.background": "#21252B",
		"statusBar.foreground": "#9DA5B4",
		"statusBarItem.hoverBackground": "#2C313A",
		"statusBar.noFolderBackground": "#21252B",
		"tab.activeBackground": "#282C34",
		"tab.activeForeground": "#D7DAE0",
		"tab.border": "#181A1F",
		"tab.inactiveBackground": "#21252B",
		"titleBar.activeBackground": "#21252B",
		"titleBar.activeForeground": "#9DA5B4",
		"titleBar.inactiveBackground": "#21252B",
		"titleBar.inactiveForeground": "#9DA5B4",
		"statusBar.debuggingForeground": "#FFFFFF",
		"extensionButton.prominentBackground": "#2BA143",
		"extensionButton.prominentHoverBackground": "#37AF4E",
		"badge.background": "#528BFF",
		"badge.foreground": "#D7DAE0",
		"peekView.border": "#528BFF",
		"peekViewResult.background": "#21252B",
		"peekViewResult.selectionBackground": "#2C313A",
		"peekViewTitle.background": "#1B1D23",
		"peekViewEditor.background": "#1B1D23",
	},
};
// you can change the source of the monaco files
function ensureFirstBackSlash(str) {
	return str.length > 0 && str.charAt(0) !== "/" ? "/" + str : str;
}

function uriFromPath(_path) {
	const pathName = path.resolve(_path).replace(/\\/g, "/");
	return encodeURI("file://" + ensureFirstBackSlash(pathName));
}

loader.config({
	paths: {
		vs: uriFromPath(path.join(__dirname, "../../node_modules/monaco-editor/min/vs")),
	},
});
interface iElementCustomScriptModalContent {
	isOpen: boolean;
	handleClose: () => void;

	// For editing
	stepIndex?: number;
	stepAction?: iAction;
}
const CustomCodeModal = (props: iElementCustomScriptModalContent) => {
	const { isOpen } = props;
	const store = useStore();

	const codeTextAreaRef = useRef(null as null | HTMLTextAreaElement);
	const handleLoad = React.useCallback(() => {
		// if (codeTextAreaRef.current) {
		// 	codeTextAreaRef.current!.value =
		// 		"async function validate(crusherSdk, ctx){\n  /* Write your custom code here. For more infromation \n     checkout SDK docs here at, https://docs.crusher.dev/sdk */\n\n\n}";
		// 	if (props.stepAction) {
		// 		codeTextAreaRef.current!.value = props.stepAction.payload.meta.script;
		// 	}
		// 	const editor = (window as any).CodeMirror.fromTextArea(codeTextAreaRef.current!, {
		// 		mode: "javascript",
		// 		lineNumbers: true,
		// 		extraKeys: { "Ctrl-Space": "autocomplete" },
		// 		theme: "material",
		// 	});
		// 	editor.on("change", handleScriptChange);
		// 	editor.getDoc().markText({ line: 0, ch: 0 }, { line: 1 }, { readOnly: true, inclusiveLeft: true });
		// 	editor.getDoc().markText({ line: 0, ch: 0 }, { line: 2 }, { readOnly: true, inclusiveLeft: true });
		// 	editor.getDoc().markText({ line: 5, ch: 0 }, { line: 5, ch: 1 }, { readOnly: true, inclusiveLeft: true, inclusiveRight: true });
		// }
	}, [props.stepAction, codeTextAreaRef.current]);

	React.useEffect(() => {
		handleLoad();
	}, [isOpen]);

	const handleScriptChange = async (cm: any, change: any) => {
		const script = cm.getValue();
		codeTextAreaRef.current!.value = script;
	};

	const runCustomCode = React.useCallback(() => {
		performCustomCode(codeTextAreaRef?.current.value);
		props.handleClose();
	}, [codeTextAreaRef]);

	const updateCustomCode = React.useCallback(() => {
		if (props.stepAction) {
			props.stepAction.payload.meta.script = codeTextAreaRef?.current.value;
			store.dispatch(updateRecordedStep({ ...props.stepAction }, props.stepIndex));
			sendSnackBarEvent({ type: "success", message: "Custom code updated" });
			props.handleClose();
		}
	}, [props.stepAction, codeTextAreaRef]);

	const isThereScriptOutput = true;

	const isThereScriptError = false;

	const handleEditorWillMount = (monaco: Monaco) => {
		console.log("Path is", window.location.href);

		monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
			target: monaco.languages.typescript.ScriptTarget.ES2020,
			allowSyntheticDefaultImports: true,
			allowNonTsExtensions: true,
			typeRoots: ["node_modules/@types"],
		});

	// extra libraries
		monaco.languages.typescript.typescriptDefaults.addExtraLib([
			'declare class Rectangle1 {',
			'    /**',
			'     * optional documentation for top function',
			'     */',
			'    static top: ValidationState;',
			'    static left()',
			'    static right()',
			'}' +
			' ' +
			'declare class CrusherRunnerActions {',
			'    static left()',
			'    static right()',
			'}'
			+
			`export type ValidationState = 'valid' | 'invalid';

export interface Validation {
  /** Whether the input should display its "valid" or "invalid" visual styling. */
  validationState?: ValidationState,
  /**
   * Whether user input is required on the input before form submission.
   * Often paired with the \`necessityIndicator\` prop to add a visual indicator to the input.
   */
  isRequired?: boolean
}`
		].join('\n'));
		 var libUri = 'ts:filename/facts.d.ts';
		// monaco.languages.typescript.javascriptDefaults.addExtraLib(libSource, libUri);
		//
		//  monaco.languages.typescript.javascriptDefaults.addExtraLib(libSource, libUri);
		monaco.languages.typescript.typescriptDefaults.addExtraLib(typeMIne, libUri);


		monaco.editor.defineTheme("my-theme", {
			base: "vs-dark",
			inherit: true,
			rules: [...theme.rules],
			colors: {
				...theme.colors,
				"editor.background": "#080809",

			},

		});
	};

	if (!isOpen) return null;

	return (
		<Modal modalStyle={modalStyle} onOutsideClick={props.handleClose}>
			<ModalTopBar title={"Custom code"} desc={"Write your own code for custom functionality"} closeModal={props.handleClose} />

			<div
				css={css`
					padding: 12rem 34rem;
					background: #080809;
					padding-left: 4rem;
					    border-bottom-left-radius: 12px;
					    		    border-bottom-right-radius: 12px;
				`}
			>
				<Editor
					height="300rem"
					defaultLanguage="typescript"
					beforeMount={handleEditorWillMount}
					theme={"my-theme"}
					options={{ minimap: { enabled: false } }}
					defaultValue={`async function validate(crusherSdk, ctx){
  /* Write your custom code here. For more infromation
     checkout SDK docs here at, https://docs.crusher.dev/sdk */

}`}
				/>

				<div css={bottomBarStyle}>
					<Button css={saveButtonStyle} onClick={props.stepAction ? updateCustomCode : runCustomCode}>
						{props.stepAction ? "Update" : "Save"}
					</Button>
				</div>
			</div>

			<style>{`
					.CodeMirror {
						font-size: 14rem;
						background-color: #050505 !important;
					}

			.CodeMirror-gutters {
				background: #0a0d0e !important;
				margin-right: 20rem;
			}

			.CodeMirror-line {
				padding-left: 12rem !important;
			}

			.CodeMirror-scroll {
				padding-top: 8rem;
			}

			`}</style>
		</Modal>
	);
};

const modalStyle = css`
	width: 800rem;
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -20%);
	display: flex;
	flex-direction: column;
	padding: 0rem;
	background: linear-gradient(0deg, rgba(0, 0, 0, 0.42), rgba(0, 0, 0, 0.42)), #111213;
`;

const containerCSS = css`
	padding-top: 1rem;
	position: relative;
`;
const validationStatusContainerCSS = css`
	position: absolute;
	right: 0.75rem;
	top: 1.5rem;
`;
const bottomBarStyle = css`
	display: flex;
	justify-content: flex-end;
	align-items: center;
	margin-top: 1.5rem;
`;
const saveButtonStyle = css`
	font-size: 14rem;
	margin-top: 16rem;
	padding: 10rem 32rem;
	text-align: center;
	color: #fff;
`;

export { CustomCodeModal };
