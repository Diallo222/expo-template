# expo-template

Production-oriented Expo + React Native starter: **Expo Router** (file routes in `app/`), **TypeScript (strict)**, **NativeWind v4**, **React Native Paper**, **@gorhom/bottom-sheet** v5, **Reanimated** + **Gesture Handler**, **Redux Toolkit** with **feature folders**, **TanStack Query**, **react-hook-form** + **Zod**, **@expo/vector-icons** (Ionicons), and a small **API layer** (Axios + thin wrappers).

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
| `providers/` | `QueryProvider`, `UpdatesGate` (OTA fetch), `AlertsProvider` (global snackbar) |

## Providers (outer → inner)

Order in [app/_layout.tsx](app/_layout.tsx):

1. Redux `Provider`
2. `QueryProvider` ([TanStack Query](https://tanstack.com/query/latest))
3. `UpdatesGate` (`expo-updates` check in production)
4. `AlertsProvider` (Paper `Snackbar`)
5. `I18nextProvider`
6. Paper `PaperProvider`
7. `SafeAreaProvider`
8. `GestureHandlerRootView`
9. `@gorhom/bottom-sheet` `BottomSheetModalProvider`
10. React Navigation `ThemeProvider` + `Stack`

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

## Forms and validation

The login screen uses **react-hook-form** with **Zod** (`loginFormSchema` in [features/auth/loginFormSchema.ts](features/auth/loginFormSchema.ts)) and `@hookform/resolvers/zod`. Use the same pattern for other forms.

## TanStack Query

Use `useQuery` / `useMutation` in screens for server state; keep **Redux** for client session and feature slices. The shared `QueryClient` lives in [providers/QueryProvider.tsx](providers/QueryProvider.tsx).

## Icons

Tab and header icons use **Ionicons** from [@expo/vector-icons](https://docs.expo.dev/guides/icons/) (bundled with Expo, no extra native setup).

## NativeWind

[global.css](global.css) is bundled via [metro.config.js](metro.config.js). Use `className` on React Native views; keep static styling in Tailwind and reserve inline styles for truly dynamic values.

## Tooling

- [babel.config.js](babel.config.js): `nativewind/babel`, `react-native-reanimated/plugin` (last).
- [eslint.config.js](eslint.config.js): Expo flat config + `@typescript-eslint/no-explicit-any: error`.
