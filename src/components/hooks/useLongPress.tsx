import { useCallback, useRef, useState } from "react";

interface useLongPressProps {
   onLongPress: (e: any) => void;
   onClick: (e: any) => void;
   options?: LongPressConfig;
}

interface LongPressConfig {
   shouldPreventDefault: boolean;
   delay: number;
}

export const useLongPress = ({
   onLongPress,
   onClick,
   options = { shouldPreventDefault: true, delay: 300 },
}: useLongPressProps) => {
   const { shouldPreventDefault, delay } = options;
   const [longPressTriggered, setLongPressTriggered] = useState(false);
   const timeout = useRef<any | undefined>();
   const target = useRef<EventTarget | undefined>();

   const start = useCallback(
      (event: MouseEvent | TouchEvent) => {
         if (shouldPreventDefault && event.target) {
            event.target.addEventListener("touchend", preventDefault, { passive: false });
            target.current = event.target;
         }

         timeout.current = setTimeout(() => {
            onLongPress(event);
            setLongPressTriggered(true);
         }, delay);
      },
      [onLongPress, delay, shouldPreventDefault]
   );

   const clear = useCallback(
      (event: MouseEvent | TouchEvent, shouldTriggerClick = true) => {
         timeout.current && clearTimeout(timeout.current);
         shouldTriggerClick && !longPressTriggered && onClick(event);
         setLongPressTriggered(false);
         if (shouldPreventDefault && target.current) {
            target.current.removeEventListener("touchend", preventDefault);
         }
         console.log("ClearEVENT", event);
         
      },
      [shouldPreventDefault, onClick, longPressTriggered]
   );

   return {
      onMouseDown: (e: any) => start(e),
      onTouchStart: (e:any) => start(e),
      onMouseUp: (e:any) => clear(e),
      onMouseLeave: (e:any) => clear(e, false),
      onTouchEnd: (e:any) => clear(e),
   };
};

const isTouchEvent = (event: MouseEvent | TouchEvent) => {

   return "touches" in event;
};

const preventDefault = (event: any) => {
   if (!isTouchEvent(event)) {
      return;
   } else {
      if (event.touches.length < 2 && event.preventDefault) {
         event.preventDefault();
      }
   }
};
