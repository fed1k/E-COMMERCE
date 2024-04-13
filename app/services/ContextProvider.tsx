'use client';

import { createContext, useEffect, useState } from "react"
export const OrdersContext = createContext({});

const ContextProvider = ({children}: any) => {
  const [orders, setOrders] = useState([])

  useEffect(() => {
    const orders = sessionStorage.getItem('orders')
    if (orders) setOrders(JSON.parse(orders))
  }, [])

  return (
    <OrdersContext.Provider value={{orders, setOrders}}>
      {children}
    </OrdersContext.Provider>
  )
}

export default ContextProvider