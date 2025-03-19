'use server';

import { signIn } from '@/auth.config';

export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {

    console.log("Object.fromEntries(formData): ", Object.fromEntries(formData))
    await signIn('credentials', {
      ...Object.fromEntries(formData),
      redirect: false,
    });

    return 'Success';

  } catch (error) {
    console.log(error);

    return 'CredentialsSignin'
  }
}

// Login after register.
export const login = async(email:string, password: string) => {

  try {
    await signIn('credentials',{ email, password })
    return {ok: true};

  } catch (error) {
    console.log(error);
    return {
      ok: false,
      message: 'No session created'
    }

  }

}
