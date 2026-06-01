#!/usr/bin/env node
import { runCli } from "../src/cli.js";

runCli(process.argv.slice(2), {
  stdin: process.stdin,
  stdout: process.stdout,
  stderr: process.stderr,
  exit: (code) => process.exit(code)
});
