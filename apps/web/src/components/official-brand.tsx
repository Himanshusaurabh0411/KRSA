import Image from "next/image";

export function KheloIndiaLogo({ className = "", priority = false }: { className?: string; priority?: boolean }) {
  return (
    <Image
      src="/brand/khelo-india-logo.png"
      alt="Khelo India logo"
      width={275}
      height={154}
      priority={priority}
      className={`h-auto w-full object-contain ${className}`}
    />
  );
}

export function AccreditedAcademyPlate({ className = "" }: { className?: string }) {
  return (
    <Image
      src="/brand/khelo-accredited-academy-plate.png"
      alt="Khelo India Accredited Academy plate"
      width={327}
      height={218}
      className={`h-auto w-full object-contain ${className}`}
    />
  );
}
