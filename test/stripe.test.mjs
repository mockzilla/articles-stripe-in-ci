import { test } from "node:test";
import assert from "node:assert/strict";

const base = process.env.STRIPE_BASE_URL;
if (!base) throw new Error("STRIPE_BASE_URL is not set");

// Spaced out because plans cap throughput and a burst from CI trips the limit.
async function call(path, options = {}) {
  await new Promise((resolve) => setTimeout(resolve, 300));
  return fetch(`${base}${path}`, options);
}

test("reads a customer", async () => {
  const res = await call("/v1/customers/cus_123");
  assert.equal(res.status, 200);
});

test("creates a customer", async () => {
  const res = await call("/v1/customers", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ email: "buyer@example.com" }),
  });
  assert.equal(res.status, 200);
});
