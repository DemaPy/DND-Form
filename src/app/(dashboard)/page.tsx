import { Suspense } from "react";
import CardStatsWrapper from "@/components/CardStatsWrapper";
import StatsCards from "@/components/StatsCards";
import { Separator } from "@/components/ui/separator";
import CreateFormBtn from "@/components/CreateFormBtn";
import FormCardSkeleton, { FormCards } from "@/components/FormCardSkeleton";

export default function Home() {
  return (
    <div className="container pt-4">
      <Suspense fallback={<StatsCards loading={true} />}>
        <CardStatsWrapper />
      </Suspense>
      <Separator className="my-6"></Separator>
      <h2 className="text-4xl font-bold col-span-2">Your forms</h2>
      <Separator className="my-6"></Separator>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <CreateFormBtn />
        <Suspense
          fallback={[1, 2, 3].map((item) => (
            <FormCardSkeleton key={item} />
          ))}
        >
          <FormCards />
        </Suspense>
      </div>
    </div>
  );
}
