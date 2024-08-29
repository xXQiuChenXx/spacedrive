"use client";

import { usePathname } from "next/navigation";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Fragment } from "react";

const DataRoute = () => {
  const pathname = usePathname();
  const path = pathname.split("/");
  const routes = path.slice(1, path.length);

  return (
    <Breadcrumb className="w-11/12 mx-auto py-3">
      <BreadcrumbList>
        {routes.map((route, i) => (
          <Fragment key={"link-" + route}>
            <BreadcrumbItem key={route + i}>
              <BreadcrumbLink
                href={
                  routes[i + 1] ? "/" + routes.slice(0, i + 1).join("/") : "#"
                }
                key={route + i}
              >
                {decodeURI(route)}
              </BreadcrumbLink>
            </BreadcrumbItem>
            {routes[i + 1] && <BreadcrumbSeparator />}
          </Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default DataRoute;
