// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const { displayPartsToString } = require('typescript');
const vscode = require('vscode');
const open = require('open')

// this method is called when your extension is activated

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "devtools" is now active!');

	// automatic timer

	var time = new Date()
	global.start_hours = time.getHours()         
	global.start_minutes = time.getMinutes();     
	global.start_seconds = time.getSeconds();

	let disposable = vscode.commands.registerCommand('devtools.hello', function () {
		vscode.window.showInformationMessage('Hello Welcome to DevTools!');
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

	let end_timer = vscode.commands.registerCommand('end.timer', function () {
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
			
			/*const feedback = prompt("Rate this feature from 1-10");
			console.log("rated: " + feedback)*/
			global.started = 0
			console.log("started: " +global.started)
		}
		else {	
			vscode.window.showInformationMessage("Timer hasn't been started yet! use the command ' start sesion timer' ");
		}
	});

	context.subscriptions.push(end_timer);

	let open_stack = vscode.commands.registerCommand('stack.open', function () {
		// Display a message box to the user

		vscode.window.showInformationMessage('Opening Stack Overflow! ');
		var link = 'https://stackoverflow.com/';
		open(link);
		console.log("opened stack overflow")
		
	});	

	context.subscriptions.push(open_stack);

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

		vscode.window.showInformationMessage("You've Spent: " + time_elapsed + " \ on this project");

	});

	context.subscriptions.push(status_timer);

	let music = vscode.commands.registerCommand('music.health', async function () {
		// Display a message box to the user

		vscode.window.showInformationMessage('Music Feature Inititiated');

		const genre = await vscode.window.showQuickPick(["Programming Focus","Beats","Ambient","None"],{
			matchOnDescription: true
		})


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


}


	

/*
while (Math.abs(global.func_time_now-global.minutes_relax) % global.time_not != 0){
	alert(global.time_not)
}
*/

// this method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}
