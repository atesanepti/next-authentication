export const setValue = (name: string, value: string) => {
  localStorage.setItem(name, value);
};

export const getValue = (name: string) => {
  const value = localStorage.getItem(name);
  if (!value) {
    return null;
  }
  return value;
};


export const clearValue = (name  : string)=>{
  localStorage.removeItem(name)
}