import React, { useState, useEffect, useRef } from "react";
import { History, BookOpen, Settings, Menu, Notebook } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { decodeJwt } from "./utils/jwt";
import NavItem from "./components/NavItem";
import AppRoutes from "./routes/AppRoutes";

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [entries, setEntries] = useState([]);
  const [newEntry, setNewEntry] = useState("");
  const [aiResponses, setAiResponses] = useState([]);
  const hasAnimatedRef = useRef(new Set());
  const navigate = useNavigate();
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [userData, setUserData] = useState(null);
  const location = useLocation();

  // Retrieve user authentication from local storage
  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUser = localStorage.getItem("userData");
    if (token && storedUser) {
      setIsSignedIn(true);
      setUserData(JSON.parse(storedUser));
    }
  }, []);

  // Handle token from URL params (if any)
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get("token");
    if (token) {
      try {
        const decoded = decodeJwt(token);
        setUserData(decoded);
        localStorage.setItem("userData", JSON.stringify(decoded));
        localStorage.setItem("token", token);
        localStorage.setItem("isSignedIn", "true");
        setIsSignedIn(true);
        navigate(location.pathname, { replace: true });
      } catch (error) {
        console.error("Failed to decode token:", error);
      }
    }
  }, [location.search, location.pathname, navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userData");
    localStorage.setItem("isSignedIn", "false");
    setIsSignedIn(false);
    setUserData(null);
    // Navigate to SignIn page (adjust the path if necessary)
    navigate("/landingpage");
  };


  // Function to handle adding a new journal entry
  async function handleAddEntry() {
    if (!newEntry.trim()) return;
    try {
      const response = await fetch("http://localhost:5000/api/journals/entries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ entry_text: newEntry }),
      });
      if (!response.ok) throw new Error("Failed to save entry.");
      const savedEntry = await response.json();
      const userEntry = { id: savedEntry.entry.id, role: "user", content: newEntry };
      const aiResponse = { id: Date.now(), role: "ai", content: "That's a great thought! How do you feel about it?" };
      setEntries((prev) => [savedEntry.entry, ...prev]);
      setAiResponses((prev) => [...prev, userEntry, aiResponse]);
      setNewEntry("");
      navigate("/journal");
    } catch (error) {
      console.error("Error saving entry:", error);
    }
  }

  // Function to fetch prompt data based on entry text
  async function getPrompt(entryText) {
    try {
      const response = await fetch(`http://localhost:5000/api/journals/prompt?entryText=${encodeURIComponent(entryText)}`);
      if (!response.ok) throw new Error("Failed to fetch prompt");
      return await response.json();
    } catch (error) {
      console.error("Error fetching prompt:", error);
      return null;
    }
  }

  return (
    <div className="flex h-screen bg-neutral-50 text-neutral-800 font-sans">
      {/* Show sidebar only when user is signed in and NOT on the /landingpage route */}
      {userData && location.pathname !== "/landingpage" && (
        <aside
          className={`bg-white shadow-md flex flex-col items-center py-8 space-y-8 transition-all duration-300 ${
            isSidebarOpen ? "w-40" : "w-0 hidden"
          } sm:w-16`}
        >
          <button
            className="p-2 rounded-lg hover:bg-neutral-100 transition-colors duration-200 sm:hidden"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            <Menu className="w-6 h-6 text-neutral-600" />
          </button>
          <NavItem icon={History} label="History" to="/history" />
          <NavItem icon={BookOpen} label="Home" to="/home" />
          <NavItem icon={Notebook} label="Journal" to="/journal" />
          <NavItem icon={Settings} label="Settings" to="/settings" />
        </aside>
      )}

      <main className="flex-1 flex flex-col items-center justify-center w-full">
        <div className="w-full max-w-screen">
          <AppRoutes
            newEntry={newEntry}
            setNewEntry={setNewEntry}
            handleAddEntry={handleAddEntry}
            aiResponses={aiResponses}
            getPrompt={getPrompt}
            userData={userData}
            hasAnimatedRef={hasAnimatedRef}
            handleLogout={handleLogout}
          />
        </div>
      </main>
    </div>
  );
}

export default App;
