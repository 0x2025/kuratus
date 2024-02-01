import { createRoot } from 'react-dom/client';
import { Option } from './Option'
// Render your React component instead
const root = createRoot(document.getElementById('app'));
root.render(<Option />);