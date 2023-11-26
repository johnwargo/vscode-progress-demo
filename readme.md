# Visual Studio Extension Progress Demo

I'm working on my first Visual Studio Code extension and as part of the extension's work, it calls a long-running external API that could take 30 seconds or more to complete. I started looking for way to display a progress dialog and discovered the [vscode.window.withProgress](https://code.visualstudio.com/api/references/vscode-api#StatusBarItem). 

As I looked through the different examples I found out there, they all showed how the code that displays and manages the progress item decides when to close the window. For my project, I had a separate process deciding when to close the progress window and this is a sample Visual Studio Code extension that shows how to do it. 

You can read more about the extension at [Visual Studio Code Progress Cancelled by Async Task](https://johnwargo.com/posts/2023/vscode-extension-progress/).
