vscode.workspace.openTextDocument( {
	language: 'text'
} )
.then( doc => vscode.window.showTextDocument( doc ) )
.then( editor => {
	let editBuilder = textEdit => {
		textEdit.insert( new vscode.Position( 0, 0 ), String( content ) );
	};

	return editor.edit( editBuilder, {
			undoStopBefore: true,
			undoStopAfter: false
		} )
		.then( () => editor );
} );