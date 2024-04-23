import Header from "../../components/header";

export default function Layout({ children }: {
  children: React.ReactNode
}) {
  return (
    <>
      {/* <Header /> */}
      <div className="container flex flex-col flex-1 w-full m-auto h-[calc(100vh-3rem)] gap-6">
        {children}
      </div>
    </>
  );
}