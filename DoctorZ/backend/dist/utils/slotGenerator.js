export const generateTimeSlots = (start, end, interval = 15) => {
    const slots = [];
    let current = new Date(`1970-01-01T${start}:00`);
    const endTime = new Date(`1970-01-01T${end}:00`);
    while (current < endTime) {
        const timeString = current.toTimeString().slice(0, 5); // "HH:MM"
        slots.push({ time: timeString, isActive: true });
        current.setMinutes(current.getMinutes() + interval);
    }
    return slots;
};
//# sourceMappingURL=slotGenerator.js.map