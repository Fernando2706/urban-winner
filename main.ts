//
import { Server } from "https://deno.land/std@0.166.0/http/server.ts";
import { GraphQLHTTP } from "https://deno.land/x/gql@1.1.2/mod.ts";
import { makeExecutableSchema } from "https://deno.land/x/graphql_tools@0.0.2/mod.ts";

import resolvers from "./resolvers/mod.ts";
import { typeDefs } from "./typedefs.ts";

const schema = makeExecutableSchema({ typeDefs, resolvers });

const server = new Server({
    handler: async (req) => {
      const { pathname } = new URL(req.url);
      // Sleep for 1 second to secure the server
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return pathname === "/graphql"
        ? await GraphQLHTTP<Request>({
          schema,
          graphiql: true,
        })(req)
        : new Response("Not Found", { status: 404 });
    },
    port: 3000,
  });

    console.log("Server running on http://localhost:3000/graphql");
    await server.listenAndServe();