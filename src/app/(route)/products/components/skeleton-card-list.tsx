import { SwitchCase } from "@/app/components/switch-case";
import { Skeleton, Grid, Box } from "@radix-ui/themes";

interface Props {
  productListMode: "list" | "grid";
}

export function SkeletonCardList({ productListMode }: Props) {
  return (
    <div>
      <Skeleton width={"150px"} height={"40px"} className="my-2" />
      <SwitchCase
        value={productListMode}
        caseBy={{
          grid: <GridSkeleton />,
          list: <ListSktletion />,
        }}
      />
    </div>
  );
}

function GridSkeleton() {
  return (
    <Grid columns={"4"} gap="4">
      {Array.from({ length: 20 }).map((_, index) => (
        <Skeleton width={"300px"} height={"380px"} key={index} />
      ))}
    </Grid>
  );
}

function ListSktletion() {
  return (
    <Box width={"100"} className="flex gap-3 flex-col">
      {Array.from({ length: 20 }).map((_, index) => (
        <Skeleton width={"100%"} height={"210px"} key={index} />
      ))}
    </Box>
  );
}
