# expo-template

Production-oriented Expo + React Native starter: **Expo Router** (file routes in `app/`), **TypeScript (strict)**, **NativeWind v4**, **React Native Paper**, **@gorhom/bottom-sheet** v5, **Reanimated** + **Gesture Handler**, **Redux Toolkit** with **feature folders**, and a small **API layer** (Axios + thin wrappers).

Hermes and the **New Architecture** are enabled in [app.json](app.json).

## Scripts

| Command | Description |
|--------|-------------|
| `npm start` | Start the dev server |
| `npm run android` / `npm run ios` / `npm run web` | Run on a platform |
| `npm run lint` | ESLint (Expo flat config, `no-explicit-any`) |

## Data flow (mandatory)

**UI → dispatch(async thunk) → API helpers → Axios client → reducers → selectors → UI**

- Screens and components do **not** call `fetch` or raw Axios.
- Side effects and HTTP live in **RTK async thunks** inside `features/<name>/`.
- Register each feature reducer only in [store/store.ts](store/store.ts). Other code imports that feature’s **public** [index.ts](features/auth/index.ts) (thunks, selectors, types)—not its slice file.

## Project layout

| Path | Role |
|------|------|
| `app/` | Expo Router routes and layouts |
| `app/(auth)/` | Unauthenticated stack (e.g. login) |
| `app/(drawer)/` | Authenticated drawer; nested `(tabs)` for the demo |
| `features/<feature>/` | Slice (only imported by the store), thunks, selectors, types, public `index.ts` |
| `components/common/` | Reusable primitives |
| `components/domains/` | Domain UI (empty placeholder) |
| `config/axiosClient.ts` | Single Axios instance, auth header, 401 → `logout` |
| `api/methods.ts` | `get` / `post` / `put` / `patch` / `del` |
| `store/` | `store.ts`, typed hooks |
| `types/` | Add shared cross-cutting types here |
| `utils/fileCache.ts` | LRU cache for file **metadata/URIs**—not blobs in Redux |
| `i18n/` | `i18next` + `expo-localization` |
| `providers/` | `UpdatesGate` (OTA fetch), `AlertsProvider` (global snackbar) |

## Providers (outer → inner)

Order in [app/_layout.tsx](app/_layout.tsx):

1. Redux `Provider`
2. `UpdatesGate` (`expo-updates` check in production)
3. `AlertsProvider` (Paper `Snackbar`)
4. `I18nextProvider`
5. Paper `PaperProvider`
6. `SafeAreaProvider`
7. `GestureHandlerRootView`
8. `@gorhom/bottom-sheet` `BottomSheetModalProvider`
9. React Navigation `ThemeProvider` + `Stack`

Splash is hidden after fonts load and **auth hydration** completes (`hydrateAuth`).

## Environment

Copy [.env.example](.env.example) to `.env` (gitignored). Only variables prefixed with `EXPO_PUBLIC_` are available in the client bundle—**never commit secrets**.

- **`EXPO_PUBLIC_API_URL`** — API base URL for Axios.
- **`EXPO_PUBLIC_MOCK_AUTH=true`** — Demo login without a backend (mock tokens written to secure storage).

Use **EAS Secrets** for production env injection.

## Auth and JWT

- Access/refresh tokens are stored with **expo-secure-store** (see [features/auth/storage.ts](features/auth/storage.ts)).
- Axios attaches `Authorization: Bearer <accessToken>` from the Redux store ([config/axiosClient.ts](config/axiosClient.ts)).
- **401/403** responses dispatch the `logout` thunk (dynamic import avoids a circular dependency). Extend the client with a **refresh** flow and retry as your API requires.

## Adding a new feature

1. Create `features/<name>/` with `slice.ts`, `thunks.ts`, `selectors.ts`, `types.ts`, and a public `index.ts` (export thunks/selectors/types only).
2. Register the reducer in [store/store.ts](store/store.ts).
3. Import from `@/features/<name>` elsewhere—**not** from another feature’s `slice.ts`.

## NativeWind

[global.css](global.css) is bundled via [metro.config.js](metro.config.js). Use `className` on React Native views; keep static styling in Tailwind and reserve inline styles for truly dynamic values.

## Tooling

- [babel.config.js](babel.config.js): `nativewind/babel`, `react-native-reanimated/plugin` (last).
- [eslint.config.js](eslint.config.js): Expo flat config + `@typescript-eslint/no-explicit-any: error`.
