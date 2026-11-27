# SVN Rich Investment — independent redesign preview

React + TypeScript + Vite + Tailwind CSS v3. The existing cinematic homepage is retained, with React-powered property cards. The 3D building tour has been removed.

## Run
```bash
npm install
npm run dev
npm run build
npm run preview
```

## Layout
- `components/ui/card-14.tsx`: supplied perspective flip card, adapted for accessible controlled flipping.
- `components/ui/image-swiper.tsx`: supplied swipeable gallery, adapted to support keyboard-accessible controls and avoid conflicting with flips.
- `components/ui/button.tsx`, `components/ui/card.tsx`: shadcn-style dependencies.
- `lib/utils.ts`: cn utility.
- `src/globals.css`: Tailwind layers, shadcn theme tokens and provided sky colors.
- `src/main.tsx`: real estate card composition.
- `components.json`: shadcn configuration and root aliases.

The shared components/ui folder is important because shadcn CLI generators and @/components/ui imports use that convention; styles are in src/globals.css. The project is already configured. To add more shadcn components, use `npx shadcn@latest add [component]`. To initialize a fresh project, create a Vite React TypeScript app, install Tailwind and TypeScript, then use the shadcn init command with the appropriate aliases.

Swipe or use arrows on the photography before flipping via the details button or hovering over the text area. Escape/back returns to the gallery. Images are illustrative, not verified listings. No fabricated ratings, prices, addresses or room specifications.
