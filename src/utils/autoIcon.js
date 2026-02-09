export function autoIcon(text) {
  const t = text.toLowerCase();

  const iconMap = [
    { icon: "🥤", keywords: ["water", "drink", "hydrate", "juice"] },
    { icon: "🍎", keywords: ["eat", "diet", "fruit", "healthy"] },
    { icon: "🏃", keywords: ["run", "running", "jog"] },
    { icon: "🚶", keywords: ["walk", "walking", "steps"] },
    { icon: "🧘", keywords: ["meditate", "yoga", "mindfulness"] },
    { icon: "🏋️", keywords: ["gym", "workout", "exercise"] },
    { icon: "🚴", keywords: ["cycle", "bike"] },
    { icon: "📖", keywords: ["read", "book"] },
    { icon: "📚", keywords: ["study", "exam", "learning"] },
    { icon: "💻", keywords: ["code", "coding", "programming"] },
    { icon: "📝", keywords: ["write", "journal", "notes"] },
    { icon: "🎵", keywords: ["music", "sing", "song"] },
    { icon: "😴", keywords: ["sleep", "nap", "rest"] },
    { icon: "🪥", keywords: ["brush", "teeth"] },
    { icon: "🚿", keywords: ["bath", "shower"] },
    { icon: "🧹", keywords: ["clean", "room", "house"] },
    { icon: "📅", keywords: ["plan", "schedule"] },
  ];

  for (const item of iconMap) {
    if (item.keywords.some((k) => t.includes(k))) {
      return item.icon;
    }
  }

  return "✅";
}
