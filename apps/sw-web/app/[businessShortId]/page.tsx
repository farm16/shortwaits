export default async function Page({
  params,
  searchParams,
}: {
  params: { businessShortId: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  return <div>{"hello "}</div>;
}
