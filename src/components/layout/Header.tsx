
import { Button } from "@/components/ui/button";
import { 
  Bell, 
  Menu,
  User,
  LogOut,
  Settings,
  ChevronDown
} from "lucide-react";
import { 
  Popover, 
  PopoverContent, 
  PopoverTrigger 
} from "@/components/ui/popover";

interface HeaderProps {
  toggleSidebar: () => void;
}

export function Header({ toggleSidebar }: HeaderProps) {
  return (
    <header className="border-b border-border bg-card py-4 px-6 flex items-center justify-between">
      <div className="flex items-center">
        <Button variant="ghost" size="icon" className="md:hidden mr-2" onClick={toggleSidebar}>
          <Menu className="h-5 w-5" />
        </Button>
        <h2 className="text-lg font-medium">Dashboard Radio Admin</h2>
      </div>
      <div className="flex items-center gap-2">
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500"></span>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-72 p-0">
            <div className="p-3 border-b">
              <h3 className="font-semibold">Notifications</h3>
            </div>
            <div className="max-h-80 overflow-auto">
              <div className="p-3 border-b hover:bg-muted/50 cursor-pointer">
                <p className="text-sm font-medium">Nouvel utilisateur inscrit</p>
                <p className="text-xs text-muted-foreground">Il y a 5 minutes</p>
              </div>
              <div className="p-3 border-b hover:bg-muted/50 cursor-pointer">
                <p className="text-sm font-medium">Nouvelle actualité ajoutée</p>
                <p className="text-xs text-muted-foreground">Il y a 10 minutes</p>
              </div>
              <div className="p-3 hover:bg-muted/50 cursor-pointer">
                <p className="text-sm font-medium">Nouvel épisode de podcast publié</p>
                <p className="text-xs text-muted-foreground">Il y a 30 minutes</p>
              </div>
            </div>
            <div className="p-2 border-t text-center">
              <Button variant="ghost" size="sm" className="w-full">Voir toutes les notifications</Button>
            </div>
          </PopoverContent>
        </Popover>
        
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="ghost" className="flex items-center gap-2">
              <User className="h-5 w-5" />
              <span className="hidden sm:inline">Admin</span>
              <ChevronDown className="h-4 w-4" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-56 p-0">
            <div className="p-3 border-b">
              <p className="font-medium">Admin Radio</p>
              <p className="text-xs text-muted-foreground">admin@radiostation.com</p>
            </div>
            <div className="p-1">
              <Button variant="ghost" className="w-full justify-start text-sm" size="sm">
                <Settings className="h-4 w-4 mr-2" />
                Paramètres
              </Button>
              <Button variant="ghost" className="w-full justify-start text-sm" size="sm">
                <LogOut className="h-4 w-4 mr-2" />
                Déconnexion
              </Button>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </header>
  );
}
