import { createRoot } from 'react-dom/client';
import { Options } from './Options'
// Render your React component instead
const root = createRoot(document.getElementById('app'));
root.render(<Options />);