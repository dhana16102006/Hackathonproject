import { useEffect, useState } from "react";

export default function InstallPrompt() {
  const [installPrompt, setInstallPrompt] = useState(null);

  useEffect(() => {
    const handler = (e) => {
      e.preventDefault();
      setInstallPrompt(e);
    };

    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  if (!installPrompt) return null;

  return (
    <button
      className="install-btn"
      onClick={() => {
        installPrompt.prompt();
        installPrompt.userChoice.then(() => setInstallPrompt(null));
      }}
    >
      Install App
    </button>
  );
}
