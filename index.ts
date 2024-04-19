import { parseArgs } from "util";

console.log(Bun.argv);
const { values, positionals } = parseArgs({
  args: Bun.argv,
  options: {
    file: {
      type: "string",
    },
  },
  strict: true,
  allowPositionals: true,
});

const server = Bun.serve({
  port: 3000,
  fetch(req) {
    let url = new URL(req.url).pathname;
    console.log(req);
    let res =
      url === "/"
        ? new Response(Bun.file(values.file as string))
        : new Response(Bun.file("." + url));
    console.log(res);
    return res;
  },
});

console.log(`Listening on http://localhost:${server.port} ...`);
