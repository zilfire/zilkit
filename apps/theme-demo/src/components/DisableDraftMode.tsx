"use client";
import { useTransition, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { disableDraftMode } from "@/app/actions";

export function DisableDraftMode() {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [isInIframe, setIsInIframe] = useState(false);

  useEffect(() => {
    // Check if we're in an iframe or popup window
    if (typeof window !== "undefined") {
      setIsInIframe(window !== window.parent || !!window.opener);
    }
  }, []);

  // Don't render if we're in an iframe or popup
  if (isInIframe) {
    return null;
  }

  const disable = () =>
    startTransition(async () => {
      await disableDraftMode();
      router.refresh();
    });

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className="bg-yellow-500 text-black px-4 py-2 rounded-lg shadow-lg">
        {pending ? (
          "Disabling draft mode..."
        ) : (
          <button
            type="button"
            onClick={disable}
            className="font-medium hover:underline"
          >
            Disable draft mode
          </button>
        )}
      </div>
    </div>
  );
}

// "use client";
// import { useTransition } from "react";
// import { useRouter } from "next/navigation";
// import { disableDraftMode } from "@/app/actions";
// export function DisableDraftMode() {
//   const router = useRouter();
//   const [pending, startTransition] = useTransition();

//   if (window !== window.parent || !!window.opener) {
//     return null;
//   }
//   const disable = () =>
//     startTransition(async () => {
//       await disableDraftMode();
//       router.refresh();
//     });
//   return (
//     <div>
//       {pending ? (
//         "Disabling draft mode..."
//       ) : (
//         <button type="button" onClick={disable}>
//           Disable draft mode
//         </button>
//       )}
//     </div>
//   );
// }
