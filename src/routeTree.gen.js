/* eslint-disable */
// @ts-nocheck
// This file was generated for the JS port of the portfolio.
// TanStack Router may overwrite it on build if the file-based plugin runs.

import { Route as rootRouteImport } from "./routes/__root";
import { Route as IndexRouteImport } from "./routes/index";
import { Route as ApiContactRouteImport } from "./routes/api.contact";

const IndexRoute = IndexRouteImport.update({
  id: "/",
  path: "/",
  getParentRoute: () => rootRouteImport,
});

const ApiContactRoute = ApiContactRouteImport.update({
  id: "/api/contact",
  path: "/api/contact",
  getParentRoute: () => rootRouteImport,
});

export const routeTree = rootRouteImport.addChildren([IndexRoute, ApiContactRoute]);
