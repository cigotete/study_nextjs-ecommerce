import { Sidebar, TopMenu } from "@/components"

export default function ShopLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <main className="min-h-screen bg-gray-100">
      <TopMenu />
      <Sidebar />
      {children}
    </main>
  )
}