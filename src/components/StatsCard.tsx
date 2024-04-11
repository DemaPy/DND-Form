import React, { ReactNode } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Skeleton } from "./ui/skeleton";

type TStatsCard = {
  title: string;
  paragraph: string;
  icon: ReactNode;
  value: string;
  loading?: boolean;
  className: string;
};

const StatsCard = ({
  className,
  icon,
  loading,
  paragraph,
  title,
  value,
}: TStatsCard) => {
  return (
    <Card className={className}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">
          {loading && (
            <Skeleton>
              <span className="opacity-0">0</span>
            </Skeleton>
          )}
          {!loading && value}
        </div>
        <p className="text-xs text-muted-foreground pt-2">{paragraph}</p>
      </CardContent>
    </Card>
  );
};

export default StatsCard;
