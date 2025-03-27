"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import clsx from 'clsx';

import type { Address, Country } from '@/interfaces';
import { useAddressStore } from '@/state';
import { deleteUserAddress, setUserAddress } from '@/actions';

type FormInputs = {
  firstName: string;
  lastName: string;
  address: string;
  address2?: string;
  postalCode: string;
  city: string;
  country: string;
  phone: string;
  rememberAddress: boolean;
}

interface Props {
  countries: Country[];
  userStoredAddress?: Partial<Address>;
}

export const AddressForm = ({ countries, userStoredAddress = {} }: Props) => {

  const router = useRouter();
  const { handleSubmit, register, formState: { isValid }, reset } = useForm<FormInputs>({
    defaultValues: {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ...(userStoredAddress as any),
      rememberAddress: false,
    }
  });

  const { data: session } = useSession({
    required: true,
  })

  const setAddress = useAddressStore( state => state.setAddress );
  const address = useAddressStore( state => state.address );

  useEffect(() => {
    if ( address.firstName ) {
      reset(address)
    }
  },[])

  const onSubmit = async( data: FormInputs ) => {

    const { rememberAddress, ...restAddress } = data;
    setAddress(restAddress);

    if ( rememberAddress ) {
      await setUserAddress(restAddress, session!.user.id );
    } else {
      await deleteUserAddress(session!.user.id);
    }

    router.push('/checkout');

  }

  return (
    <form onSubmit={ handleSubmit( onSubmit ) }  className="grid grid-cols-1 gap-2 sm:gap-5 sm:grid-cols-2">
      <div className="flex flex-col mb-2">
        <span>First Name</span>
        <input type="text" className="p-2 border rounded-md bg-gray-200" { ...register('firstName', { required: true  }) } />
      </div>

      <div className="flex flex-col mb-2">
        <span>Last Name</span>
        <input type="text" className="p-2 border rounded-md bg-gray-200" { ...register('lastName', { required: true  }) } />
      </div>

      <div className="flex flex-col mb-2">
        <span>Address</span>
        <input type="text" className="p-2 border rounded-md bg-gray-200" { ...register('address', { required: true  }) } />
      </div>

      <div className="flex flex-col mb-2">
        <span>Address 2 (optional)</span>
        <input type="text" className="p-2 border rounded-md bg-gray-200" { ...register('address2') } />
      </div>

      <div className="flex flex-col mb-2">
        <span>Postal Code</span>
        <input type="text" className="p-2 border rounded-md bg-gray-200" { ...register('postalCode', { required: true  }) } />
      </div>

      <div className="flex flex-col mb-2">
        <span>City</span>
        <input type="text" className="p-2 border rounded-md bg-gray-200" { ...register('city', { required: true  }) } />
      </div>

      <div className="flex flex-col mb-2">
        <span>Country</span>
        <select className="p-2 border rounded-md bg-gray-200" { ...register('country', { required: true  }) }>
          <option value="">[ Select ]</option>
          {
            countries.map( country => (
              <option key={ country.id } value={ country.id }>{ country.name }</option>
            ))
          }
        </select>
      </div>

      <div className="flex flex-col mb-2">
        <span>Phone</span>
        <input type="text" className="p-2 border rounded-md bg-gray-200" { ...register('phone', { required: true  }) } />
      </div>

      <div className="flex flex-col mb-2 sm:mt-1">
        
        <div className="inline-flex items-center mb-10 ">
          <label
            className="relative flex cursor-pointer items-center rounded-full p-3"
            htmlFor="checkbox"
          >
            <input
              type="checkbox"
              className="h-5 w-5 cursor-pointer"
              id="checkbox"
              { ...register('rememberAddress') }
            />
            <div className="pointer-events-none absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 text-white opacity-0 transition-opacity peer-checked:opacity-100">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-3.5 w-3.5"
                viewBox="0 0 20 20"
                fill="currentColor"
                stroke="currentColor"
                strokeWidth="1"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </div>
          </label>

          <span>Remember address?</span>
        </div>

        <button
          disabled={ !isValid }
          type="submit"
          className={ clsx({
            'btn-primary': isValid,
            'btn-disabled': !isValid,
          })}
        >
          Next
        </button>
      </div>
    </form>
  );
};