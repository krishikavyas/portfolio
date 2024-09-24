export function calculateReadingTime(htmlContent, wpm = 200) {
    const text = htmlContent.replace(/<\/?[^>]+(>|$)/g, ' ');
  
    const words = text.trim().split(/\s+/).length;
  
    const readingTime = words / wpm;
  
    const minutes = Math.floor(readingTime);
    const seconds = Math.floor((readingTime - minutes) * 60);
  
    if (minutes > 0) {
      return `${minutes} min ${seconds} sec`;
    } else {
      return `${seconds} sec`;
    }
}
  