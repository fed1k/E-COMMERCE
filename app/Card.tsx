'use client';

import { useContext, useEffect, useState } from "react";
import { OrdersContext } from "./services/ContextProvider";

const Card = ({ item, index }: any) => {
  const [quantity, setQuantity] = useState(0)
  const {orders, setOrders}: any = useContext(OrdersContext)

  const handleAmountAdd = () => {
    setQuantity((prev) => prev + 1)
    const order = orders.find((order: any) => order.id === item.id)
    if (order) {
      const updatedOrders = orders.map((order: any) => {
        if (order.id === item.id) {
          return {...order, quantity: order.quantity + 1}
        }
        return order
      })
      setOrders(updatedOrders)
      sessionStorage.setItem('orders', JSON.stringify(updatedOrders))


    }else {
      setOrders((prev: any) => [...prev, {...item, quantity: 1}])
      sessionStorage.setItem('orders', JSON.stringify([...orders, {...item, quantity: 1}]))
    }
  }
  

  const handleAmountMinus = () => {
    setQuantity((prev) => prev - 1)
    const order = orders.find((order: any) => order.id === item.id)
    if (order.quantity === 1) {
      setOrders(orders.filter((order: any) => order.id !== item.id))
      sessionStorage.setItem('orders', JSON.stringify(orders.filter((order: any) => order.id !== item.id)))
    }
    if (order && order.quantity > 1) {
      const updatedOrders = orders.map((order: any) => {
        if (order.id === item.id) {
          return {...order, quantity: order.quantity - 1}
        }
        return order
      })
      setOrders(updatedOrders)
      sessionStorage.setItem('orders', JSON.stringify(updatedOrders))
    }
  }

  const handleAmountChange = (value: number) => {
    setQuantity(value)
    const order = orders.find((order: any) => order.id === item.id)
    if (!value) {
      setOrders(orders.filter((order: any) => order.id !== item.id))
      sessionStorage.setItem('orders', JSON.stringify(orders.filter((order: any) => order.id !== item.id)))
    }
    if (order && value) {
      const updatedOrders = orders.map((order: any) => {
        if (order.id === item.id) {
          return {...order, quantity: value}
        }
        return order
      })
      setOrders(updatedOrders)
      sessionStorage.setItem('orders', JSON.stringify(updatedOrders))
    }
  }

  // Set the quantity of the item if it is already in the cart
  useEffect(() => {
    const order = orders.find((order: any) => order.id === item.id)
    if (order) {
      setQuantity(order.quantity)
    // Order not available in the cart
    } else {
      setQuantity(0)
    }
  }, [orders])

  return (
    <section key={index} className="flex bg-white flex-col gap-3 p-3 rounded-lg">
      <img className="w-fit h-fit rounded-xl self-center" src={item.image_url} alt="Product Image" />
      <h2 className="text-center" title={item.title}>{item.title}</h2>
      <p className="text-sm">{item.description}</p>
      <div className="w-full mt-auto">
        <p className=" text-4xl text-center">Цена: {quantity ? item.price * quantity : item.price}₽</p>
        {quantity === 0 && <button onClick={handleAmountAdd} className="bg-[#222222] w-full mt-2 text-white py-3 rounded-xl" type="button">Купить</button>}
        {quantity > 0 &&
          <div className="flex gap-2 items-center">
            <button onClick={handleAmountMinus} className="bg-[#222222] mt-2 text-white px-5 py-3 rounded-xl" type="button">-</button>
            <input onChange={(e) => handleAmountChange(+e.target.value.replace(/\D/g, ''))} value={quantity} type="text" className="bg-[#222222] w-full text-white self-stretch mt-2 rounded-xl" />
            <button onClick={handleAmountAdd} className="bg-[#222222]  mt-2 text-white px-5 py-3 rounded-xl" type="button">+</button>
          </div>
        }
      </div>
    </section>
  );
}

export default Card;