import { Switch, Route } from "wouter";
import { TooltipProvider } from "@/components/ui/tooltip";
import ComponentShowcase from "@/pages/component-showcase";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={ComponentShowcase} />
      <Route path="/showcase" component={ComponentShowcase} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <TooltipProvider>
      <Router />
    </TooltipProvider>
  );
}

export default App;
