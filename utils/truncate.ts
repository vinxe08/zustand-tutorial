export const truncate = (str:string, count:number) => {
  return str?.length > count ? str.substring(0, count -1) + "..." : str; 
}