import { ReactNode } from "react";

type PageContainerProps = {
  children: ReactNode;
};

const PageContainer = ({ children }: PageContainerProps) => {
  return <div style={{ margin: "50px 50px 0" }}>{children}</div>;
};

export default PageContainer;
