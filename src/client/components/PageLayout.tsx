import classNames from "classnames";
import cx from "classnames";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import type { HTMLProps } from "react";
import { FaArrowLeft, FaHome, FaPlus } from "react-icons/fa";

type Props = {
  children: JSX.Element;
  headTitle: string;
  headContent: string;
};

const PageLayout: React.FC<Props> = ({ children, headTitle, headContent }) => {
  const router = useRouter();
  return (
    <>
      <Head>
        <title>{headTitle}</title>
        <meta name="description" content={headContent} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header className="fixed top-0 z-10 flex w-full items-center justify-between bg-slate-900 px-2 text-slate-400">
        <div
          onClick={router.back}
          className={cx(router.pathname === "/" ? "invisible" : "visible")}
        >
          <FaArrowLeft className="h-6 w-6" />
        </div>

        <Link href="/">
          <h1 className="bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-2xl font-extrabold text-transparent">
            Chapman Cookbook
          </h1>
        </Link>
        <Link href="/" className="invisible">
          <FaArrowLeft className="h-6 w-6" />
        </Link>
      </header>
      <main
        className={cx(
          "flex min-h-screen flex-col items-center bg-slate-900 pb-[54px] pt-[34px] text-slate-400"
        )}
      >
        <div className="container px-2 pt-1">{children}</div>
      </main>
      <footer className="fixed bottom-0 flex w-full justify-center gap-8 bg-slate-800 py-1 text-center text-lg">
        <Link href="/">
          <FooterIcon
            icon={(props: any) => <FaHome {...props} />}
            text="Home"
            isActive={router.pathname === "/"}
          />
        </Link>
        <Link href="/recipe/add">
          <FooterIcon
            icon={(props: HTMLProps<SVGElement>) => <FaPlus {...props} />}
            text="Add"
            isActive={router.pathname === "/recipe/add"}
          />
        </Link>
      </footer>
    </>
  );
};

function FooterIcon({
  icon,
  text,
  isActive,
}: {
  icon: (props: any) => JSX.Element;
  text: string;
  isActive: boolean;
}) {
  const getIcon = () =>
    icon({
      className: classNames("w-6 h-6"),
    });
  return (
    <div
      className={classNames(
        "flex flex-col items-center",
        isActive ? "text-pink-400" : "text-slate-300"
      )}
    >
      {getIcon()}
      <span className="text-[0.625rem]/[1rem]">{text}</span>
    </div>
  );
}

export default PageLayout;
