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
  await page
    .getByLabel("What happened?")
    .fill("I had a difficult conversation and stayed honest without being unkind.");
  await page.getByLabel("What did I learn?").fill("Directness can be caring when it is grounded.");
  await page.getByLabel("Tags").fill("conversation, courage");
  const saveButton = page.getByRole("button", { name: "Save to library" });
  await expect(saveButton).toBeEnabled();
  await saveButton.click();
  await expect(page).toHaveURL(/\/entry\//, { timeout: 15000 });
  await expect(page.getByText(/AI chapter title:/)).toBeVisible();
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

test("user can issue a mocked XRPL milestone badge from insights", async ({ page }) => {
  await page.route("**/api/xrpl/badges/wallet", async (route) => {
    await route.fulfill({
      contentType: "application/json",
      body: JSON.stringify({
        address: "rDemoRecipient",
        seed: "sDemoSeed",
        network: "testnet",
        createdAt: "2026-04-25T12:00:00.000Z",
      }),
    });
  });
  await page.route("**/api/xrpl/badges/issue", async (route) => {
    await route.fulfill({
      contentType: "application/json",
      body: JSON.stringify({
        issuerAddress: "rIssuer",
        recipientAddress: "rDemoRecipient",
        nftokenId: "00080000ABC",
        offerId: "offer-1",
        mintTxHash: "mint-hash",
        offerTxHash: "offer-hash",
        acceptTxHash: "accept-hash",
        metadataUri: "data:application/json,%7B%7D",
      }),
    });
  });

  await page.goto("/insights");
  await expect(page.getByRole("heading", { name: "XRPL Badge" }).first()).toBeVisible();
  await page.getByRole("button", { name: "Issue badge" }).first().click();
  await expect(page.getByRole("button", { name: "Badge issued" }).first()).toBeVisible();
  await expect(page.getByRole("link", { name: "View NFT" }).first()).toBeVisible();
});

test("library layout keeps cards and filters usable", async ({ page, isMobile }) => {
  await page.goto("/library");

  await expect(page.getByRole("heading", { name: "My Library" })).toBeVisible();
  await expect(page.getByPlaceholder("Search by title, lesson, or tag")).toBeVisible();
  await expect(page.getByLabel("Emotion")).toBeVisible();
  await expect(page.getByRole("link", { name: /A Small Win at Work/ })).toBeVisible();
  await expect(page.getByRole("heading", { name: "AI Librarian" })).toBeVisible();

  await page.getByLabel("Emotion").selectOption("Proud");
  await expect(page.getByRole("link", { name: /A Small Win at Work/ })).toBeVisible();

  if (isMobile) {
    const hasHorizontalOverflow = await page.evaluate(
      () => document.documentElement.scrollWidth > document.documentElement.clientWidth,
    );
    expect(hasHorizontalOverflow).toBe(false);
  }
});

test("mobile header menu exposes app navigation", async ({ page, isMobile }) => {
  test.skip(!isMobile, "Mobile menu is only shown in mobile project.");

  await page.goto("/");
  await page.getByRole("button", { name: "Open navigation menu" }).click();
  const mobilePanel = page.locator(".mobile-nav-panel");
  await expect(mobilePanel.getByRole("link", { name: "Library", exact: true })).toHaveCount(1);
  await expect(mobilePanel.getByRole("link", { name: "Insights", exact: true })).toHaveCount(1);
  await expect(mobilePanel.getByRole("link", { name: "New Entry" })).toBeVisible();
  await expect(mobilePanel.getByRole("link", { name: "AI Librarian" })).toBeVisible();
  await expect(mobilePanel.getByRole("link", { name: "Settings" })).toBeVisible();

  await mobilePanel.getByRole("link", { name: "New Entry" }).click();
  await expect(page.getByRole("heading", { name: "New Entry" })).toBeVisible();
  await expect(page.getByRole("button", { name: "Open navigation menu" })).toBeVisible();

  await page.getByRole("button", { name: "Open navigation menu" }).click();
  await expect(page.locator(".mobile-nav-panel").getByRole("link", { name: "Settings" })).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.locator(".mobile-nav-panel").getByRole("link", { name: "Settings" })).toBeHidden();
});
