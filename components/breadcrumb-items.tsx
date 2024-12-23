import React, { Fragment } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

type Props = {
  items: { label: string; href: string }[];
};

const BreadcrumbItems = ({ items }: Props) => {
  return (
    <Breadcrumb className="z-10">
      <BreadcrumbList>
        {items.map((item) => (
          <Fragment key={item.label}>
            <BreadcrumbItem>
              <BreadcrumbLink href={item.href}>{item.label}</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
          </Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default BreadcrumbItems;
