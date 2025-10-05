import Link from "next/link"

interface HeaderProps {
  registryName: string
}

export default function Header({ registryName }: HeaderProps) {
  return (
    <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container px-4 mx-auto sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary">
                <span className="text-sm font-bold text-primary-foreground">B</span>
              </div>
              <span className="text-xl font-bold">{registryName}</span>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="items-center hidden space-x-6 md:flex">
            <Link href="/" className="text-sm font-medium transition-colors text-muted-foreground hover:text-foreground">
              Home
            </Link>
            <Link href="/registry" className="text-sm font-medium transition-colors text-muted-foreground hover:text-foreground">
              Registry
            </Link>
          </nav>
        </div>
      </div>
    </header>
  )
}