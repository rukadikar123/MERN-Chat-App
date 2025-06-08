import Sidebar from "../components/Sidebar";
import MessageArea from "../components/MessageArea";

// Home page component that renders the main chat layout
function Home() {
  return (
    // Main container with flex layout to place Sidebar and MessageArea side by side
    <div className="flex w-full h-[100vh]">
      {/* Sidebar component */}
      <Sidebar />
      {/* MessageArea component    */}
      <MessageArea />
    </div>
  );
}

export default Home;
