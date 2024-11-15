"use client"
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import Image from "next/image"

const tokens = [
  { label: "USDT", value: "USDT" },
  { label: "USDC", value: "USDC" },
  { label: "ETH", value: "ETH" },
] as const

export function CurrencySelect({ form }: { form: any }) {
  return (
    <Form {...form}>
      <FormField
        control={form.control}
        name="token"
        render={({ field }) => (
          <FormItem className="flex flex-col">
            <FormLabel></FormLabel>
            <Popover>
              <PopoverTrigger asChild>
                <FormControl>
                  <Button
                    variant="outline"
                    role="combobox"
                    className={cn(
                      "bg-gary-input-blue !mt-0 h-[44px] w-full justify-between rounded-full border-none font-bold text-gary-blue hover:bg-gary-light-blue",
                      !field.value && "text-muted-foreground"
                    )}
                  >
                    <Image
                      src={`/icons/coins/${field.value?.toLowerCase()}.png`}
                      alt={field.value}
                      width={32}
                      height={32}
                      className="mr-1"
                    />
                    {field.value ? tokens.find((token) => token.value === field.value)?.label : "Select currency"}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </FormControl>
              </PopoverTrigger>
              <PopoverContent className="w-[150px] p-0">
                <Command>
                  {/* <CommandInput placeholder="Search token..." /> */}
                  <CommandList>
                    <CommandEmpty>No coin found.</CommandEmpty>
                    <CommandGroup>
                      {tokens.map((token) => (
                        <CommandItem
                          value={token.label}
                          key={token.value}
                          onSelect={() => {
                            form.setValue("token", token.value)
                          }}
                          className="text-white"
                        >
                          <Check
                            className={cn("mr-2 h-4 w-4", token.value === field.value ? "opacity-100" : "opacity-10")}
                          />
                          <Image
                            src={`/icons/coins/${token.value?.toLowerCase()}.png`}
                            alt={token.value}
                            width={20}
                            height={20}
                            className="mr-2"
                          />
                          {token.label}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
            <FormMessage />
          </FormItem>
        )}
      />
    </Form>
  )
}
