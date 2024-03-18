export function getNextSeventhDayDate(createdAt) {
    const currentDate = new Date(createdAt); // Get the current date
    const nextSeventhDay = new Date(createdAt); // Create a new date object
    nextSeventhDay.setDate(currentDate.getDate() + 7); // Set the date to 7 days ahead
  
    return nextSeventhDay.toDateString();
  }
  