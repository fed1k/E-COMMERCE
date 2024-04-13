'use client';

import { InputMask } from "@react-input/mask";
import { OrdersContext } from "./services/ContextProvider";
import { useContext, useEffect, useState } from "react";
import { postOrder } from "./services/services";
import Modal from "./Modal";
const Orders = () => {
  const [number, setNumber] = useState<any>()
  const [error, setError] = useState("")
  const [responseMessage, setResponseMessage] = useState("")
  const { orders, setOrders }: any = useContext(OrdersContext)

  const handleOrder = async () => {
    if (!number) return setError("Please enter a valid number")
    let numberCopy = +number.replace(/\D/g, '')

    // Validations
    
    if (numberCopy.toString().length !== 11) return setError("Please enter a valid number")
    if (!orders.length) return setError("Please add some products to order")
    setError("")

    const response = await postOrder({
      phone: numberCopy?.toString(), cart: orders.map((order: any) => {
        return { id: order.id, quantity: order.quantity }
      })
    })
    if (response.success === 1) {
      setResponseMessage("Your order has been placed successfully")
      setOrders([])
      sessionStorage.clear()
    } else {
      setResponseMessage("Something went wrong, please try again later")
    }
  }

  const handleNumberChange = (value: string) => {
    setError("")
    setNumber(value);
    sessionStorage.setItem('number', value)
  }

  // Cancel order only from UI ( since api does not have a cancel order endpoint)
  const cancelOrder = (id: number) => {
    const updatedOrders = orders.filter((order: any) => order.id !== id)
    setOrders(updatedOrders)
    sessionStorage.setItem('orders', JSON.stringify(updatedOrders))
  }

  // Clear error message when orders are added
  useEffect(() => {
    if (orders.length) setError("")
  }, [orders])

  // Auto fill number from session storage
  useEffect(() => {
    const number = sessionStorage.getItem('number')
    if (number) setNumber(number)
  }, [])

  return (
    <>
      {responseMessage && <Modal onClose={setResponseMessage} isOpen={responseMessage && true} text={responseMessage} />}
      <form className="bg-white flex flex-col sm:self-center p-4 rounded-xl sm:w-3/4 lg:w-1/2">
        <p className="text-4xl pb-3">Добавленные товары</p>
        {
          orders.length ? orders.map((order: any, index: number) => (
            <div key={index} className="grid grid-cols-3 sm:grid-cols-4 gap-4 py-2 border-b border-gray-300 items-center ">
              <p className="text-sm">{order.title}</p>
              <p className="text-end">x{order.quantity} </p>
              <p>{order.quantity ? order.price * order.quantity : order.price} ₽</p>
              <button onClick={() => cancelOrder(order.id)} className="bg-[#222222] col-span-3 sm:col-span-1 text-lg text-white rounded-lg py-1" type="button">Cancel</button>
            </div>
          )) : <p className="text-center py-6">No Orders Yet😥</p>
        }
        <p className="text-center font-semibold text-lg pb-2">Total: {orders.reduce((acc: number, obj: any) => acc + (obj.price * obj.quantity), 0)}₽</p>
        {error && <p className="text-red-500 text-center pb-2">{error}</p>}
        <div className="flex flex-col sm:flex-row sm:gap-2">
          <InputMask value={number} placeholder="+7 (___) ___-__-__" className={`rounded-xl flex-1 ${error && error !== "Please add some products to order" ? "bg-red-200 text-red-500" : "bg-[#222222] text-white"}  `} onChange={(e) => handleNumberChange(e.target.value)} mask="+7 (___) ___-__-__" replacement={{ _: /\d/ }} />
          <button onClick={handleOrder} className="bg-[#222222] flex-1 text-lg mt-2 sm:mt-0 text-white py-3 rounded-xl" type="button">Заказать</button>
        </div>
      </form>
    </>
  );
}

export default Orders;
