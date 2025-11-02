import { AddCard } from "@/components/add-card"
import { AddPassword } from "@/components/add-password"
import { YourCards } from "@/components/your-cards"
import { YourPasswords } from "@/components/your-passwords"
import { currentUser } from "@clerk/nextjs/server"
import { Lock } from "lucide-react"
import type { Metadata } from "next"

export const metadata:Metadata={
  title: "BitSecure - Password Manager",
  description: "Manage your passwords and credit cards securely with BitSecure.",
}

export default async function Home() {

  const user = await currentUser()
  console.log(user?.privateMetadata)

  return (
    <main className="min-h-screen bg-gradient-to-br from-background to-secondary/20">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-primary p-2">
              <Lock className="h-6 w-6 text-primary-foreground" />
            </div>
            <h1 className="text-3xl font-bold text-foreground">Password Manager</h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Add Sections */}
        <div className="mb-12 grid gap-6 lg:grid-cols-2">
          <section className="space-y-4">
            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-foreground">Add a Credit Card</h2>
              <p className="text-sm text-muted-foreground">Securely store and manage your payment methods</p>
            </div>
            <AddCard />
          </section>

          <section className="space-y-4">
            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-foreground">Add a Password</h2>
              <p className="text-sm text-muted-foreground">Create and organize your secure passwords</p>
            </div>
            <AddPassword />
          </section>
        </div>

        <div className="mb-8 h-px bg-border" />

        {/* Display Sections */}
        <div className="grid gap-6 lg:grid-cols-2">
          <section className="space-y-4">
            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-foreground">Your Cards</h2>
              <p className="text-sm text-muted-foreground">Manage your stored payment methods</p>
            </div>
            <YourCards cards={Array.isArray(user?.privateMetadata.cards)?user?.privateMetadata.cards:[]}/>
          </section>

          <section className="space-y-4">
            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-foreground">Your Passwords</h2>
              <p className="text-sm text-muted-foreground">View and manage all your passwords</p>
            </div>
            <YourPasswords passwords={Array.isArray(user?.privateMetadata.passwords)?user?.privateMetadata.passwords:[]} />
          </section>
        </div>
      </div>
    </main>
  )
}
