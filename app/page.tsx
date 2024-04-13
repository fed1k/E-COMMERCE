import Card from "./Card";
import Loading from "./Loading";
import Orders from "./Orders";
import SanitizedHTML from "./SanitizeHTML";
import ContextProvider from "./services/ContextProvider";
import { fetchCards, fetchReviews } from "./services/services";
export default async function Page() {
  const reviews = await fetchReviews();
  const cards = await fetchCards();

  return (
    <div className="flex flex-col gap-4 p-4 mt-[5%]">
      <div className="flex flex-col md:flex-row gap-4 pb-[14%] sm:pb-[8%]">
        {reviews.map((review: any, index: number) => (
          <SanitizedHTML html={review.text} key={index} />
        ))}
      </div>
      <ContextProvider>
        <Orders />
        <div className="grid gap-4 sm:grid-cols-2 md:gap-6 lg:grid-cols-3 md:mx-[5%] xl:mx-[10%]">
          {cards?.products?.length ? cards.products.map((card: any, index: number) => (
            <Card item={card} index={index} />
          )) : <></>}
        </div>
        <Loading />
      </ContextProvider>
    </div>
  );
}
