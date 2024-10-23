import ItemPlaceholderImg from '../assets/item-placeholder.png';

interface ItemSelectionCardProps {
  src?: string;
  name: string;
}

export function ItemSelectionCard({ src, name }: ItemSelectionCardProps) {
  return (
    <button type="button" className='bg-white shadow-sm rounded-sm aspect-square ratio'>
      <div className='justify-items-center items-center grid grid-rows-[1fr,auto] w-full h-full'>
        <img className='min-h-6' src={src ?? ItemPlaceholderImg} />
        <div className='text-base'>{name}</div>
      </div>
    </button>
  );
}