import * as vscode from "vscode"
import {
  LanguageClient,
  LanguageClientOptions,
  ServerOptions,
} from "vscode-languageclient/node"

import { getServerFilepath } from "./platform"
import { ReadDocumentationRequest } from "./rpc"

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

  client = new LanguageClient("exalang", "EXALang", serverOptions, clientOptions, true)
  void client.start().then(() => {
    client
      .sendRequest(ReadDocumentationRequest, {
        uri: vscode.Uri.joinPath(
          context.extensionUri,
          "third_party",
          "docs.EN.json"
        ).toString(),
      })
      .then((response) => {
        console.log("<-[ReadDocumentationRequest] <OK>")
        console.log(response)
      })
      .catch((reason) => {
        console.log("<-[ReadDocumentationRequest] <FAIL> ")
        console.log(reason)
      })
  })
}

// Called when the extension is deactivated.
export function deactivate() {
  if (!client) {
    return undefined
  }
  return client.stop()
}
