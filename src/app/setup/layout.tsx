import Footer from "@/components/Footer";
import { SiteHeader } from "@/components/header/SiteHeader";
import { Fragment, ReactNode } from "react";

const SetupLayout = ({
  children,
}: Readonly<{
  children: ReactNode;
}>) => {
  return (
    <Fragment>
      <SiteHeader />
      {children}
      <Footer />
    </Fragment>
  );
};

export default SetupLayout;
