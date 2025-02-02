import type { DefaultPageProps } from "../../types";
import Navbar from "../Navbar";

function DefaultPage({
  className = "w-screen h-screen flex flex-col",
  childrenClassName = "w-full h-full flex-1 gap-y-8 z-10",
  children = null,
  HtmlTag = "div",
}: DefaultPageProps) {
  return (
    <HtmlTag className={className}>
      <Navbar />
      {children && <main className={childrenClassName}>{children}</main>}
    </HtmlTag>
  );
}

export default DefaultPage;
