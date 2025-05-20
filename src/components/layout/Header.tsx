
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";

interface HeaderProps {
  toggleSidebar: () => void;
}

export function Header({ toggleSidebar }: HeaderProps) {
  return (
    <header className="border-b border-border bg-card py-4 px-6 flex items-center justify-between">
      <Button variant="ghost" size="icon" className="md:hidden" onClick={toggleSidebar}>
        <Menu className="h-5 w-5" />
      </Button>
      <h2 className="text-lg font-medium">Dashboard Radio Admin</h2>
      <div className="flex items-center gap-2">
        {/* Espace pour les notifications, le profil utilisateur, etc. */}
      </div>
    </header>
  );
}
