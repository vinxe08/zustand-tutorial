export const dateManipulation = (date: string) => {
  let dateString: string | null = "";
  for(let i = 0; i < 4; i++ ){
    dateString += date[i];
  }
  return dateString
}