// DO NOT EDIT. This file is generated by Fresh.
// This file SHOULD be checked into source version control.
// This file is automatically updated during development when running `dev.ts`.

import * as $_404 from "./routes/_404.tsx";
import * as $_app from "./routes/_app.tsx";
import * as $fortunewheel from "./routes/fortunewheel.tsx";
import * as $index from "./routes/index.tsx";
import * as $FortuneWheel from "./islands/FortuneWheel.tsx";
import * as $GoToFortuneWheelButton from "./islands/GoToFortuneWheelButton.tsx";
import * as $ReviewButton from "./islands/ReviewButton.tsx";
import type { Manifest } from "$fresh/server.ts";

const manifest = {
  routes: {
    "./routes/_404.tsx": $_404,
    "./routes/_app.tsx": $_app,
    "./routes/fortunewheel.tsx": $fortunewheel,
    "./routes/index.tsx": $index,
  },
  islands: {
    "./islands/FortuneWheel.tsx": $FortuneWheel,
    "./islands/GoToFortuneWheelButton.tsx": $GoToFortuneWheelButton,
    "./islands/ReviewButton.tsx": $ReviewButton,
  },
  baseUrl: import.meta.url,
} satisfies Manifest;

export default manifest;
