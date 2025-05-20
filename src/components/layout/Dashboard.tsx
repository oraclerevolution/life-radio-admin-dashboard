
import { ReactNode, useEffect, useState } from "react";
import { SideNav } from "./SideNav";
import { Header } from "./Header";
import { useToast } from "@/hooks/use-toast";
import { Sheet, SheetContent } from "@/components/ui/sheet";

interface DashboardProps {
  children: ReactNode;
}

export function Dashboard({ children }: DashboardProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { toast } = useToast();
  
  // Détecte si l'écran est mobile ou non
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsSidebarOpen(false);
      } else {
        setIsSidebarOpen(true);
      }
    };
    
    // Appel initial
    handleResize();
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  const toggleSidebar = () => {
    if (window.innerWidth < 768) {
      setIsMobileMenuOpen(!isMobileMenuOpen);
    } else {
      setIsSidebarOpen(!isSidebarOpen);
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Sidebar pour desktop */}
      <div className={`hidden md:block ${isSidebarOpen ? 'md:w-64' : 'md:w-0'} transition-all duration-300 overflow-hidden`}>
        <SideNav isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      </div>
      
      {/* Menu mobile avec Sheet */}
      <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
        <SheetContent side="left" className="p-0 w-64">
          <SideNav isOpen={true} setIsOpen={() => setIsMobileMenuOpen(false)} />
        </SheetContent>
      </Sheet>
      
      <main className="flex-1 flex flex-col min-h-screen">
        <Header toggleSidebar={toggleSidebar} />
        <div className="flex-1 p-4 md:p-6 overflow-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
