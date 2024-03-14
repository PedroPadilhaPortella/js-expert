import Http, { Server } from "http";

export async function InjectHttpInterceptor() {
  const oldEmit = Http.Server.prototype.emit;

  Server.prototype.emit = function (...args) {
    const [type, request, response] = args;

    if (type === "request") {
      response.setHeader("X-Instrumented-By", "Pedro Portella");
    }

    return oldEmit.apply(this, args);
  };
}