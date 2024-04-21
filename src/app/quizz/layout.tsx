import Header from "../../components/header";

export default function Layout({ children }: {
  children: React.ReactNode
}) {
  return (
    <>
      {/* <Header /> */}
      <div className="flex flex-col flex-1 max-w-96 w-full m-auto h-[calc(100vh-3rem)] gap-6">
        {children}
      </div>
    </>
  )
}