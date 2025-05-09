
import React, { ReactNode } from "react";
import Sidebar from "./Sidebar";
import LanguageSelector from "./LanguageSelector";
import { Bell } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  DropdownMenu,
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/context/LanguageContext";

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const { t } = useLanguage();
  
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <header className="bg-white shadow-sm h-16 flex items-center px-6 justify-between">
          <div>
            <h1 className="text-lg font-semibold text-gray-800">Ceramic Tile Quality Control</h1>
            <p className="text-sm text-gray-500">Céramica Dersa</p>
          </div>
          <div className="flex items-center space-x-4">
            <LanguageSelector />
            <Button variant="ghost" size="icon">
              <Bell size={20} />
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                  <Avatar>
                    <AvatarImage src="https://i.pravatar.cc/150?img=2" alt="User" />
                    <AvatarFallback>FB</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel>
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">Fatima Benkirane</p>
                    <p className="text-xs leading-none text-muted-foreground">
                      f.benkirane@ceramica-dersa.ma
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>{t('profile')}</DropdownMenuItem>
                <DropdownMenuItem>{t('settings')}</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>{t('logout')}</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>
        <main className="flex-1 overflow-auto p-6">{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;
