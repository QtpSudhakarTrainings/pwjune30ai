import { setWorldConstructor, World, IWorldOptions } from '@cucumber/cucumber';
import { Browser, BrowserContext, Page } from '@playwright/test';

/**
 * Custom Cucumber World shared across every step file in a scenario.
 * Holds the plain Playwright browser/context/page so steps can do
 * `this.page`, `this.context`, etc. without page objects.
 */
export class PlaywrightWorld extends World {
  browser!: Browser;
  context!: BrowserContext;
  page!: Page;

  constructor(options: IWorldOptions) {
    super(options);
  }
}

setWorldConstructor(PlaywrightWorld);
