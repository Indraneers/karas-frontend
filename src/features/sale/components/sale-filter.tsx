import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover';
import { ArrowLeft, ArrowRight, Banknote, Building2, CarFront, Check, CircleChevronUp, Clock4, Filter, LucideIcon, ShieldUser, User, WalletCards } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { DatePickerInput } from '@/components/ui/datepicker-input';
import { cn } from '@/lib/utils';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { getCustomers } from '@/features/customer/api/customer';
import { FormSearchPaginated } from '@/components/form-search-paginated';
import { getVehicles } from '@/features/vehicle/api/vehicle';
import { CustomerDto } from '@/features/customer/types/customer.dto';
import { VehicleDto } from '@/features/vehicle/types/vehicle.dto';
import { PaymentType, StatusEnum } from '../types/sale';
import { isEqual } from 'date-fns';
import { useQuery } from '@tanstack/react-query';
import { getUsers } from '@/features/user/api/user';
import { UserDto } from '@/features/user/types/user.dto';

export function FilterIcon({ children, className } : { children: React.ReactNode, className?: string }) {
  return (
    <div className={cn([
      "bg-muted mr-1 p-0.5 rounded-sm",
      className
    ])}>
      {children}
    </div>
  );
}



function RadioOption({ option, isSelected, groupName, onClick } : {
  option: {
    id: string,
    label: string,
    icon: LucideIcon,
    value: string
  },
  isSelected?: boolean,
  groupName: string,
  onClick?: () => void;
}) {
  const IconComponent = option.icon;
  return (
    <div className="flex items-center">
      <RadioGroupItem
        value={option.value} 
        id={`${ groupName }-${ option.id }`}
        className="sr-only peer"
        onClick={onClick}
      />
      <Label
        htmlFor={`${ groupName }-${ option.id }`}
        className={`
            flex items-center w-full px-4 py-1.5 text-xs rounded-md border cursor-pointer transition-all
            ${ isSelected 
      ? 'border-accent bg-accent text-surface' 
      : 'border-border hover:border-accent'
    }
          `}
      >
        <IconComponent className={cn([
          'text-muted-foreground',
          isSelected && 'text-surface'
        ])} size={12} />
        <span className="ml-1.5 text-xs">{option.label}</span>
      </Label>
    </div>
  );
};

