export function getRemindersForRoom(room) {
  try {
    const all = JSON.parse(localStorage.getItem("hotel_reminders") || "[]");
    return all.filter((r) => r.room === room);
  } catch {
    return [];
  }
}
