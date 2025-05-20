
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight, BarChart2, FileText, Headphones, Video, Calendar } from "lucide-react";

interface SideNavProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

interface NavItemProps {
  href: string;
  label: string;
  icon: React.ElementType;
  isOpen: boolean;
  isActive: boolean;
}

const NavItem = ({ href, label, icon: Icon, isOpen, isActive }: NavItemProps) => (
  <Link to={href} className="w-full">
    <Button
      variant="ghost"
      className={cn(
        "w-full justify-start mb-1 transition-all",
        isActive
          ? "bg-sidebar-accent text-sidebar-accent-foreground"
          : "hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground",
        isOpen ? "px-4" : "px-2 justify-center"
      )}
    >
      <Icon className={cn("h-5 w-5", isOpen ? "mr-2" : "")} />
      <span className={cn("transition-all", isOpen ? "opacity-100" : "opacity-0 w-0 h-0 overflow-hidden")}>
        {label}
      </span>
    </Button>
  </Link>
);

const NavGroup = ({ title, children, isOpen }: { title: string; children: React.ReactNode; isOpen: boolean }) => (
  <div className="mb-6">
    {isOpen && <h3 className="px-4 text-xs font-semibold text-muted-foreground uppercase mb-2">{title}</h3>}
    <div>{children}</div>
  </div>
);

export function SideNav({ isOpen, setIsOpen }: SideNavProps) {
  const location = useLocation();
  const pathname = location.pathname;

  const navigationItems = [
    {
      group: "Contenu",
      items: [
        {
          href: "/actualites",
          label: "Actualités",
          icon: FileText,
        },
        {
          href: "/podcasts",
          label: "Podcasts",
          icon: Headphones,
        },
        {
          href: "/replays",
          label: "Replays",
          icon: Calendar,
        },
        {
          href: "/videos",
          label: "Vidéos",
          icon: Video,
        },
      ],
    },
    {
      group: "Analyse",
      items: [
        {
          href: "/statistiques",
          label: "Statistiques",
          icon: BarChart2,
        },
      ],
    },
  ];

  return (
    <div
      className={cn(
        "bg-sidebar text-sidebar-foreground border-r border-sidebar-border h-screen sticky top-0 transition-all-medium",
        isOpen ? "w-64" : "w-16"
      )}
    >
      <div className="p-4 flex items-center justify-between border-b border-sidebar-border">
        {isOpen && <h1 className="font-bold text-xl">Radio Admin</h1>}
        <Button
          variant="ghost"
          size="icon"
          className="text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <ChevronLeft className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
        </Button>
      </div>

      <nav className="p-2">
        {navigationItems.map((group) => (
          <NavGroup key={group.group} title={group.group} isOpen={isOpen}>
            {group.items.map((item) => (
              <NavItem
                key={item.href}
                href={item.href}
                label={item.label}
                icon={item.icon}
                isOpen={isOpen}
                isActive={pathname.startsWith(item.href)}
              />
            ))}
          </NavGroup>
        ))}
      </nav>
    </div>
  );
}
