export default async function postdata (api,data) {
      const response = await fetch(`http://localhost:8080/${api}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
	 return response 
}