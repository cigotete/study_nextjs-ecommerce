import { notFound } from 'next/navigation';


interface Props {
  params: {
    id: string;
  }
}

export default async function Category({ params }: Props) {

  const { id } = await params;
  const validCategories = ['women', 'men', 'kid'];
  if (!validCategories.includes(id)) {
    notFound();
  }

  return (
    <div>
      <h1>Category Page { id }</h1>
    </div>
  );
}