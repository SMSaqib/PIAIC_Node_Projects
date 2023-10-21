function generateUniqueId() {
    const now = new Date();
    const year = now.getFullYear().toString().slice(-2); // Get the last two digits of the year
    const month = String(now.getMonth() + 1).padStart(2, '0'); // Add 1 to the month since it's zero-based and pad with '0' if needed
    const day = String(now.getDate()).padStart(2, '0'); // Pad with '0' if needed
    const hours = String(now.getHours()).padStart(2, '0'); // Pad with '0' if needed
    const seconds = String(now.getMinutes()).padStart(2, '0'); // Pad with '0' if needed
  
    const uniqueId = `${year}${month}${day}${hours}${seconds}`;
    return uniqueId;
  }
  
  

export{generateUniqueId}