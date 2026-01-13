# FeatureAccordion Component

A production-ready, accessible feature accordion component for showcasing product features with synchronized image display.

## Features

✅ **Single-open accordion behavior** - Only one feature expanded at a time
✅ **Synchronized image display** - Image updates instantly when switching features
✅ **Mobile responsive** - Images appear inside accordion on mobile, separate panel on desktop
✅ **Smooth CSS animations** - Grid-based height transitions, no JS calculations
✅ **Fully accessible** - ARIA attributes, keyboard navigation, semantic HTML
✅ **Next.js optimized** - Uses `next/image` for optimal performance
✅ **Matches design system** - Emerald theme, consistent with AIOStack branding

## Usage

### Basic Usage

```tsx
import FeatureAccordion from "@/components/FeatureAccordion";

export default function Page() {
  return (
    <div className="max-w-7xl mx-auto px-4">
      <FeatureAccordion />
    </div>
  );
}
```

### Customizing Features

Edit the `features` array inside the component:

```tsx
const features: Feature[] = [
  {
    id: "unique-id",
    title: "Feature Title",
    description: "Detailed description of the feature...",
    image: "/path/to/image.png",
    icon: YourLucideIcon,
  },
  // ... more features
];
```

### Adding Your Own Images

Replace the placeholder images in the `features` array:

```tsx
image: "/your-custom-image.png"
```

Images should be:
- **Aspect ratio**: 16:9 (recommended)
- **Format**: PNG, JPG, or WebP
- **Location**: `/public/` directory in your Next.js project
- **Size**: Optimized for web (recommended < 500KB)

## Component Structure

```
FeatureAccordion/
├── Left Panel (Accordion)
│   ├── Feature 1 (expandable)
│   ├── Feature 2 (expandable)
│   └── Feature N (expandable)
└── Right Panel (Desktop only)
    └── Active Feature Image
```

## Behavior

1. **Initial State**: First feature is expanded by default
2. **Click Behavior**:
   - Click inactive row → expands clicked row, collapses others
   - Click active row → no action (stays open)
3. **Image Sync**: Right panel always shows the active feature's image
4. **Mobile**: Image appears inside the expanded accordion item

## Accessibility

- ✅ Proper `<button>` elements for accordion headers
- ✅ `aria-expanded` attribute reflects open/closed state
- ✅ Keyboard navigable (Tab, Enter, Space)
- ✅ Semantic HTML structure
- ✅ Focus indicators on interactive elements

## Styling

The component uses Tailwind CSS and follows the AIOStack design system:

- **Primary color**: Emerald (green)
- **Border radius**: Rounded (2xl for cards)
- **Shadows**: Soft shadows on active states
- **Transitions**: 300ms ease-in-out
- **Dark mode**: Fully supported via Tailwind dark mode classes

### Customizing Colors

To change the accent color, replace `emerald` classes:

```tsx
// Change from emerald to blue
className="bg-emerald-500/10" → className="bg-blue-500/10"
className="text-emerald-600" → className="text-blue-600"
```

## Animation Details

The accordion uses CSS Grid for smooth height animations:

```css
/* Closed state */
grid-rows-[0fr] opacity-0

/* Open state */
grid-rows-[1fr] opacity-100
```

This approach:
- ✅ No JavaScript height calculations
- ✅ Smooth, performant transitions
- ✅ Works with dynamic content
- ✅ No layout thrashing

## Browser Support

- ✅ Chrome/Edge (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

**Note**: CSS Grid animations require modern browsers (2020+)

## Performance

- Images use `next/image` for automatic optimization
- Lazy loading on desktop via `sizes` attribute
- Single image DOM node (no duplication)
- CSS-only animations (no JS reflows)

## Demo Page

Visit `/features` to see the component in action with full page context.

## Troubleshooting

### Images not loading
- Ensure images are in `/public/` directory
- Check image paths start with `/`
- Verify image file names match exactly

### Accordion not animating smoothly
- Ensure Tailwind CSS is configured properly
- Check that `transition-all duration-300` classes are present
- Verify no conflicting CSS is overriding transitions

### Icons not showing
- Ensure Lucide React is installed: `npm install lucide-react`
- Import icons correctly: `import { IconName } from "lucide-react"`

## License

Part of the AIOStack project.
