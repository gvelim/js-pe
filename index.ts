import { parseArgs } from "util";

console.log(Bun.argv);
const { values } = parseArgs({
  args: Bun.argv,
  options: {
    file: {
      type: "string",
      short: "f",
    },
  },
  strict: true,
  allowPositionals: true,
});

let base = values.file?.slice(0, values.file?.lastIndexOf("/"));

const server = Bun.serve({
  port: 3000,
  fetch(req) {
    let path = new URL(req.url).pathname;
    return new Response(
      path === "/" ? Bun.file(values.file as string) : Bun.file(base + path),
    );
  },
  error(request) {
    console.log(request);
    return new Response("Cought Error: " + request);
  },
});

console.log(`Listening on http://localhost:${server.port} ...`);
