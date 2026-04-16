import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-8 sm:flex-row">
        <p className="text-sm text-muted">
          &copy; {new Date().getFullYear()} EasePay. All rights reserved.
        </p>
        <div className="flex gap-6">
          <Link href="#" className="cursor-pointer text-sm text-muted hover:text-foreground">
            Privacy
          </Link>
          <Link href="#" className="cursor-pointer text-sm text-muted hover:text-foreground">
            Terms
          </Link>
          <Link href="#" className="cursor-pointer text-sm text-muted hover:text-foreground">
            Contact
          </Link>
        </div>
      </div>
    </footer>
  );
}
