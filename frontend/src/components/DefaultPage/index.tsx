import type { DefaultPageProps } from "../../types";
import Footer from "../Footer";
import Navbar from "../Navbar";

function DefaultPage({
  className = "h-screen w-full relative isolate flex flex-col z-10 space-y-8",
  childrenClassName = "w-full h-full flex-1",
  children = null,
  HtmlTag = "div",
}: DefaultPageProps) {
  return (
    <HtmlTag className={className}>
      <Navbar />
      {children && <main className={childrenClassName}>{children}</main>}
      <Footer />
    </HtmlTag>
  );
}

export default DefaultPage;
