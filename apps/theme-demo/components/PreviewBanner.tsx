"use client";

import { useEffect, useState } from "react";

export default function PreviewBanner() {
  const [isPreview, setIsPreview] = useState(false);

  useEffect(() => {
    // Check if we're in preview mode by looking for the preview cookie
    const checkPreviewMode = () => {
      const cookies = document.cookie.split(";");
      const hasPreviewCookie = cookies.some(
        (cookie) =>
          cookie.trim().startsWith("__prerender_bypass=") ||
          cookie.trim().startsWith("__next_preview_data=")
      );
      setIsPreview(hasPreviewCookie);
    };

    checkPreviewMode();
  }, []);

  const exitPreview = async () => {
    try {
      await fetch("/api/exit-preview", {
        method: "POST",
      });
      window.location.reload();
    } catch (error) {
      console.error("Failed to exit preview mode:", error);
    }
  };

  if (!isPreview) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-yellow-400 text-black p-2 text-center text-sm font-medium">
      <div className="flex items-center justify-center gap-4">
        <span>📝 Preview Mode Active - You are seeing draft content</span>
        <button
          onClick={exitPreview}
          className="bg-black text-yellow-400 px-3 py-1 rounded text-xs hover:bg-gray-800 transition-colors"
        >
          Exit Preview
        </button>
      </div>
    </div>
  );
}
