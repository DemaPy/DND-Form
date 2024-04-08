import React from "react";
import { GetFormStats } from "../../actions/form";
import StatsCard from "./StatsCard";
import { LuView } from "react-icons/lu";
import { FaWpforms } from "react-icons/fa";
import { HiCursorClick } from "react-icons/hi";
import { TbArrowBounce } from "react-icons/tb";

type TStatsCard = {
  loading: boolean;
  data?: Awaited<ReturnType<typeof GetFormStats>>;
};

const StatsCards = ({ data, loading }: TStatsCard) => {
  return (
    <div className="w-full pt-8 gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
      <StatsCard
        title="Total visits"
        paragraph="All time form visits"
        icon={<LuView className="text-blue-600" />}
        value={data?.visits.toLocaleString() || ""}
        loading={loading}
        className="shadow-md shadow-blue-600"
      />

      <StatsCard
        title="Total submissions"
        paragraph="All time form submissions"
        icon={<FaWpforms className="text-yellow-600" />}
        value={data?.submissions.toLocaleString() || ""}
        loading={loading}
        className="shadow-md shadow-yellow-600"
      />

      <StatsCard
        title="Submissions rate"
        paragraph="Visits that result in form submission"
        icon={<HiCursorClick className="text-green-600" />}
        value={data?.submissionsRate.toLocaleString() + "%" || ""}
        loading={loading}
        className="shadow-md shadow-green-600"
      />

      <StatsCard
        title="Bounce rate"
        paragraph="Visits that leave without ineracting"
        icon={<TbArrowBounce className="text-green-600" />}
        value={data?.bounceRate.toLocaleString() + "%" || ""}
        loading={loading}
        className="shadow-md shadow-red-600"
      />
    </div>
  );
};

export default StatsCards;
