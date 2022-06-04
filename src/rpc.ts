import { RequestType, ResponseMessage } from "vscode-jsonrpc"

export type ReadDocumentationResponse = {
  [Property in keyof ResponseMessage as Exclude<Property, "result">]: ResponseMessage[Property]
} & { result?: string }
export const ReadDocumentationRequest = new RequestType<
  { uri: string },
  ReadDocumentationResponse,
  Error
>("exalang/readDocumentation")
