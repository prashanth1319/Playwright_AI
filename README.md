
# ZeroStep Playwright AI Demo

Supercharge your Playwright tests with AI using `@zerostep/playwright`.

This repository demonstrates an AI-driven signup test on `https://automationexercise.com/login` using ZeroStep's `ai()` function.

## Setup

1. Install dependencies:

   ```sh
   npm install
   ```

2. Install Playwright browsers if needed:

   ```sh
   npx playwright install
   ```

3. Create a `.env` file in the project root with a password for the signup flow:

   ```env
   TEST_PASSWORD=YourSecurePassword123
   ```

## ZeroStep configuration

This package supports a ZeroStep token exposed through the environment or stored in `zerostep.config.json`.

Option 1: environment variable

```sh
export ZEROSTEP_TOKEN="<your token here>"
```

Option 2: `zerostep.config.json`

```json
{
  "TOKEN": "<your token here>"
}
```

> The current repo includes `zerostep.config.json` with a demo token placeholder. Do not commit production tokens.

## Import and use `ai`

```ts
import { test, expect } from '@playwright/test'
import { ai } from '@zerostep/playwright'
import 'dotenv/config'

test('Signup flow using Zerostep AI', async ({ page }) => {
  const aiArgs = { page, test }
  await page.goto('https://automationexercise.com/login', { waitUntil: 'domcontentloaded' })
  await page.waitForLoadState('networkidle')

  await ai('In the New User Signup section, enter "Prashant G" in the Name field', aiArgs)
  await ai('In the New User Signup section, enter "prashantg07@gmail.com" in the Email Address field', aiArgs)
  await ai('Click the Signup button in the New User Signup section', aiArgs)
})
```

## Usage

At minimum, `ai()` requires a prompt and an argument object containing `page` and `test`.

```ts
await ai('<your prompt>', { page, test })
```

You can also pass multiple prompts in an array. Prompts run in chunks and the default chunk size is `10`.

```ts
await ai(['<prompt 1>', '<prompt 2>', '<prompt 3>'], { page, test })
```

## Supported Browsers

ZeroStep AI steps currently only support Chromium browsers.

## Additional options

```ts
const options = {
  debug?: boolean,
  type?: 'action' | 'assert' | 'query',
  model?: 'GPT_3.5',
  disableScroll?: boolean,
  parallelism?: number,
  failImmediately?: boolean,
}

await ai('<your prompt>', { page, test }, options)
```

## Supported action types

- `action`: simulates user interactions like click, text input, hover, enter, scroll, and navigation.
- `query`: returns text from the page.
- `assert`: returns `true` or `false` for a visible assertion.

## Project files

- `tests/signUp.spec.ts`: the AI-driven signup test.
- `playwright.config.ts`: currently empty; default Playwright test settings apply.
- `zerostep.config.json`: stores the ZeroStep token.

## Run the test

```sh
npx playwright test tests/signUp.spec.ts
```

## Best practices

- Write prompts in clear English.
- Use quotes around exact text, e.g. `"Click the \"Login\" button"`.
- Avoid CSS/XPath selectors in prompts.
- Prefer one action per prompt, unless the prompt describes a single logical task.

## Community

Have questions or suggestions? Join our Discord:

https://discord.gg/BcDmfWqSGe

<br>
<br>
<div align="center">
  <picture>
    <source
      srcset="https://github.com/zerostep-ai/zerostep/assets/1895887/74ad3b31-ac30-4376-be58-236cf1f7c033"
      media="(prefers-color-scheme: dark)"
      height="60" width="60"
    />
    <img
      src="https://github.com/zerostep-ai/zerostep/assets/1895887/9a9a848a-302c-4a6e-8f4a-dd7e7633757d"
      alt="ZeroStep Logo"
      height="60" width="60"
    />
  </picture>
</div>
