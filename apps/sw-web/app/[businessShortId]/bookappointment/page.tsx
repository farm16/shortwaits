async function getBusiness(businessShortId: string, clientId: string) {
  const res = await fetch(`http://127.0.0.1:8080/v1/shortwaits/booking?businessShortId=${businessShortId}${clientId ? `?clientId=${clientId}` : ""}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    return {
      error: {
        status: res.status,
        message: res.statusText,
      },
      data: null,
    };
  }

  return {
    error: null,
    data: await res.json(),
  };
}

export default async function Page({ params, searchParams }: { params: { businessShortId: string }; searchParams?: { [key: string]: string | string[] | undefined } }) {
  const { businessShortId } = params;

  const { data: response, error } = await getBusiness(businessShortId, "");
  const clientUserId = searchParams?.clientUserId;

  return (
    <div>
      <div>
        My business short id: {params.businessShortId}
        <br />
        My business: {JSON.stringify(response.data.businesses)}
        My clientUserId: {clientUserId ? clientUserId : "no user id"}
        <br />
        My error: {JSON.stringify(error)}
      </div>
      <div>{/* <Calendar /> */}</div>
    </div>
  );
}
