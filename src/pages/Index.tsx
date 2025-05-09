
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import LoginForm from "@/components/auth/LoginForm";

const Index = () => {
  return (
    <div className="min-h-screen bg-industrial-background">
      <header className="bg-white border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="h-8 w-8 bg-industrial-blue rounded-md flex items-center justify-center text-white font-bold">
              CT
            </div>
            <span className="text-lg font-medium">CeramControl</span>
          </div>
          <nav>
            <ul className="flex space-x-6">
              <li>
                <a href="#features" className="text-sm text-gray-600 hover:text-industrial-blue">
                  Features
                </a>
              </li>
              <li>
                <a href="#standards" className="text-sm text-gray-600 hover:text-industrial-blue">
                  ISO Standards
                </a>
              </li>
              <li>
                <Button asChild size="sm" variant="outline">
                  <Link to="/">Login</Link>
                </Button>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      <div className="container mx-auto px-4 py-20 flex flex-col lg:flex-row items-center gap-8">
        <div className="lg:w-1/2 space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight text-gray-900">
            Ceramic Tile Quality Control <span className="text-industrial-blue">System</span>
          </h1>
          <p className="text-lg text-gray-600">
            Streamline quality control in your ceramic tile factory, ensure ISO compliance, and generate audit-ready reports.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Button className="bg-industrial-blue">
              <Link to="/dashboard">View Demo</Link>
            </Button>
            <Button variant="outline">Learn More</Button>
          </div>
        </div>
        
        <div className="lg:w-1/2 bg-white p-8 rounded-lg shadow-lg">
          <LoginForm />
        </div>
      </div>

      <section id="features" className="bg-white py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-6 rounded-lg transition-all hover:shadow-md">
              <div className="h-12 w-12 bg-industrial-blue/10 rounded-lg flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-industrial-blue"><rect width="18" height="18" x="3" y="3" rx="2" /><path d="M8 12h8" /><path d="M12 8v8" /></svg>
              </div>
              <h3 className="text-xl font-medium mb-2">Batch Tracking</h3>
              <p className="text-gray-600">
                Track production batches with unique IDs linked to date, kiln, and material lot.
              </p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg transition-all hover:shadow-md">
              <div className="h-12 w-12 bg-industrial-blue/10 rounded-lg flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-industrial-blue"><path d="M20 7h-3a2 2 0 0 1-2-2V2" /><path d="M9 18a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h7l4 4v10a2 2 0 0 1-2 2Z" /><path d="m9 18-5-5v3a2 2 0 0 0 2 2Z" /><path d="M13 9h4" /><path d="M13 13h4" /></svg>
              </div>
              <h3 className="text-xl font-medium mb-2">ISO Compliance</h3>
              <p className="text-gray-600">
                Validate measurements against IMANOR and ISO 13006 standards automatically.
              </p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg transition-all hover:shadow-md">
              <div className="h-12 w-12 bg-industrial-blue/10 rounded-lg flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-industrial-blue"><path d="M3 3v18h18" /><path d="m19 9-5 5-4-4-3 3" /></svg>
              </div>
              <h3 className="text-xl font-medium mb-2">Quality Analytics</h3>
              <p className="text-gray-600">
                Monitor trends, analyze defects, and improve production quality over time.
              </p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg transition-all hover:shadow-md">
              <div className="h-12 w-12 bg-industrial-blue/10 rounded-lg flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-industrial-blue"><path d="M16 3v18" /><path d="M8 3v18" /><path d="M3 8h18" /><path d="M3 16h18" /></svg>
              </div>
              <h3 className="text-xl font-medium mb-2">Dimensional Checks</h3>
              <p className="text-gray-600">
                Measure length, width, thickness with tolerance checking per ISO 13006.
              </p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg transition-all hover:shadow-md">
              <div className="h-12 w-12 bg-industrial-blue/10 rounded-lg flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-industrial-blue"><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3Z" /><circle cx="12" cy="13" r="3" /></svg>
              </div>
              <h3 className="text-xl font-medium mb-2">Visual Defects</h3>
              <p className="text-gray-600">
                Document cracks, chips, color deviations with image evidence.
              </p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg transition-all hover:shadow-md">
              <div className="h-12 w-12 bg-industrial-blue/10 rounded-lg flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-industrial-blue"><path d="M19.44 10A10.41 10.41 0 0 0 12 4a10.4 10.4 0 0 0-7.44 6" /><path d="M4.56 14a10.41 10.41 0 0 0 7.44 6 10.4 10.4 0 0 0 7.44-6" /><path d="M12 12m-4 0a4 4 0 1 0 8 0a4 4 0 1 0 -8 0" /></svg>
              </div>
              <h3 className="text-xl font-medium mb-2">Physical Tests</h3>
              <p className="text-gray-600">
                Record water absorption, break resistance, and abrasion resistance.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="standards" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">ISO Standards Support</h2>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-medium mb-4">Moroccan & ISO Standards</h3>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-industrial-blue mr-2 mt-1"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    <span>ISO 13006 - Ceramic tiles standardization</span>
                  </li>
                  <li className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-industrial-blue mr-2 mt-1"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    <span>ISO 10545-2 - Dimensional specifications</span>
                  </li>
                  <li className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-industrial-blue mr-2 mt-1"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    <span>ISO 10545-3 - Water absorption testing</span>
                  </li>
                  <li className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-industrial-blue mr-2 mt-1"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    <span>ISO 10545-4 - Breaking strength</span>
                  </li>
                  <li className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-industrial-blue mr-2 mt-1"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    <span>ISO 10545-7 - Abrasion resistance</span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-medium mb-4">IMANOR Certification</h3>
                <p className="text-gray-600 mb-4">
                  The system supports IMANOR (Institut Marocain de Normalisation) certification requirements, ensuring compliance with Moroccan quality standards for ceramic tile production.
                </p>
                <p className="text-gray-600">
                  Automated validation helps ensure your products meet both international and local standards, simplifying the certification and audit process.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-gray-800 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="h-8 w-8 bg-white rounded-md flex items-center justify-center text-industrial-blue font-bold">
                  CT
                </div>
                <span className="text-lg font-medium">CeramControl</span>
              </div>
              <p className="text-gray-400">
                Advanced quality control system for ceramic tile factories in Morocco.
              </p>
            </div>
            <div>
              <h4 className="font-medium text-lg mb-4">Features</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Batch Tracking</li>
                <li>ISO Compliance</li>
                <li>Quality Analytics</li>
                <li>Visual Defects</li>
                <li>Physical Tests</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-lg mb-4">Standards</h4>
              <ul className="space-y-2 text-gray-400">
                <li>ISO 13006</li>
                <li>ISO 10545</li>
                <li>IMANOR Certification</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-lg mb-4">Contact</h4>
              <ul className="space-y-2 text-gray-400">
                <li>contact@ceramcontrol.ma</li>
                <li>+212 522 123 456</li>
                <li>Casablanca, Morocco</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>© 2024 CeramControl. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
