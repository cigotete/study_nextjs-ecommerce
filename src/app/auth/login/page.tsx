import { titleFont } from '@/config/fonts';
import { LoginForm } from './ui/LoginForm';

export default function Login() {
  return (
    <div className="flex flex-col min-h-screen p-3 sm:pt-52">

      <h1 className={ `${ titleFont.className } text-4xl mb-5` }>Login</h1>

      <LoginForm />
    </div>
  );
}