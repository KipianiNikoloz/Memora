import { expect, test } from "@playwright/test";

test("public homepage leads into core demo flow", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { name: "Every life deserves a library." })).toBeVisible();
  await page.getByRole("link", { name: "Start your library" }).first().click();
  await page.getByRole("button", { name: "Create account" }).click();
  await expect(page.getByRole("heading", { name: "My Library" })).toBeVisible();
});

test("user can create and revisit a memory with AI reflection", async ({ page }) => {
  await page.goto("/new-entry");
  await page.getByLabel("Moment title").fill("A brave conversation");
  await page.getByText("Proud").click();
  await page.getByLabel("What happened?").fill("I had a difficult conversation and stayed honest without being unkind.");
  await page.getByLabel("What did I learn?").fill("Directness can be caring when it is grounded.");
  await page.getByLabel("Tags").fill("conversation, courage");
  await page.getByRole("button", { name: "Save to library" }).click();
  await expect(page.getByText("AI chapter title:")).toBeVisible();
  await page.getByRole("link", { name: "Back to library" }).click();
  await expect(page.getByRole("heading", { name: "My Library" })).toBeVisible();
  await page.getByPlaceholder("Search by title, lesson, or tag").fill("courage");
  await expect(page.getByText("A brave conversation")).toBeVisible();
});

test("insights, settings, and librarian surfaces are reachable", async ({ page }) => {
  await page.goto("/insights");
  await expect(page.getByRole("heading", { name: "Your Insights" })).toBeVisible();
  await page.goto("/settings");
  await expect(page.getByRole("heading", { name: "Settings" })).toBeVisible();
  await page.getByRole("button", { name: "Motivational" }).click();
  await page.goto("/librarian");
  await expect(page.getByRole("heading", { name: "AI Librarian" })).toBeVisible();
  await page.getByLabel("What would you like to revisit?").fill("confidence");
  await expect(page.getByRole("link", { name: "Open chapter" })).toBeVisible();
});
