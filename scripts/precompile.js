#!/usr/bin/env node
const fs = require("fs")
const glob = require("glob")
const yaml = require("js-yaml")

glob("third_party/docs.*.yaml", async (error, files) => {
  if (error !== null) {
    console.log("third_party/docs.*.yaml --x third_party/docs.*.json\n")
    console.error(reason)
    process.exit(1)
  }
  for (const file of files) {
    const outfile = file.replace(/yaml$/, "json")

    let jsoncontent = undefined
    try {
      const raw = await fs.promises.readFile(file, "utf-8")
      jsoncontent = JSON.stringify(
        yaml.load(raw, {
          filename: file
        }),
        undefined,
        2
      )
    } catch (reason) {
      console.log(`${file} --x ${outfile}\n`)
      console.error(reason)
      process.exit(1)
    }

    if (process.platform === "win32") {
      jsoncontent = jsoncontent.replace(/\r\n/g, "\n")
    }

    await fs.promises.writeFile(outfile, jsoncontent)
  }
})
