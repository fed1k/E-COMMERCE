'use client'

import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { fetchCards } from "./services/services";
import Card from "./Card";
const Loading = () => {
  const [cards, setCards] = useState([])
  const [page, setPage] = useState(1)

  const { ref, inView } = useInView()

  const fetchMoreCards = async () => {
    const newPage = page + 1
    setPage(newPage)
    const newCards = await fetchCards(newPage)
    setCards([...cards, ...newCards.products] as any)
  }

  useEffect(() => {
    if (inView) fetchMoreCards()
  }, [inView])

  return (
    <>
      <div className="grid gap-4 sm:grid-cols-2 md:gap-6 lg:grid-cols-3 md:mx-[5%] xl:mx-[10%]">
        {cards?.length ? cards.map((card, index) => (
          <Card item={card} index={index} />
        )) : <></>}
      </div>
      <p ref={ref} className="text-white text-center">Loading...</p>
    </>
  );
}

export default Loading;