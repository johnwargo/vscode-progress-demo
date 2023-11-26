import * as vscode from 'vscode';

const extensionTitle = 'Progress Demo';
const delayValue = 10;	// seconds

export function activate(context: vscode.ExtensionContext) {
	console.log('Extension activated');
	let disposable = vscode.commands.registerCommand('progress-demo.go', () => {

		// this `taskRunner` executes for delayValue seconds to simulate a long running task
		async function taskRunner(customCancellationToken: vscode.CancellationTokenSource) {
			setTimeout(function () {
				console.log('taskRunner completed');
				// tell the progress bar to stop
				customCancellationToken.cancel();
			}, delayValue * 1000);
		}

		// creates a progress bar that runs until the `taskRunner` tells it to stop
		vscode.window.withProgress({
			title: extensionTitle,
			location: vscode.ProgressLocation.Notification,
			cancellable: false
		},
			async (progress, token) => {
				return new Promise((async (resolve) => {
					var interval: any;
					// setup a process to handle progress bar cancellation					
					var customCancellationToken: vscode.CancellationTokenSource | null = new vscode.CancellationTokenSource();
					customCancellationToken.token.onCancellationRequested(() => {
						console.log('Clearing progress bar');
						interval = clearInterval(interval);
						customCancellationToken?.dispose();
						customCancellationToken = null;
						resolve(null);
						return;
					});
					taskRunner(customCancellationToken);
					var loopCounter = 0;
					interval = setInterval(() => {
						console.log('Waiting');
						loopCounter++;
						if (loopCounter > 5) { loopCounter = 1; }	// reset the loop counter
						progress.report({ message: 'working' + '.'.repeat(loopCounter) });
					}, 1000);
				}));
			});

	});
	context.subscriptions.push(disposable);
}

export function deactivate() {
	console.log('Extension deactivated');
}
