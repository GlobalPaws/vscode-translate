import * as vscode from 'vscode';
import { SecretService } from './services/secretStorage';
import { TranslatorFactory } from './services/translatorFactory';
import { TranslateCommands } from './commands/translateCommands';
import { TranslationHoverProvider } from './providers/hoverProvider';
import { SidebarTranslationViewProvider } from './views/sidebarProvider';
import { TranslationTabPanel } from './views/tabPanelProvider';

export function activate(context: vscode.ExtensionContext): void {
  const secretService = new SecretService(context.secrets, context.globalState);
  const translatorFactory = new TranslatorFactory(secretService);
  const translateCommands = new TranslateCommands(translatorFactory, secretService);

  // Register commands
  context.subscriptions.push(
    vscode.commands.registerCommand('vscode-translate.translateSelection', () =>
      translateCommands.translateSelection()
    ),
    vscode.commands.registerCommand('vscode-translate.replaceSelection', () =>
      translateCommands.replaceSelection()
    ),
    vscode.commands.registerCommand('vscode-translate.insertBelowSelection', () =>
      translateCommands.insertBelowSelection()
    ),
    vscode.commands.registerCommand('vscode-translate.setApiKey', () =>
      translateCommands.setApiKey()
    ),
    vscode.commands.registerCommand('vscode-translate.clearApiKey', () =>
      translateCommands.clearApiKey()
    ),
    vscode.commands.registerCommand('vscode-translate.openSidebar', () => {
      vscode.commands.executeCommand('vscodeTranslate.sidebarView.focus');
    }),
    vscode.commands.registerCommand('vscode-translate.openSettings', () => {
      sidebarProvider.openSettings();
      TranslationTabPanel.currentPanel?.openSettings();
    }),
    vscode.commands.registerCommand('vscode-translate.openTab', () => {
      const editor = vscode.window.activeTextEditor;
      let initialText: string | undefined;
      if (editor && !editor.selection.isEmpty) {
        initialText = editor.document.getText(editor.selection);
      }
      TranslationTabPanel.createOrShow(
        context.extensionUri,
        translatorFactory,
        secretService,
        initialText
      );
    })
  );

  // Status Bar Item: Click to open Google Translate Tab
  const statusBarItem = vscode.window.createStatusBarItem(
    vscode.StatusBarAlignment.Right,
    100
  );
  statusBarItem.command = 'vscode-translate.openTab';
  statusBarItem.text = '$(globe) 翻訳';
  statusBarItem.tooltip = 'Google 翻訳タブをエディタで開く';
  statusBarItem.show();
  context.subscriptions.push(statusBarItem);

  // Register Hover Provider
  const hoverProvider = new TranslationHoverProvider(translatorFactory);
  context.subscriptions.push(
    vscode.languages.registerHoverProvider({ scheme: 'file' }, hoverProvider)
  );

  // Register Sidebar Webview View Provider
  const sidebarProvider = new SidebarTranslationViewProvider(
    context.extensionUri,
    translatorFactory,
    secretService
  );
  context.subscriptions.push(
    vscode.window.registerWebviewViewProvider(
      SidebarTranslationViewProvider.viewType,
      sidebarProvider
    )
  );
}

export function deactivate(): void {
  // Cleanup if needed
}
