


import React from 'react';
import { Button } from '../../../@/components/ui/button';
import { Calendar } from '../../../@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '../../../@/components/ui/popover';
import { CalendarIcon } from 'lucide-react';
import { cn } from '../../../@/lib/utils';
import { format } from 'date-fns';
type DatePickerProps = {
  value?: Date;
  onChange: (date: Date | undefined) => void;
  disabled?: (date: Date) => boolean;
};

const SDatePicker: React.FC<DatePickerProps> = ({ value, onChange, disabled }) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[240px] pl-3 text-left font-normal",
            !value && "text-muted-foreground"
          )}
        >
          {value ? (
            format(value, "PPP")
          ) : (
            <span>Pick a date</span>
          )}
          <CalendarIcon className="ml-auto w-4 h-4 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0 w-auto" align="start">
        <Calendar
          mode="single"
          selected={value}
          onSelect={onChange}
          disabled={disabled}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
};

export default SDatePicker;
