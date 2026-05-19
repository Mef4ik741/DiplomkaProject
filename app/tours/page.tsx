export const dynamic = "force-dynamic";

import ToursComponent from "../components/Tours";
import db from "../utils/db";

export default async function ToursPage() {
  const tours = await db.tour.findMany({
    orderBy: { createdAt: "desc" },
  });

  // Map Decimal/Dates if necessary, but Prisma v6 returns serializable primitives for plain SQLite fields
  // SQLite fields (String, Int) map directly to TS primitives

  return (
    <main style={{ paddingTop: "100px", minHeight: "calc(100vh - 400px)" }}>
      <ToursComponent tours={tours} />
    </main>
  );
}
