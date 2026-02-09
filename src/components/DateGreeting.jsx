export default function DateGreeting() {
  const now = new Date();
  const hour = now.getHours();

  const greeting =
    hour < 12
      ? "Morning"
      : hour < 17
      ? "Afternoon"
      : "Evening";

  const formattedDate = now.toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return (
    <>
      <h2>{greeting}, Buddy</h2>
      <p className="date">{formattedDate}</p>
    </>
  );
}
