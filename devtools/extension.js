

const vscode = require('vscode');
const open = require('open')
const { readFile } = require('fs').promises;
const fs = require('fs')


/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	
	console.log('Congratulations, your extension "devtools" is now active!');		

	//automatic timer
	var time = new Date()
	global.start_hours = time.getHours()         
	global.start_minutes = time.getMinutes();     
	global.start_seconds = time.getSeconds();



	let disposable = vscode.commands.registerCommand('devtools.helloWorld', function () {
		
		vscode.window.showInformationMessage('Hi!, DevTools is now activated!');
	});

	context.subscriptions.push(disposable);

	let start_timer = vscode.commands.registerCommand('start.timer', function () {
		
		const today = new Date();

		console.log(today)

		global.hours = today.getHours();         
		global.minutes = today.getMinutes();     
		global.seconds = today.getSeconds();     
		global.time = global.hours + ": " + global.minutes + ": " + global.seconds
		console.log(global.time)
		vscode.window.showInformationMessage("The timer has started!");
		global.started = 1

		console.log("started: " +global.started)
	});

	context.subscriptions.push(start_timer);

	let end_timer = vscode.commands.registerCommand('end.timer', async function () {
		if (global.started == 1){
			const today = new Date();

			var hours_end = today.getHours();         
			var minutes_end = today.getMinutes();     
			var seconds_end = today.getSeconds();     

			var hours_elapsed = Math.abs(hours_end - global.hours)
			var minutes_elapsed = Math.abs(minutes_end - global.minutes)
			var seconds_elapsed = Math.abs(seconds_end - global.seconds)
			
			var time_elapsed = hours_elapsed + ": " + minutes_elapsed + ": " + seconds_elapsed
			console.log("time elapsed :" + time_elapsed)

			vscode.window.showInformationMessage("Your Current Session was: " + time_elapsed + " \ great work!");
			
			
			global.started = 0
			
			var  name = await vscode.window.showInputBox({
				placeHolder: 'Enter the name of your Current session',
				prompt: 'Session name'
			})

			content = `\n Completed a session of ${time_elapsed} at ${hours_end}:${minutes_end}:${seconds_end} session-name: ${name} `
			global.history += content
			fs.appendFile('time_log.txt', content, function (err) {
				if (err) throw err;
				console.log('File is created successfully.');
			  });
			
			vscode.window.showInformationMessage('Session recorded successfully! Would you like to open session History', "Yes", "No")
			  .then(selection => {
				console.log(selection);
				if (selection == "Yes") {
					console.log("opening history")

					vscode.workspace.openTextDocument( {
						language: 'text'
					} ).then( doc => vscode.window.showTextDocument( doc ) )
					.then( editor => {
						let editBuilder = textEdit => {
							textEdit.insert( new vscode.Position( 0, 0 ), String( global.history ) );
						};
					
						return editor.edit( editBuilder, {
								undoStopBefore: true,
								undoStopAfter: false
							} )
							.then( () => editor );
					} );
					//vscode.window.showInformationMessage("History: \n "+ global.history)
				}
				else {
					console.log("rejected history")
				}
			  });
			  
			


		}
		else {	
			vscode.window.showInformationMessage("Timer hasn't been started yet! use the command ' start sesion timer' ");
		}
	});

	context.subscriptions.push(end_timer);

	let status_timer = vscode.commands.registerCommand('status.timer', function () {
		
		const today = new Date();

		var hours_end = today.getHours();         
		var minutes_end = today.getMinutes();     
		var seconds_end = today.getSeconds();     

		var hours_elapsed = Math.abs(hours_end - global.start_hours)
		var minutes_elapsed = Math.abs(minutes_end - global.start_minutes)
		var seconds_elapsed = Math.abs(seconds_end - global.start_seconds)
		
		var time_elapsed = hours_elapsed + ": " + minutes_elapsed + ": " + seconds_elapsed
		console.log("time elapsed(total) :" + time_elapsed)

		vscode.window.showInformationMessage("You've Spent: " + time_elapsed + " \n on this project");


	});

	context.subscriptions.push(status_timer);

	let music = vscode.commands.registerCommand('music.health', async function () {
		// Display a message box to the user

		vscode.window.showInformationMessage('Music Feature Inititiated');

		const genre = await vscode.window.showQuickPick(["Programming Focus","Beats","Ambient","None"],{
			matchOnDescription: true
		})

~
		console.log("music genre: " + genre)

		if (genre == "Programming Focus"){
			console.log("opening Programming focus")
			open('https://open.spotify.com/playlist/15ngsvOmlTkARCg7ipoNvG?si=c758114a049045cf')
		}
		else if(genre == "Beats"){
			console.log("opening Beats")
			open('https://open.spotify.com/playlist/6PrUPPajcmqjmU9AXOsua8?si=da25064f7ce7464c')
		}
		else if(genre == "Ambient"){
			console.log("opening Ambient")
			open('https://open.spotify.com/playlist/37i9dQZF1DX3Ogo9pFvBkY?si=f8bfa57dfecd4e97')
		}
		else{
			console.log("none chosen")
		}


		
	});

	context.subscriptions.push(music);

	let open_stack = vscode.commands.registerCommand('stack.open', function () {
		// Display a message box to the user

		vscode.window.showInformationMessage('Opening Stack Overflow! ');
		var link = 'https://stackoverflow.com/';
		open(link);
		console.log("opened stack overflow")
		
	});	

	context.subscriptions.push(open_stack);

	let open_history = vscode.commands.registerCommand('history.open', async function () {
		
		
	});	

	context.subscriptions.push(open_history);


}


// this method is called when your extension is deactivated
function deactivate() {
	console.log("exited")
	
	const today = new Date();
	var hours_end = today.getHours();         
	var minutes_end = today.getMinutes();     
	var seconds_end = today.getSeconds();    
	var lost = ""
	if (global.started == 1) {
		var hours_elapsed = Math.abs(hours_end - global.hours)
		var minutes_elapsed = Math.abs(minutes_end - global.minutes)
		var seconds_elapsed = Math.abs(seconds_end - global.seconds)
		
		var time_elapsed = hours_elapsed + ": " + minutes_elapsed + ": " + seconds_elapsed
		console.log("session time elapsed :" + time_elapsed)

		lost += `Lost session time elapsed ${time_elapsed} \n`
	}   

	var hours_elapsed_total = Math.abs(hours_end - global.start_hours)
	var minutes_elapsed_total = Math.abs(minutes_end - global.start_minutes)
	var seconds_elapsed_total = Math.abs(seconds_end - global.start_seconds)
		
	var time_elapsed_total = hours_elapsed_total + ": " + minutes_elapsed_total + ": " + seconds_elapsed_total
	console.log("time elapsed(total) :" + time_elapsed_total)

	lost += `Lost total time spent ${time_elapsed_total}`

	vscode.workspace.openTextDocument( {
		language: 'text'
	} ).then( editor => {
		let editBuilder = textEdit => {
			textEdit.insert( new vscode.Position( 0, 0 ), lost );
		};
	
		return doc.save("log.txt")
	} );

}

module.exports = {
	activate,
	deactivate
}
