// validate email
export const isValiEmail = (stringEmail) => (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(stringEmail)) ;
// validate password
export const isValiPassord = (stringPassword) => stringPassword.length >= 3;        
  

