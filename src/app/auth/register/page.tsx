import { titleFont } from '@/config/fonts';
import { RegisterForm } from './ui/RegisterForm';

export default function Register() {
  return (
    <div className="flex flex-col min-h-screen p-3 pt-32 sm:pt-52">

      <h1 className={ `${ titleFont.className } text-4xl mb-5` }>New account</h1>

      <RegisterForm />
    </div>
  );
}