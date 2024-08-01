import CenteredBox from "./components/CenteredBox";
import Navbar from "./components/Navbar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // staleTime: 60 * 1000,
      staleTime: 0,
    },
  },
});

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Navbar />
        <CenteredBox />
      </QueryClientProvider>
    </>
  );
}

export default App;
