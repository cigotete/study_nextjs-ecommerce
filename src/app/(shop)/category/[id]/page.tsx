import { notFound } from 'next/navigation';


interface Props {
  params: {
    id: string;
  }
}

export default function Category({ params }: Props) {

  const { id } = params;
  if ( id === 'cat1' ) {
    notFound();
  }

  return (
    <div>
      <h1>Category Page { id }</h1>
    </div>
  );
}