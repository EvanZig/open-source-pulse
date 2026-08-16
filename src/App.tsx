import { HomeLayout } from '@/components/layout/HomeLayout';
import { issues } from '@/data/issues';

export default function App() {
  return <HomeLayout issues={issues} />;
}
