//
import { Application, Router } from "https://deno.land/x/oak@v10.0.0/mod.ts";
import { GraphQLHTTP } from "https://deno.land/x/gql@1.1.2/mod.ts";
import { makeExecutableSchema } from "https://deno.land/x/graphql_tools@0.0.2/mod.ts";
import { applyGraphQL, gql, GQLError } from "https://deno.land/x/oak_graphql/mod.ts";


import resolvers from "./resolvers/mod.ts";
import { typeDefs } from "./typedefs.ts";

const schema = makeExecutableSchema({ typeDefs, resolvers });

const app = new Application();

app.use(async (ctx, next) => {
  await next();
  const rt = ctx.response.headers.get("X-Response-Time");
  console.log(`${ctx.request.method} ${ctx.request.url} - ${rt} | from: ${ctx.request.ip}`);
});

app.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  ctx.response.headers.set("X-Response-Time", `${ms}ms`);
});

// Add some sleep time
app.use(async (ctx, next) => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  await next();
});

const GraphQLService = await applyGraphQL<Router>({
  Router,
  typeDefs: typeDefs,
  resolvers: resolvers,
  path: "/graphql",
})

app.use(GraphQLService.routes(), GraphQLService.allowedMethods());

console.log("Server start at http://localhost:8080");
await app.listen({ port: 8080 });