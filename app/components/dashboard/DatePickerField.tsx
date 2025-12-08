import React from 'react';

import { format } from 'date-fns';
import { Popover, PopoverContent, PopoverTrigger } from '../../../@/components/ui/popover';
import { Button } from '../../../@/components/ui/button';
import { cn } from '../../../@/lib/utils';
import { CalendarIcon } from 'lucide-react';
import { Calendar } from '../../../@/components/ui/calendar';

type DatePickerWithPopoverProps = {
  value?: Date;
  onChange: (date: Date | null) => void;
  disabled?: (date: Date) => boolean;
};

const DatePickerWithPopover: React.FC<DatePickerWithPopoverProps> = ({ value, onChange, disabled }) => {
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
          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={value}
          onSelect={(date) => onChange(date ?? null)}
          disabled={disabled}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
};

export default DatePickerWithPopover;
