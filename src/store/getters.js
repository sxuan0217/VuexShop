export const getloginstatus = state => {
  return {
    authorized: state.facebook.authorized,
    profile:state.facebook.profile,
    product:state.facebook.product
 }
}
export const getAllstate = state => state 