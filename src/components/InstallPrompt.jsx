import { useEffect, useState } from "react";

const isMobile = () =>
  /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

export default function InstallPrompt() {
  const [installPrompt, setInstallPrompt] = useState(null);

  useEffect(() => {
    // ❌ Do not show on desktop
    if (!isMobile()) return;

    const handler = (e) => {
      e.preventDefault(); // stop default browser banner
      setInstallPrompt(e);
      console.log("Install prompt ready");
    };

    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  if (!installPrompt) return null;

  const handleInstall = async () => {
    installPrompt.prompt();
    await installPrompt.userChoice;
    setInstallPrompt(null);
  };

  return (
    <button className="install-btn" onClick={handleInstall}>
      📲 Install App
    </button>
  );
}
