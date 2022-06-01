import * as path from "path"
import * as os from "os"

const serverFilepath = path.join(
  "bin",
  `exa-language-server${os.platform() === "win32" ? ".exe" : ""}`
)

export function getServerFilepath(): string {
  return serverFilepath
}
