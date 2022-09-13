'use strict';
import * as vscode from 'vscode';

const insertText = (text: string) => {
    const editor = vscode.window.activeTextEditor;

    if (!editor) {
        vscode.window.showErrorMessage('Can\'t insert print because no document is open');
        return;
    }

    const selection = editor.selection;

    const range = new vscode.Range(selection.start, selection.end);

    editor.edit((editBuilder) => {
        editBuilder.replace(range, text);
    });
};

export function activate(context: vscode.ExtensionContext) {
    console.log('Python Quick Print is now active!');

    let disposablePrint = vscode.commands.registerCommand('extension.py_print_selection', () => {
        const editor = vscode.window.activeTextEditor;
        if (!editor) { return; }

        const selection = editor.selection;
        const text = editor.document.getText(selection);

        text
            ? vscode.commands.executeCommand('editor.action.insertLineAfter')
                .then(() => {
                    const logToInsert = `print(f'${text} {type(${text})}: {${text}}')`;
                    insertText(logToInsert);
                })
            : insertText('print()');
    });

    context.subscriptions.push(disposablePrint);

    let disposableLog = vscode.commands.registerCommand('extension.py_log_selection', () => {
        const editor = vscode.window.activeTextEditor;
        if (!editor) { return; }

        const selection = editor.selection;
        const text = editor.document.getText(selection);

        text
            ? vscode.commands.executeCommand('editor.action.insertLineAfter')
                .then(() => {
                    const logToInsert = `log.info(f'${text} {type(${text})}: {${text}}')`;
                    insertText(logToInsert);
                })
            : insertText('log.info()');
    });
    context.subscriptions.push(disposableLog);
}

export function deactivate() {}