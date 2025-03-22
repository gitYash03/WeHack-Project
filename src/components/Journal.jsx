import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

function Journal({ hasAnimatedRef }) {
  const [displayedMessages, setDisplayedMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [aiTyping, setAiTyping] = useState(false);
  const [isAiTypingComplete, setIsAiTypingComplete] = useState(true); // Initially true

  // Fetch AI Response from Backend API
  const fetchAIResponse = async (userMessage) => {
    try {
      const response = await fetch("http://localhost:5000/api/journals/prompt", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ entryText: userMessage }),
      });
      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
      const data = await response.json();
      return data?.prompt?.trim() ?? "No prompt received.";
    } catch (error) {
      console.error("Error fetching AI response:", error);
      return "Oops! Something went wrong. Please try again.";
    }
  };

  // Handle user message submission
  const handleAddEntry = async (message) => {
    if (!message.trim()) return;

    setIsAiTypingComplete(false); // Disable input and buttons
    setAiTyping(true);

    const userEntry = { id: Date.now(), role: "user", content: message };
    setDisplayedMessages((prev) => [...prev, userEntry]);
    setNewMessage("");

    try {
      const aiResponse = await fetchAIResponse(message);
      const aiEntry = { id: Date.now() + Math.random(), role: "ai", content: aiResponse };
      setDisplayedMessages((prev) => [...prev, aiEntry]);
    } catch (error) {
      console.error("Error handling entry:", error);
      setDisplayedMessages((prev) => [
        ...prev,
        { id: Date.now(), role: "ai", content: "Oops! Something went wrong. Please try again." },
      ]);
    } finally {
      setAiTyping(false);
    }
  };

  // Save Journal Entry
  const handleSaveJournal = async () => {
    try {
      const storedUser = localStorage.getItem("userData");
      const userData = storedUser && JSON.parse(storedUser);
      const userId = userData?.sub || userData?.id;
      if (!userId) throw new Error("User is not signed in.");

      const conversationText = displayedMessages
        .map((msg) => `${msg.role === "user" ? "User:" : "Prompt:"} ${msg.content}`)
        .join("\n");

      const entryDate = new Date().toISOString().split("T")[0];

      const payload = {
        userId,
        entryText: conversationText,
        entry_date: entryDate,
      };

      console.log(payload);

      const response = await fetch("http://localhost:5000/api/journals/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error("Failed to save journal entry.");
      console.log("Journal saved successfully:", await response.json());
    } catch (error) {
      console.error("Error saving journal entry:", error);
    }
  };

  return (
    <div className="space-y-4 p-6 min-h-screen bg-white">
      <h1 className="text-2xl font-semibold text-center mb-4">Journal Entries</h1>

      {displayedMessages.length === 0 ? (
        <p className="text-gray-500 text-center">Start writing</p>
      ) : (
        displayedMessages.map((message) =>
          message.role === "ai" ? (
            <TypingText
              key={message.id}
              text={message.content}
              messageId={message.id}
              hasAnimatedRef={hasAnimatedRef}
              setIsAiTypingComplete={setIsAiTypingComplete}
            />
          ) : (
            <p key={message.id} className="p-3 rounded-lg text-black font-bold text-lg">
              {message.content}
            </p>
          )
        )
      )}

      {aiTyping && <p className="text-gray-500 italic text-left">AI is thinking...</p>}

      {isAiTypingComplete && (
        <div className="mt-6 flex flex-col items-start gap-2 w-full">
          <textarea
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className="p-2 w-full resize-none focus:ring-0 outline-none bg-transparent"
            placeholder="Write your thoughts..."
          />
          <div className="flex gap-2">
            <button
              onClick={() => handleAddEntry(newMessage)}
              className="bg-gradient-to-r from-black to-gray-500 text-white px-4 py-2 rounded-md hover:opacity-90 transition-all"
            >
              Go Deeper
            </button>
            <button
              onClick={handleSaveJournal}
              className="bg-gradient-to-r from-black to-gray-500 text-white px-4 py-2 rounded-md hover:opacity-90 transition-all"
            >
              Save Journal
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// Typing effect component for AI responses
function TypingText({ text, messageId, hasAnimatedRef, setIsAiTypingComplete }) {
  const [displayedText, setDisplayedText] = useState("");
  const animationRef = useRef(null);

  useEffect(() => {
    if (hasAnimatedRef.current.has(messageId)) {
      setDisplayedText(text);
      setIsAiTypingComplete(true); // Reactivate input and buttons
      return;
    }

    let currentIndex = 0;
    const typeCharacter = () => {
      if (currentIndex < text.length) {
        setDisplayedText((prev) => prev + text[currentIndex]);
        currentIndex++;
        animationRef.current = setTimeout(typeCharacter, 30);
      } else {
        hasAnimatedRef.current.add(messageId);
        setIsAiTypingComplete(true); // Reactivate input and buttons
      }
    };

    typeCharacter();
    return () => clearTimeout(animationRef.current);
  }, [text, messageId, hasAnimatedRef, setIsAiTypingComplete]);

  return (
    <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-3 rounded-lg text-black text-base">
      {displayedText}
    </motion.p>
  );
}

export default Journal;
