import { Select, SelectContent, SelectTrigger, SelectValue } from '@/components/ui/select';

export function SelectCategory() {
  return (
    <Select>
      <SelectTrigger 
        className='border-2 border-secondary bg-transparent h-10 font-semibold text-secondary placeholder:text-base' 
        arrowColor="green"
        arrowClassName="h-5 w-5"
        border
      >
        <SelectValue placeholder="Create Category" />
      </SelectTrigger>
      <SelectContent className='text-base'>
      
      </SelectContent>
    </Select>
  );
}