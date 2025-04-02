import Link from 'next/link';

export function Logo() {
  return (
    <Link 
      href="/" 
      aria-label="All American Limousine - Return to homepage"
      className="flex items-center gap-2"
    >
      {/* This is a placeholder. Replace with actual logo */}
      <div className="relative h-10 w-40 overflow-hidden">
        <span className="absolute inset-0 flex items-center justify-start text-xl font-serif tracking-wider text-white">
          AAM
        </span>
      </div>
    </Link>
  );
}
