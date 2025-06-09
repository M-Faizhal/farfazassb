export const toLocal = (plain) =>{
    
     const parsedDate = new Date(plain);
    
    return parsedDate.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}