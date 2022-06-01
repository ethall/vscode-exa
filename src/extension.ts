import * as vscode from "vscode"
import {
  LanguageClient,
  LanguageClientOptions,
  ServerOptions,
} from "vscode-languageclient/node"

import { getServerFilepath } from "./platform"

let client: LanguageClient

export function activate(context: vscode.ExtensionContext) {
  const serverModule = context.asAbsolutePath(getServerFilepath())

  const serverOptions: ServerOptions = {
    run: { command: serverModule },
    debug: { command: serverModule },
  }

  const clientOptions: LanguageClientOptions = {
    documentSelector: [{ scheme: "file", language: "exa" }],
    synchronize: {
      fileEvents: vscode.workspace.createFileSystemWatcher("*.exa"),
    },
  }

  client = new LanguageClient("exalang", "EXALang", serverOptions, clientOptions)
  void client.start()
}

// Called when the extension is deactivated.
export function deactivate() {
  if (!client) {
    return undefined
  }
  return client.stop()
}
