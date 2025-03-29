# Life Tree App

A React application for organizing and visualizing life categories and subcategories. Built with TypeScript, React, and Vite.

## Features

- **Interactive Tree Structure**: Organize your life into main categories and subcategories
- **Color-Coded Categories**: Visual hierarchy with color inheritance from parent to child
- **Custom Subcategories**: Add and remove custom subcategories as needed
- **Persistent Storage**: Your tree structure is automatically saved to localStorage
- **Responsive Design**: Works well on both desktop and mobile devices
- **Type-Safe**: Built with TypeScript for better development experience

## Getting Started

### Prerequisites

- Node.js (v18.18.0 or higher)
- npm (v9.0.0 or higher)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/joebuono/life.git
cd life
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Usage

- Click on any category to expand/collapse its subcategories
- Use the + button to add custom subcategories
- Use the × button to remove custom subcategories
- Use the Reset Structure button to restore the default categories

## Development

### Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the project for production
- `npm run preview` - Preview the production build locally
- `npm run lint` - Run ESLint to check code quality

### Project Structure

```
src/
├── components/
│   ├── LifeTree.tsx    # Main tree component
│   └── LifeTree.css    # Styles for the tree
├── types.ts            # TypeScript type definitions
├── App.tsx            # Root component
├── main.tsx           # Application entry point
└── index.css          # Global styles
```

## Technologies Used

- React
- TypeScript
- Vite
- ESLint
- CSS3

## License

This project is licensed under the MIT License - see the LICENSE file for details.