export function SalesPopupFilter() {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState<UserDto>();
  const [customer, setCustomer] = useState<CustomerDto>();
  const [vehicle, setVehicle] = useState<VehicleDto>();
  const [paymentType, setPaymentType] = useState<PaymentType>(PaymentType.NONE);
  const [status, setStatus] = useState<StatusEnum>(StatusEnum.NONE);
  const [fromCreatedDate, setFromCreatedDate] = useState<Date>();
  const [toCreatedDate, setToCreatedDate] = useState<Date>();

  const userQuery = useQuery({
    queryKey: ['users'],
    queryFn: () => getUsers()
  });

  const handleClearFilters = () => {
    setCustomer(undefined);
    setVehicle(undefined);
    setStatus(StatusEnum.NONE);
    setPaymentType(PaymentType.NONE);
    setFromCreatedDate(undefined);
    setToCreatedDate(undefined);
  };

  const paymentTypeOptions = [
    { id: 'bank', 
      label: 'Bank', 
      icon: Building2,
      value: PaymentType.BANK
    },
    { id: 'cash', 
      label: 'Cash', 
      icon: Banknote,
      value: PaymentType.CASH
    }
  ];

  const statusOptions = [
    { id: 'paid', 
      label: 'Paid', 
      icon: Check,
      value: StatusEnum.PAID
    },
    { id: 'hold', 
      label: 'Hold', 
      icon: Clock4 ,
      value: StatusEnum.HOLD
    }
  ];

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline">
          <Filter className="w-6 h-6" />
          Filter Sales
        </Button>
      </PopoverTrigger>
      <PopoverContent className="justify-items-stretch gap-4 grid sm:grid-cols-[1fr,1fr,auto,2fr] sm:grid-rows-4 p-4 w-[550px]" align="start">
        <div className='flex flex-col w-full'>
          <Label className='flex items-center font-normal text-muted-foreground text-xs'>
            <FilterIcon className='mr-1'>
              <ArrowRight className="w-3 h-3 text-muted-foreground" />
            </FilterIcon>
            Date From
          </Label>
          <DatePickerInput 
            className='flex mt-2'
            value={fromCreatedDate} 
            onChange={setFromCreatedDate} 
            onDayClick={(date) => isEqual(date, fromCreatedDate || Date.now()) && setFromCreatedDate(undefined)}
          />
        </div>
        <div className='flex flex-col w-full'>
          <Label className='flex items-center font-normal text-muted-foreground text-xs'>
            <FilterIcon className='mr-1'>
              <ArrowLeft className="w-3 h-3 text-muted-foreground" />
            </FilterIcon>
            Date To
          </Label>
          <DatePickerInput 
            className='flex mt-2' 
            value={toCreatedDate} 
            onChange={setToCreatedDate}
            onDayClick={(date) => isEqual(date, toCreatedDate || Date.now()) && setToCreatedDate(undefined)}
          />
        </div>
        <Separator orientation='vertical' className='row-span-3' />
        <div className='flex flex-col w-full'>
          <Label className='flex items-center font-normal text-muted-foreground text-xs'>
            <FilterIcon className='mr-1'>
              <ShieldUser className="w-3 h-3 text-muted-foreground" />
            </FilterIcon>
            By Staff
          </Label>
          <Select value={user ? user.id : ''} onValueChange={(v) => setUser(userQuery.data?.find(u => u.id === v))}>
            <SelectTrigger className='mt-2 h-8'>
              <SelectValue placeholder='Select staff' />
            </SelectTrigger>
            <SelectContent>
              {
                userQuery.data && 
                userQuery.data.map  (u => (
                  <SelectItem key={u.id} value={u.id} className='cursor-pointer'>{u.username}</SelectItem>
                ))
              }
            </SelectContent>
          </Select>
        </div>
        <div className='col-span-2 w-full'>
          <Label className='flex items-center font-normal text-muted-foreground text-xs'>
            <FilterIcon className='mr-1'>
              <WalletCards className="w-3 h-3 text-muted-foreground" />
            </FilterIcon>
            Payment Type
          </Label>
          <RadioGroup 
            name='paymentType'             
            className="justify-items-stretch grid grid-cols-2 mt-2"
            value={paymentType}
            onValueChange={(v) => setPaymentType(v as PaymentType)}
          >
            {paymentTypeOptions.map((option) => (
              <RadioOption
                key={option.id}
                option={option}
                isSelected={paymentType == option.value}
                groupName="paymentType"
                onClick={() => {
                  if (option.value === paymentType) setPaymentType(PaymentType.NONE);
                }}
              />
            ))}
          </RadioGroup>
        </div>
        <div className='flex flex-col w-full'>
          <Label className='flex items-center font-normal text-muted-foreground text-xs'>
            <FilterIcon className='mr-1'>
              <User className="w-3 h-3 text-muted-foreground" />
            </FilterIcon>
            Customer
          </Label>
          <div className='mt-2 w-full'>
            <FormSearchPaginated
              value={customer}
              onChange={(c) => setCustomer(c)}
              getEntity={getCustomers}
              placeholder='Search Customer'
              entityName='customer'
              buttonClassName='h-8 text-xs'
            />
          </div>
        </div>
        <div className='col-span-2 w-full'>
          <Label className='flex items-center font-normal text-muted-foreground text-xs'>
            <FilterIcon className='mr-1'>
              <CircleChevronUp className="w-3 h-3 text-muted-foreground" />
            </FilterIcon>
            Status
          </Label>
          <RadioGroup 
            name='status'
            className="justify-items-stretch grid grid-cols-2 mt-2"
            value={status}
            onValueChange={(s) => setStatus(s as StatusEnum)}
          >
            {statusOptions.map((option) => (
              <RadioOption
                key={option.id}
                option={option}
                isSelected={status == option.value}
                groupName="status"
                onClick={() => {  
                  if (option.value === status) setStatus(StatusEnum.NONE);
                }}
              />
            ))}
          </RadioGroup>
        </div>
        <div className='flex flex-col w-full'>
          <Label className='flex items-center font-normal text-muted-foreground text-xs'>
            <FilterIcon className='mr-1'>
              <CarFront className="w-3 h-3 text-muted-foreground" />
            </FilterIcon>
            Vehicle
          </Label>
          <div className='mt-2 w-full'>
            <FormSearchPaginated
              buttonClassName='h-8 text-xs'
              value={vehicle}
              onChange={(v) => setVehicle(v)}
              getEntity={getVehicles}
              placeholder='Search Vehicle'
              entityName='vehicle'
            />
          </div>
        </div>
        <div className='flex justify-between items-center col-span-4 border-t-border'>
          <Button variant='outline' onClick={handleClearFilters}>Clear</Button>
          <Button>Apply Filter</Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}