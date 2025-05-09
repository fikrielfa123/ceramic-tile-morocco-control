
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { mockUsers } from "@/data/mockData";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Check if email exists in our mock users
    const user = mockUsers.find((u) => u.email === email);

    setTimeout(() => {
      setIsLoading(false);
      
      if (user && password === "password") { // Simple password check for demo purposes
        // In a real app, you would set authentication tokens/user info in a context or store
        localStorage.setItem("currentUser", JSON.stringify(user));
        toast({
          title: "Login successful",
          description: `Welcome back, ${user.name}!`,
        });
        navigate("/dashboard");
      } else {
        toast({
          title: "Login failed",
          description: "Invalid email or password. Please try again.",
          variant: "destructive",
        });
      }
    }, 1000);
  };

  return (
    <div className="w-full max-w-md space-y-6">
      <div className="space-y-2 text-center">
        <div className="mx-auto h-16 w-16 bg-industrial-blue rounded-xl flex items-center justify-center text-white text-2xl font-bold">
          CT
        </div>
        <h1 className="text-3xl font-bold">CeramControl</h1>
        <p className="text-gray-500 dark:text-gray-400">
          Ceramic Tile Quality Control System
        </p>
      </div>
      <div className="space-y-4">
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            placeholder="m.alami@ceramica-dersa.ma"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            required
          />
          <div className="text-sm text-muted-foreground">
            Demo emails: m.alami@ceramica-dersa.ma (Admin), f.benkirane@ceramica-dersa.ma (Quality Manager)
          </div>
        </div>
        <div className="grid gap-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Password</Label>
            <Button variant="link" className="h-auto p-0 text-sm" asChild>
              <a href="#">Forgot password?</a>
            </Button>
          </div>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
            placeholder="Use 'password' for demo"
            required
          />
        </div>
        <Button
          className="w-full bg-industrial-blue hover:bg-industrial-darkBlue"
          onClick={handleLogin}
          disabled={isLoading}
        >
          {isLoading ? "Logging in..." : "Login"}
        </Button>
      </div>
    </div>
  );
};

export default LoginForm;
