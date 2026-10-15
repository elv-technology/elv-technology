export const CustomBotIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 100 100" className={className} xmlns="http://www.w3.org/2000/svg">
    {/* Base shape (Head, Ears, Antenna, Tail) */}
    <path fill="currentColor" d="
      M 6 38 h 9 v 24 h -9 z
      M 85 38 h 9 v 24 h -9 z
      M 46 16 h 8 v 9 h -8 z
      M 50 5 a 6 6 0 1 0 0 12 a 6 6 0 1 0 0 -12 z
      M 25 25
      H 75
      A 10 10 0 0 1 85 35
      V 65
      A 10 10 0 0 1 75 75
      H 55
      L 35 92
      V 75
      H 25
      A 10 10 0 0 1 15 65
      V 35
      A 10 10 0 0 1 25 25
      Z
    " />
    {/* Eyes and Mouth (White) */}
    <path fill="white" d="
      M 35 39 a 6 6 0 1 0 0 12 a 6 6 0 1 0 0 -12 z
      M 65 39 a 6 6 0 1 0 0 12 a 6 6 0 1 0 0 -12 z
      M 33 58
      H 67
      A 17 17 0 0 1 33 58
      Z
    " />
  </svg>
);
