import { createRoot } from 'react-dom/client';
import { SignIn } from './SignIn';
// Render your React component instead
const root = createRoot(document.getElementById('app'));
root.render(<SignIn />);
