test("TEST BUG DB LEAK in /api/v1/migrations DELETE", async () => {
  const response = await fetch("http://localhost:3000/api/v1/migrations", {
    method: "DELETE",
  });

  expect(response.status).toBe(405); // Method Not Allowed
});

test("TEST BUG DB LEAK in /api/v1/status DELETE", async () => {
  const response = await fetch("http://localhost:3000/api/v1/status", {
    method: "GET",
  });

  const responseBody = await response.json();
  expect(responseBody.dependencies.database.opened_connections).toBe(1);
});
