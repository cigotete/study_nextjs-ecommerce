'use client';

import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js';
import { CreateOrderData, CreateOrderActions} from '@paypal/paypal-js';
import { setTransactionId } from '@/actions';

interface Props {
  orderId: string;
  amount: number;
}

export const PayPalButton = ({ orderId, amount }: Props) => {

  const [{ isPending }] = usePayPalScriptReducer(); // Skeleton
  const rountedAmount = (Math.round(amount * 100)) / 100; //123.23

  if ( isPending ) { // Skeleton
    return (
      <div className="animate-pulse mb-16">
        <div className="h-11 bg-gray-300 rounded" />
        <div className="h-11 bg-gray-300 rounded mt-2" />
      </div>
    )
  }

  const createOrder = async(data: CreateOrderData, actions: CreateOrderActions): Promise<string> => {

    // Getting transaction Id
    const transactionId = await actions.order.create({
      purchase_units: [
        {
          //invoice_id: orderId,
          amount: {
            value: `${ rountedAmount }`,
          }

        }
      ]
    });

    const { ok } = await setTransactionId( orderId, transactionId );
    if ( !ok ) {
      throw new Error('Can not be updated order');
    }

    return transactionId;
  }

  return (
    <PayPalButtons
      createOrder={ createOrder }
    />
  )
}