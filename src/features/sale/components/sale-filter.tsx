import { useEffect, useState } from 'react';
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
import { getCustomerById, getCustomers } from '@/features/customer/api/customer';
import { FormSearchPaginated } from '@/components/form-search-paginated';
import { getVehicleById, getVehicles } from '@/features/vehicle/api/vehicle';
import { CustomerDto } from '@/features/customer/types/customer.dto';
import { VehicleDto } from '@/features/vehicle/types/vehicle.dto';
import { PaymentType, StatusEnum } from '../types/sale';
import { isEqual } from 'date-fns';
import { useQuery } from '@tanstack/react-query';
import { getUserById, getUsers } from '@/features/user/api/user';
import { UserDto } from '@/features/user/types/user.dto';
import { Route } from '@/app/routes/_protected_layout/_dashboard_layout/sales';
import { SaleFilter } from '../types/sale-filter';
import { useNavigate } from '@tanstack/react-router';

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
  const searchFilter: SaleFilter = Route.useSearch();
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState<UserDto>();
  const [customer, setCustomer] = useState<CustomerDto>();
  const [vehicle, setVehicle] = useState<VehicleDto>();
  const [paymentType, setPaymentType] = 
    useState<PaymentType>(searchFilter.paymentType ? searchFilter.paymentType.toUpperCase() as PaymentType : PaymentType.NONE);
  const [status, setStatus] = 
    useState<StatusEnum>(searchFilter.status ? searchFilter.status.toUpperCase() as StatusEnum : StatusEnum.NONE);
  const [createdAtFrom, setCreatedAtFrom] = 
    useState<Date | undefined>(searchFilter.createdAtFrom);
  const [createdAtTo, setCreatedAtTo] = 
    useState<Date | undefined>(searchFilter.createdAtTo);

  const usersQuery = useQuery({
    queryKey: ['users'],
    queryFn: () => getUsers()
  });

  const userQuery = useQuery({
    queryKey: ['user', searchFilter.userId],
    queryFn: () => getUserById(searchFilter.userId || ''),
    enabled: !!searchFilter.userId
  });

  const customerQuery = useQuery({
    queryKey: ['user', searchFilter.customerId],
    queryFn: () => getCustomerById(searchFilter.customerId || ''),
    enabled: !!searchFilter.customerId
  });

  const vehicleQuery = useQuery({
    queryKey: ['user', searchFilter.vehicleId],
    queryFn: () => getVehicleById(searchFilter.vehicleId || ''),
    enabled: !!searchFilter.vehicleId
  });

  const handleClearFilters = () => {
    setCustomer(undefined);
    setVehicle(undefined);
    setStatus(StatusEnum.NONE);
    setPaymentType(PaymentType.NONE);
    setCreatedAtFrom(undefined);
    setCreatedAtTo(undefined);
    navigate({ search: {} });
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

  useEffect(() => {
    if (searchFilter.userId && userQuery.data) {
      setUser(userQuery.data);
    }

    if (searchFilter.customerId && customerQuery.data) {
      setCustomer(customerQuery.data);
    }
    else {
      setCustomer(undefined);
    }
    
    if (searchFilter.vehicleId && vehicleQuery.data) {
      setVehicle(vehicleQuery.data);
    }
    else {
      setVehicle(undefined);
    }
  }, 
  [customer, customerQuery.data, 
    searchFilter.customerId, searchFilter.userId, 
    searchFilter.vehicleId, user, userQuery.data, 
    vehicle, vehicleQuery.data
  ]);

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
            value={createdAtFrom} 
            onChange={(v) => {
              setCreatedAtFrom(v);
              navigate({ search: { ...searchFilter, createdAtFrom: v } });
            }} 
            onDayClick={(date) => {
              if (isEqual(date, createdAtFrom || Date.now())) {
                setCreatedAtFrom(undefined);
                navigate({ search: { ...searchFilter, createdAtFrom: undefined } });
              }
            }}
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
            value={createdAtTo} 
            onChange={(v) => {
              setCreatedAtTo(v);
              navigate({ search: { ...searchFilter, createdAtTo: v } });
            }} 
            onDayClick={(date) => {
              if (isEqual(date, createdAtTo || Date.now())) {
                setCreatedAtTo(undefined);
                navigate({ search: { ...searchFilter, createdAtTo: undefined } });
              }
            }}
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
          <Select 
            value={user ? user.id : ''} 
            onValueChange={(v) => {
              navigate({ search: { ...searchFilter, userId: v } });
            }}
          >
            <SelectTrigger className='mt-2 h-8'>
              <SelectValue placeholder='Select staff' />
            </SelectTrigger>
            <SelectContent>
              {
                usersQuery.data && 
                usersQuery.data.map  (u => (
                  <SelectItem 
                    onClick={() => {
                      if (user && u.id === user.id) {
                        setTimeout(() => {
                          setUser(undefined);
                          navigate({ search: { ...searchFilter, userId: undefined } });
                        }, 0);
                      }
                    }}
                    key={u.id} 
                    value={u.id} 
                    className='cursor-pointer'
                  >{u.username}</SelectItem>
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
            onValueChange={(v) => {
              setPaymentType(v as PaymentType);
              navigate({ search: { ...searchFilter, paymentType: v } });
            }}
          >
            {paymentTypeOptions.map((option) => (
              <RadioOption
                key={option.id}
                option={option}
                isSelected={paymentType == option.value}
                groupName="paymentType"
                onClick={() => {
                  if (option.value === paymentType) {
                    setPaymentType(PaymentType.NONE);
                    navigate({ search: { ...searchFilter, paymentType: undefined } });
                  };
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
              onChange={(c) => {
                if (customer && c.id === customer.id) {
                  navigate({ search: { ...searchFilter, customerId: undefined } });
                  setCustomer(undefined);
                }
                else {
                  navigate({ search: { ...searchFilter, customerId: c.id } });
                }
              }}
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
            onValueChange={(s) => {
              setStatus(s as StatusEnum);
              navigate({ search: { ...searchFilter, status: s } });
            }}
          >
            {statusOptions.map((option) => (
              <RadioOption
                key={option.id}
                option={option}
                isSelected={status == option.value}
                groupName="status"
                onClick={() => {  
                  if (option.value === status) {
                    setStatus(StatusEnum.NONE);
                    navigate({ search: { ...searchFilter, status: undefined } });
                  }
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
              onChange={(v) => {
                if (vehicle && v.id == vehicle.id) {
                  setVehicle(undefined);
                  navigate({ search: { ...searchFilter, vehicleId: undefined } });
                }
                else {
                  navigate({ search: { ...searchFilter, vehicleId: v.id } });
                }
              }}
              getEntity={getVehicles}
              placeholder='Search Vehicle'
              entityName='vehicle'
            />
          </div>
        </div>
        <div className='flex justify-between items-center col-span-4 border-t-border'>
          <Button variant='outline' onClick={handleClearFilters}>Clear</Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}