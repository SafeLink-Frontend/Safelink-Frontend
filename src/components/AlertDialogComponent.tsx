"use client";
import React from "react";
import * as AlertDialog from "@radix-ui/react-alert-dialog";

interface AlertDiagProps {
  title: string;
  description: string;
  actionButtonText: string;
  action: () => void;
  triggerButtonText: string;
  backgroundColor?: string;
  borderColor?: string;
  hoverBackgroundColor?: string;
  textColor?: string;
  border?: string;
  closeDrawer?: () => void;
  disabled?: boolean;
}

export const AlertDialogComponent = ({
  title,
  description,
  actionButtonText,
  action,
  triggerButtonText,
  backgroundColor = "bg-red-700",
  borderColor = "bg-red-700",
  hoverBackgroundColor = "bg-red-900",
  textColor = "text-white",
  border = "border",
  closeDrawer = () => null,
  disabled = false,
}: AlertDiagProps) => (
  <AlertDialog.Root onOpenChange={closeDrawer}>
    <AlertDialog.Trigger asChild>
      <button
        disabled={disabled}
        className={`inline-flex h-[35px] items-center justify-center ${border} ${borderColor} rounded ${backgroundColor} px-[15px] font-medium leading-none ${textColor} shadow-[0_2px_10px] shadow-blackA4 outline-none hover:${hoverBackgroundColor} `}
      >
        {triggerButtonText}
      </button>
    </AlertDialog.Trigger>
    <AlertDialog.Portal>
      <AlertDialog.Overlay className="fixed inset-0 bg-blackA6 data-[state=open]:animate-overlayShow " />
      <AlertDialog.Content className="fixed z-50 left-1/2 top-1/2 max-h-[85vh] w-[90vw] max-w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-md bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none data-[state=open]:animate-contentShow">
        <AlertDialog.Title className="m-0 text-[17px] font-medium text-mauve12">
          {title}
        </AlertDialog.Title>
        <AlertDialog.Description className="mb-5 mt-[15px] text-[15px] leading-normal text-mauve11">
          {description}
        </AlertDialog.Description>
        <div className="flex justify-end gap-[25px]">
          <AlertDialog.Cancel asChild>
            <button className="inline-flex h-[35px] items-center justify-center rounded bg-mauve4 px-[15px] font-medium leading-none text-mauve11 outline-none hover:bg-mauve5 focus:shadow-[0_0_0_2px] focus:shadow-mauve7">
              Cancel
            </button>
          </AlertDialog.Cancel>
          <AlertDialog.Action asChild>
            <button
              onClick={action}
              className="inline-flex h-[35px] items-center justify-center rounded bg-red4 px-[15px] font-medium leading-none text-red11 outline-none hover:bg-red5 focus:shadow-[0_0_0_2px] focus:shadow-red7"
            >
              {actionButtonText}
            </button>
          </AlertDialog.Action>
        </div>
      </AlertDialog.Content>
    </AlertDialog.Portal>
  </AlertDialog.Root>
);

export default AlertDialogComponent;
