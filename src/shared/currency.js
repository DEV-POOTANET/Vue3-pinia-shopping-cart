export const currencyTHB =(bath) =>{
  return  Intl.NumberFormat('th-TH', {
        style: 'currency',
        currency: 'THB',
      }).format(bath)
}